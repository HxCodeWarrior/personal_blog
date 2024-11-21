import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  title: string;
  content: string;
  onClose: () => void;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  title,
  content,
  onClose,
}) => {
  return (
    <motion.div
      className={styles.previewOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.previewContent}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h1 className={styles.previewTitle}>{title}</h1>
        <div className={styles.markdownContent}>
          <ReactMarkdown
            children={content}
            components={{
              code: ({ node, inline, className, children, ...props }: CodeProps) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArticlePreview; 