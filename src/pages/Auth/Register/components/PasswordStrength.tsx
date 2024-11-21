import React, { useMemo } from 'react';
import styles from './PasswordStrength.module.scss';
import { evaluatePasswordStrength, calculatePasswordEntropy } from '@/utils/Auth/Register/RegisterSecurity';

interface PasswordStrengthProps {
  password: string;
  username: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, username }) => {
  const analysis = useMemo(() => {
    if (!password) return null;
    
    const strengthResult = evaluatePasswordStrength(password);
    const entropy = calculatePasswordEntropy(password);
    
    return {
      ...strengthResult,
      entropy,
      isStrongEnough: strengthResult.score >= 3 && entropy >= 50
    };
  }, [password]);

  if (!analysis) return null;

  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`${styles.bar} ${index < analysis.score ? styles[`strength${analysis.score}`] : ''}`}
          />
        ))}
      </div>
      <div className={styles.details}>
        <span className={styles.text}>
          强度: {analysis.score === 4 ? '非常强' : 
                 analysis.score === 3 ? '强' :
                 analysis.score === 2 ? '中等' :
                 analysis.score === 1 ? '弱' : '非常弱'}
        </span>
        <span className={styles.entropy}>
          熵值: {Math.round(analysis.entropy)} bits
        </span>
        <span className={styles.crackTime}>
          破解时间: {analysis.crackTime}
        </span>
      </div>
      {analysis.warnings && (
        <div className={styles.warning}>
          {analysis.warnings}
        </div>
      )}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <ul>
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength; 