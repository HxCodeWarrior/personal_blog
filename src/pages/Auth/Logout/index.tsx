import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiShield, FiCheck, FiLoader } from 'react-icons/fi';
import styles from './Logout.module.scss';
import { useLoginStore } from '@/utils/Auth/Login/loginState';
import { logout } from '../api';
import { SessionCleanup } from '@/utils/Auth/Logout/logoutSecurity';

interface LogoutStep {
  icon: React.ReactNode;
  text: string;
  progress: number;
}

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout: logoutStore } = useLoginStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const logoutSteps: LogoutStep[] = [
    { icon: <FiLogOut />, text: '正在退出登录...', progress: 25 },
    { icon: <FiShield />, text: '清理安全信息...', progress: 50 },
    { icon: <FiLoader />, text: '清理本地数据...', progress: 75 },
    { icon: <FiCheck />, text: '退出完成', progress: 100 }
  ];
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        // 获取当前token
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('未找到登录信息');
        }

        // 步骤1: 开始退出
        setCurrentStep(0);
        await new Promise(resolve => setTimeout(resolve, 800));

        // 步骤2: 调用后端注销API
        setCurrentStep(1);
        await logout(token);
        await new Promise(resolve => setTimeout(resolve, 800));

        // 步骤3: 清理本地数据
        setCurrentStep(2);
        await SessionCleanup.performFullCleanup(token);
        await new Promise(resolve => setTimeout(resolve, 800));

        // 步骤4: 完成退出
        setCurrentStep(3);
        logoutStore();
        
        // 延迟跳转
        setTimeout(() => {
          navigate('/auth/login', { 
            state: { message: '已安全退出登录' }
          });
        }, 1000);

      } catch (error) {
        console.error('Logout error:', error);
        setError('退出登录时发生错误，正在强制清理...');
        
        // 即使发生错误，也要清理本地状态
        SessionCleanup.performFullCleanup(localStorage.getItem('token') || '');
        logoutStore();
        
        setTimeout(() => {
          navigate('/auth/login', {
            state: { message: '已强制退出登录' }
          });
        }, 2000);
      }
    };

    performLogout();
  }, [navigate, logoutStore]);

  return (
    <div className={styles.logoutContainer}>
      <motion.div
        className={styles.logoutCard}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {error ? (
          <motion.div
            className={styles.errorState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.errorIcon}>
              <FiShield className={styles.icon} />
            </div>
            <h2>退出异常</h2>
            <p>{error}</p>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progress}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className={styles.iconWrapper}
              animate={{
                rotate: currentStep === 3 ? 0 : 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: currentStep === 3 ? 0 : Infinity,
              }}
            >
              {logoutSteps[currentStep].icon}
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.h2
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {logoutSteps[currentStep].text}
              </motion.h2>
            </AnimatePresence>

            <div className={styles.progressBar}>
              <motion.div
                className={styles.progress}
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${logoutSteps[currentStep].progress}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className={styles.stepIndicator}
                key={`indicator-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {logoutSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.dot} ${
                      index === currentStep ? styles.active : ''
                    } ${index < currentStep ? styles.completed : ''}`}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Logout; 