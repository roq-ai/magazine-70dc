import { TranslationInterface } from 'interfaces/translation';
import { CategoryInterface } from 'interfaces/category';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  category_id: string;
  author_id: string;
  editor_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  translation?: TranslationInterface[];
  category?: CategoryInterface;
  user_article_author_idTouser?: UserInterface;
  user_article_editor_idTouser?: UserInterface;
  _count?: {
    translation?: number;
  };
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  category_id?: string;
  author_id?: string;
  editor_id?: string;
  status?: string;
}
