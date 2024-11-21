import React, { useState } from 'react';
import { Form, Input, Button, message, Steps } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '@/utils/Auth/ForgetPasswd/validators';
import authService from '@/services/api/authService';
import { useCountDown } from '@/hooks/useCountDown';
import styles from './ForgetPasswd.module.scss';
import { ValidationErrors } from '../types';

const ForgetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const { countdown, startCountdown } = useCountDown(60);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const steps = [
    { title: '验证邮箱', icon: <UserOutlined /> },
    { title: '验证码', icon: <SafetyCertificateOutlined /> },
    { title: '重置密码', icon: <LockOutlined /> },
  ];

  const handleSendCode = async () => {
    try {
      const email = form.getFieldValue('email');
      if (!validateEmail(email)) {
        setErrors({ email: '请输入有效的邮箱地址' });
        message.error('请输入有效的邮箱地址');
        return;
      }
      
      setErrors({}); // 清除错误
      await authService.sendVerificationCode(email);
      startCountdown();
      message.success('验证码已发送');
      setEmail(email);
      setCurrentStep(1);
    } catch (error) {
      setErrors({ email: '发送验证码失败，请稍后重试' });
      message.error('发送验证码失败，请稍后重试');
    }
  };

  const handleVerifyCode = async (values: any) => {
    try {
      setErrors({}); // 清除错误
      // 验证码校验逻辑
      setCurrentStep(2);
    } catch (error) {
      setErrors({ verificationCode: '验证码验证失败' });
      message.error('验证码验证失败');
    }
  };

  const handleResetPassword = async (values: any) => {
    try {
      const { newPassword, confirmPassword } = values;
      
      if (newPassword !== confirmPassword) {
        setErrors({ confirmPassword: '两次输入的密码不一致' });
        message.error('两次输入的密码不一致');
        return;
      }

      if (!validatePassword(newPassword)) {
        setErrors({ newPassword: '密码必须包含大小写字母、数字和特殊字符，长度8-20位' });
        message.error('密码必须包含大小写字母、数字和特殊字符，长度8-20位');
        return;
      }

      setErrors({}); // 清除错误
      await authService.resetPassword({
        email,
        code: form.getFieldValue('verificationCode'),
        newPassword
      });

      message.success('密码重置成功！');
      // 跳转到登录页
    } catch (error) {
      setErrors({ newPassword: '密码重置失败，请重试' });
      message.error('密码重置失败，请重试');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Form.Item
              name="email"
              className={styles.formItem}
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email}
            >
              <div className={styles.inputWrapper}>
                <UserOutlined className={styles.inputIcon} />
                <Input
                  placeholder="请输入邮箱"
                  size="large"
                  className={errors.email ? styles.error : ''}
                />
              </div>
            </Form.Item>
            <Button
              type="primary"
              block
              size="large"
              onClick={handleSendCode}
            >
              下一步
            </Button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Form.Item
              name="verificationCode"
              rules={[{ required: true, message: '请输入验证码' }]}
              validateStatus={errors.verificationCode ? 'error' : ''}
              help={errors.verificationCode}
            >
              <Input
                prefix={<SafetyCertificateOutlined />}
                placeholder="请输入验证码"
                size="large"
                addonAfter={
                  <Button
                    type="link"
                    disabled={countdown > 0}
                    onClick={handleSendCode}
                  >
                    {countdown > 0 ? `${countdown}s后重新发送` : '重新发送'}
                  </Button>
                }
              />
            </Form.Item>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => form.validateFields().then(handleVerifyCode)}
            >
              验证
            </Button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: '请输入新密码' }]}
              validateStatus={errors.newPassword ? 'error' : ''}
              help={errors.newPassword}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入新密码"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: '请确认新密码' }]}
              validateStatus={errors.confirmPassword ? 'error' : ''}
              help={errors.confirmPassword}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请确认新密码"
                size="large"
              />
            </Form.Item>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => form.validateFields().then(handleResetPassword)}
            >
              重置密码
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.forgetPasswordContainer}>
      <motion.div
        className={styles.formCard}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>重置密码</h1>
        <Steps
          current={currentStep}
          items={steps}
          style={{ marginBottom: '2rem' }}
        />
        <Form
          form={form}
          layout="vertical"
          className={styles.form}
        >
          {renderStepContent()}
        </Form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword; 