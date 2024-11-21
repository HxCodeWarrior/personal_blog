'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Form, Input, message, Spin } from 'antd';
import { SaveOutlined, RollbackOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../ArticleCreate.module.scss';
import StyledButton from '@/components/common/Button/StyledButton';
import TagSelector from '@/components/common/TagSelector/TagSelector';
import Card from '@/components/cards/base/Card';
import ConfirmDialog from '@/components/common/Dialog/ConfirmDialog';
import ArticleEditor from '@/components/articles/Editor/ArticleEditor';

interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  tags: string[];
}

const ArticleEdit: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  
  // 添加参数验证
  if (!params || !params.slug) {
    router.push('/articles');
    return null;
  }

  const slug = params.slug as string;
  
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 获取文章详情
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await fetch(`/api/articles/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        
        const article = await response.json();
        form.setFieldsValue({
          title: article.title,
          summary: article.summary,
          tags: article.tags.map((tag: any) => tag.type)
        });
        setContent(article.content);
      } catch (error) {
        message.error('获取文章失败');
        console.error('Fetch article error:', error);
        // 如果获取文章失败，重定向到文章列表页
        router.push('/articles');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchArticleDetail();
  }, [slug, form, router]);

  // 更新文章
  const handleSubmit = useCallback(async (values: ArticleFormData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          content,
        }),
      });

      if (!response.ok) throw new Error('Failed to update article');

      message.success('文章更新成功！');
      router.push('/articles');
    } catch (error) {
      message.error('更新失败，请重试');
      console.error('Update article error:', error);
    } finally {
      setLoading(false);
    }
  }, [content, router, slug]);

  // 删除文章
  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete article');

      message.success('文章删除成功！');
      router.push('/articles');
    } catch (error) {
      message.error('删除失败，请重试');
      console.error('Delete article error:', error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }, [router, slug]);

  if (initialLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      className={styles.createContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>编辑文章</h1>
        <div className={styles.actions}>
          <StyledButton
            buttonType="primary"
            buttonVariant="edit"
            icon={<DeleteOutlined />}
            onClick={() => setShowDeleteConfirm(true)}
          >
            删除文章
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
              buttonVariant="edit"
              icon={<SaveOutlined />}
              type="submit"
              size="large"
            >
              更新文章
            </StyledButton>
          </div>
        </Form>
      </Card>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="确认删除"
        content="确定要删除这篇文章吗？此操作不可恢复。"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmLoading={loading}
      />
    </motion.div>
  );
};

export default ArticleEdit; 