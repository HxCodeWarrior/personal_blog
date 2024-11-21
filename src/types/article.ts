export interface Article {
  id: string;
  title: string;
  author: string;
  summary: string;
  tags: Array<{
    name: string;
    type: string;
  }>;
  createdAt: string;
  slug: string;
  readTime?: number;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
} 