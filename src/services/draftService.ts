import { debounce } from 'lodash';

interface ArticleDraft {
  id?: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  lastSaved?: Date;
}

class DraftService {
  private static STORAGE_KEY = 'article_drafts';

  // 保存草稿
  static saveDraft = debounce(async (draft: ArticleDraft) => {
    try {
      const drafts = this.getAllDrafts();
      const draftId = draft.id || new Date().getTime().toString();
      
      const updatedDraft = {
        ...draft,
        id: draftId,
        lastSaved: new Date()
      };

      const existingDraftIndex = drafts.findIndex(d => d.id === draftId);
      
      if (existingDraftIndex !== -1) {
        drafts[existingDraftIndex] = updatedDraft;
      } else {
        drafts.push(updatedDraft);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
      return updatedDraft;
    } catch (error) {
      console.error('Save draft error:', error);
      throw error;
    }
  }, 1000);

  // 获取所有草稿
  static getAllDrafts(): ArticleDraft[] {
    try {
      const drafts = localStorage.getItem(this.STORAGE_KEY);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Get drafts error:', error);
      return [];
    }
  }

  // 获取单个草稿
  static getDraft(id: string): ArticleDraft | null {
    try {
      const drafts = this.getAllDrafts();
      return drafts.find(draft => draft.id === id) || null;
    } catch (error) {
      console.error('Get draft error:', error);
      return null;
    }
  }

  // 删除草稿
  static deleteDraft(id: string): boolean {
    try {
      const drafts = this.getAllDrafts();
      const filteredDrafts = drafts.filter(draft => draft.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredDrafts));
      return true;
    } catch (error) {
      console.error('Delete draft error:', error);
      return false;
    }
  }
}

export default DraftService; 