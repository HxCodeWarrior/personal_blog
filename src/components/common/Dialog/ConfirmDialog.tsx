// 对话框组件
import React from 'react';
import { Modal } from 'antd';
import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
  confirmLoading = false,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="确认"
      cancelText="取消"
      className={styles.confirmDialog}
    >
      <p className={styles.content}>{content}</p>
    </Modal>
  );
};

export default ConfirmDialog; 