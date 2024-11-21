'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Form, Input, message } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { SaveOutlined, RollbackOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './ArticleCreate.module.scss';
import StyledButton from '@/components/common/Button/StyledButton';
import TagSelector from '@/components/common/TagSelector/TagSelector';
import Card from '@/components/cards/base/Card';
import ArticlePreview from '@/components/articles/ArticlePreview/ArticlePreview';
import DraftService from '@/services/draftService';
import ArticleEditor from '@/components/articles/Editor/ArticleEditor';

interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  tags: string[];
}

const ArticleCreate: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);

  const handleSubmit = useCallback(async (values: ArticleFormData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      message.success('文章创建成功！');
      router.push('/articles');
    } catch (error) {
      message.error('创建失败，请重试');
      console.error('Create article error:', error);
    } finally {
      setLoading(false);
    }
  }, [content, router]);

  useEffect(() => {
    const saveDraft = async () => {
      if (form.getFieldsValue()) {
        const values = form.getFieldsValue();
        const draft = {
          id: draftId,
          ...values,
          content
        };

        try {
          const result = await DraftService.saveDraft(draft);
          if (result?.id) {
            setDraftId(result.id);
            setDraftSaved(true);
            setTimeout(() => setDraftSaved(false), 3000);
          }
        } catch (error) {
          console.error('Auto save draft error:', error);
        }
      }
    };

    saveDraft();
  }, [content, form, draftId]);

  useEffect(() => {
    const drafts = DraftService.getAllDrafts();
    if (drafts.length > 0) {
      const latestDraft = drafts[drafts.length - 1];
      if (latestDraft?.id) {
        setDraftId(latestDraft.id);
        form.setFieldsValue({
          title: latestDraft.title,
          summary: latestDraft.summary,
          tags: latestDraft.tags
        });
        setContent(latestDraft.content);
      }
    }
  }, [form]);

  return (
    <motion.div
      className={styles.createContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>创建文章</h1>
        <div className={styles.actions}>
          <span className={styles.draftStatus}>
            {draftSaved && '草稿已保存'}
          </span>
          <StyledButton
            buttonType="default"
            buttonVariant="view"
            icon={<EyeOutlined />}
            onClick={() => setShowPreview(true)}
          >
            预览
          </StyledButton>
          <StyledButton
            buttonType="default"
            buttonVariant="view"
            icon={<RollbackOutlined />}
            onClick={() => router.back()}
          >
            返回
          </StyledButton>
        </div>
      </div>

      <Card variant="glass" className={styles.formCard}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" size="large" />
          </Form.Item>

          <Form.Item
            name="summary"
            label="文章摘要"
            rules={[{ required: true, message: '请输入文章摘要' }]}
          >
            <Input.TextArea
              placeholder="请输入文章摘要"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            label="文章标签"
            rules={[{ required: true, message: '请选择至少一个标签' }]}
          >
            <TagSelector />
          </Form.Item>

          <div className={styles.editorWrapper}>
            <label className={styles.editorLabel}>文章内容</label>
            <ArticleEditor
              value={content}
              onChange={setContent}
            />
          </div>

          <div className={styles.submitWrapper}>
            <StyledButton
              buttonType="primary"
              buttonVariant="create"
              icon={<SaveOutlined />}
              disabled={loading}
              type="submit"
              size="large"
            >
              发布文章
            </StyledButton>
          </div>
        </Form>
      </Card>

      <AnimatePresence>
        {showPreview && (
          <ArticlePreview
            title={form.getFieldValue('title') || '未命名文章'}
            content={content}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleCreate;
