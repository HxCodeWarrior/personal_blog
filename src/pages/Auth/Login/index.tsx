import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiShield } from 'react-icons/fi';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { debounce } from 'lodash';
import styles from './Login.module.scss';
import { LoginFormData, ValidationErrors, SocialProvider } from '../types';
import authService from '@/services/api/authService';
import { fadeInUp, staggerChildren, shake } from '@/styles/animations/animations';
import { 
  LoginAttemptManager, 
  LoginFormValidator, 
  SessionManager, 
  PasswordStrengthEvaluator 
} from '@/utils/Auth/Login/loginSecurity';
import { useLoginStore } from '@/utils/Auth/Login/loginState';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [securityTips, setSecurityTips] = useState<string[]>([]);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
  }>({ score: 0, feedback: [] });
  
  const setLoginState = useLoginStore(state => state.setLoginState);
  const checkAuthStatus = useLoginStore(state => state.checkAuthStatus);
  
  // 检查现有会话
  useEffect(() => {
    if (checkAuthStatus()) {
      navigate('/dashboard');
    }
  }, [checkAuthStatus, navigate]);
  
  // 处理登录封禁倒计时
  useEffect(() => {
    if (formData.identifier) {
      const remainingTime = LoginAttemptManager.getRemainingBlockTime(formData.identifier);
      if (remainingTime > 0) {
        setBlockTimer(remainingTime);
        const timer = setInterval(() => {
          setBlockTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [formData.identifier]);
  
  // 表单验证
  const validateForm = useCallback(() => {
    const validationErrors = LoginFormValidator.validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);
  
  // 防抖的输入验证
  const debouncedValidate = useCallback(
    debounce((name: string, value: string) => {
      const newErrors = { ...errors };
      
      if (name === 'password') {
        const strengthResult = PasswordStrengthEvaluator.evaluate(value);
        setPasswordStrength(strengthResult);
        
        if (strengthResult.score < 3) {
          setSecurityTips(strengthResult.feedback);
        } else {
          setSecurityTips([]);
        }
      }
      
      const fieldErrors = LoginFormValidator.validate({ 
        ...formData, 
        [name]: value 
      });
      
      if (fieldErrors[name as keyof ValidationErrors]) {
        newErrors[name as keyof ValidationErrors] = fieldErrors[name as keyof ValidationErrors];
      } else {
        delete newErrors[name as keyof ValidationErrors];
      }
      
      setErrors(newErrors);
    }, 300),
    [formData, errors]
  );
  
  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (type !== 'checkbox') {
      debouncedValidate(name, value);
    }
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (LoginAttemptManager.shouldBlock(formData.identifier)) {
      setErrors({
        identifier: `账号已被临时封禁，请在${Math.ceil(blockTimer / 60)}分钟后重试`
      });
      return;
    }
    
    if (!validateForm()) {
      setShowErrorAnimation(true);
      setTimeout(() => setShowErrorAnimation(false), 500);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.login({
        identifier: formData.identifier,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      
      if (response.success && response.data) {
        if (formData.rememberMe) {
          SessionManager.setSession(response.data.token, response.data.refreshToken);
        } else {
          SessionManager.setSession(response.data.token);
        }
        
        setLoginState({
          user: {
            ...response.data.user,
            roles: response.data.user.roles || [],
            permissions: response.data.user.permissions || []
          },
          token: response.data.token
        });
        
        LoginAttemptManager.cleanup();
        
        const { from } = location.state || { from: { pathname: '/dashboard' } };
        navigate(from);
      }
    } catch (error) {
      await LoginAttemptManager.addAttempt(formData.identifier);
      setShowErrorAnimation(true);
      setErrors({ 
        identifier: '登录失败，请检查用户名和密码' 
      });
      setTimeout(() => setShowErrorAnimation(false), 500);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 社交媒体登录
  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setIsLoading(true);
      const response = await authService.socialLogin(provider);
      
      if (response.success && response.data) {
        SessionManager.setSession(response.data.token);
        setLoginState({
          user: {
            ...response.data.user,
            roles: response.data.user.roles || [],
            permissions: response.data.user.permissions || []
          },
          token: response.data.token
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ identifier: '社交媒体登录失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.loginContainer}
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.div
        className={styles.formCard}
        animate={showErrorAnimation ? "shake" : "visible"}
        variants={{
          hidden: fadeInUp.hidden,
          visible: fadeInUp.visible,
          shake: shake.shake
        }}
      >
        <div className={styles.logo}>
          <img src="/assets/logo.svg" alt="Logo" />
        </div>
        
        <h1>欢迎回来</h1>
        
        {blockTimer > 0 && (
          <motion.div
            className={styles.blockWarning}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiShield className={styles.warningIcon} />
            <p>账号已被临时封禁，请在 {Math.floor(blockTimer / 60)}:{blockTimer % 60} 后重试</p>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              type="text"
              name="identifier"
              placeholder="用户名或邮箱"
              value={formData.identifier}
              onChange={handleChange}
              className={errors.identifier ? styles.error : ''}
              disabled={blockTimer > 0}
            />
            <AnimatePresence>
              {errors.identifier && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiAlertCircle />
                  {errors.identifier}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="密码"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.error : ''}
              disabled={blockTimer > 0}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              disabled={blockTimer > 0}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <AnimatePresence>
              {errors.password && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiAlertCircle />
                  {errors.password}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {securityTips.length > 0 && (
            <motion.div
              className={styles.securityTips}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {securityTips.map((tip, index) => (
                <p key={index}>{tip}</p>
              ))}
            </motion.div>
          )}
          
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={blockTimer > 0}
            />
            <label htmlFor="rememberMe">记住我</label>
          </div>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || blockTimer > 0}
          >
            {isLoading ? (
              <motion.div
                className={styles.loadingSpinner}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              '登录'
            )}
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>或</span>
        </div>
        
        <div className={styles.socialLogin}>
          <button 
            onClick={() => handleSocialLogin('google' as SocialProvider)}
            disabled={blockTimer > 0}
          >
            <FaGoogle />
          </button>
          <button 
            onClick={() => handleSocialLogin('github' as SocialProvider)}
            disabled={blockTimer > 0}
          >
            <FaGithub />
          </button>
          <button 
            onClick={() => handleSocialLogin('twitter' as SocialProvider)}
            disabled={blockTimer > 0}
          >
            <FaTwitter />
          </button>
        </div>
        
        <div className={styles.links}>
          <Link to="/auth/register">册账号</Link>
          <Link to="/auth/forgot-password">忘记密码？</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login; 