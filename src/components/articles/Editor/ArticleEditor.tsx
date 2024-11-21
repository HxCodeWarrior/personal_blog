import React, { useState, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import ImageUploader from '@/components/common/Upload/ImageUploader';
import styles from './ArticleEditor.module.scss';

interface ArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  value,
  onChange,
  height = 500
}) => {
  const handleImageUpload = useCallback((url: string) => {
    // 在光标位置插入图片Markdown语法
    const imageMarkdown = `![image](${url})\n`;
    onChange(value + imageMarkdown);
  }, [value, onChange]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <ImageUploader onUploadSuccess={handleImageUpload} />
      </div>
      <div data-color-mode="auto">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          height={height}
          preview="edit"
          className={styles.editor}
        />
      </div>
    </div>
  );
};

export default ArticleEditor; 