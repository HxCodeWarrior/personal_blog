import { useState, useCallback } from 'react';
import { LoginFormData, ValidationErrors } from '@/pages/Auth/types';
import { validateLoginForm } from '@/utils/Auth/Login/loginSecurity';
import { debounce } from 'lodash';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const validateField = useCallback(
    debounce((name: string, value: string) => {
      const fieldErrors = validateLoginForm({
        ...formData,
        [name]: value
      });
      
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }, 300),
    [formData]
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (type !== 'checkbox') {
      validateField(name, value);
    }
  };
  
  return {
    formData,
    errors,
    handleChange,
    setErrors
  };
}; 