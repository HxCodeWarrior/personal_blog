import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { RegisterFormData, ValidationErrors } from '../types';
import { register } from '../api';
import styles from './Register.module.scss';
import PasswordStrength from './components/PasswordStrength';
import { fadeInUp, staggerChildren } from '@/styles/animations/animations';
import { debounce } from 'lodash';
import { evaluatePasswordStrength, validatePasswordComplexity, validatePasswordUsername, checkSequentialChars, checkRepeatingChars } from '@/utils/Auth/Register/RegisterSecurity';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const fields = Object.values(formData);
      const filledFields = fields.filter(field => field.length > 0).length;
      return Math.round((filledFields / fields.length) * 100);
    };
    setFormProgress(calculateProgress());
  }, [formData]);

  const debouncedValidate = debounce((field: keyof RegisterFormData, value: string) => {
    const newErrors: ValidationErrors = { ...errors };
    
    switch (field) {
      case 'username':
        if (value.length < 3) {
          newErrors.username = '用户名至少需要3个字符';
        } else {
          delete newErrors.username;
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = '请输入有效的邮箱地址';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (value.length < 8) {
          newErrors.password = '密码至少需要8个字符';
        } else {
          delete newErrors.password;
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = '两次输入的密码不一';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = '两次输入的密码不一致';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setErrors(newErrors);
  }, 300);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = '用户名只能包含字母、数字、下划线和横线';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else {
      const complexityResult = validatePasswordComplexity(formData.password);
      if (!complexityResult.isValid) {
        newErrors.password = complexityResult.errors[0];
      }
      
      const usernameCheck = validatePasswordUsername(formData.password, formData.username);
      if (usernameCheck) {
        newErrors.password = usernameCheck;
      }
      
      const sequentialCheck = checkSequentialChars(formData.password);
      if (sequentialCheck) {
        newErrors.password = sequentialCheck;
      }
      
      const repeatingCheck = checkRepeatingChars(formData.password);
      if (repeatingCheck) {
        newErrors.password = repeatingCheck;
      }
      
      const strengthAnalysis = evaluatePasswordStrength(formData.password);
      if (strengthAnalysis.score < 3) {
        newErrors.password = '密码强度不足，请参考建议进行修改';
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    debouncedValidate(name as keyof RegisterFormData, value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await register(formData);
      if (response.success) {
        setShowSuccess(true);
        setTimeout(() => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          navigate('/auth/login', { state: { message: '注册成功，请登录' } });
        }, 2000);
      } else {
        setErrors({ username: response.message });
      }
    } catch (error) {
      setErrors({ username: '注册失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div
      className={styles.registerContainer}
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.div 
        className={styles.formCard}
        variants={fadeInUp}
      >
        <h1>注册账号</h1>
        <div 
          className={styles.progressBar}
          data-progress={formProgress}
        />
        <form onSubmit={handleSubmit}>
          <motion.div 
            className={styles.formGroup}
            variants={fadeInUp}
          >
            <label htmlFor="username">
              <FiUser className={styles.inputIcon} />
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              autoComplete="username"
            />
            <AnimatePresence>
              {errors.username && (
                <motion.div
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.username}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className={styles.formGroup}
            variants={fadeInUp}
          >
            <label htmlFor="email">
              <FiMail className={styles.inputIcon} />
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
              autoComplete="email"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className={styles.formGroup}
            variants={fadeInUp}
          >
            <label htmlFor="password">
              <FiLock className={styles.inputIcon} />
              密码
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="请输入密码"
                autoComplete="new-password"
              />
              <div
                className={styles.inputIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <PasswordStrength 
              password={formData.password} 
              username={formData.username}
            />
            <AnimatePresence>
              {errors.password && (
                <motion.div
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.password}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className={styles.formGroup}
            variants={fadeInUp}
          >
            <label htmlFor="confirmPassword">
              <FiLock className={styles.inputIcon} />
              确认密码
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="请再次输入密码"
                autoComplete="new-password"
              />
              <div
                className={styles.inputIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.div
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.confirmPassword}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner} />
            ) : (
              '注册'
            )}
          </motion.button>
        </form>

        <motion.div 
          className={styles.linkContainer}
          variants={fadeInUp}
        >
          已有账号？
          <Link to="/auth/login">立即登录</Link>
        </motion.div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className={styles.successAnimation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className={styles.checkmark} viewBox="0 0 52 52">
                <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Register; 