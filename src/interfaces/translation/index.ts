import { ArticleInterface } from 'interfaces/article';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TranslationInterface {
  id?: string;
  language: string;
  translated_title: string;
  translated_content: string;
  article_id: string;
  translator_id: string;
  created_at?: any;
  updated_at?: any;

  article?: ArticleInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TranslationGetQueryInterface extends GetQueryInterface {
  id?: string;
  language?: string;
  translated_title?: string;
  translated_content?: string;
  article_id?: string;
  translator_id?: string;
}
