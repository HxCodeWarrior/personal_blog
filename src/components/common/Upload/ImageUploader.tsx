import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import styles from './ImageUploader.module.scss';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  maxSize?: number; // 单位：MB
  accept?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  maxSize = 5,
  accept = 'image/*'
}) => {
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isValidType = file.type.startsWith('image/');
    if (!isValidType) {
      message.error('只能上传图片文件！');
      return false;
    }

    const isValidSize = file.size / 1024 / 1024 < maxSize;
    if (!isValidSize) {
      message.error(`图片大小不能超过 ${maxSize}MB！`);
      return false;
    }

    return true;
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onSuccess(data, file);
      onUploadSuccess(data.url);
      message.success('图片上传成功！');
    } catch (error) {
      console.error('Upload error:', error);
      message.error('图片上传失败，请重试');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept,
    beforeUpload,
    customRequest,
  };

  return (
    <Upload {...uploadProps} className={styles.uploader}>
      <div className={styles.trigger}>
        {loading ? <LoadingOutlined /> : <PictureOutlined />}
        <span className={styles.text}>点击上传图片</span>
      </div>
    </Upload>
  );
};

export default ImageUploader; 