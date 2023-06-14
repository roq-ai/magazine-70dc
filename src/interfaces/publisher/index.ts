import { CategoryInterface } from 'interfaces/category';
import { OverviewPageInterface } from 'interfaces/overview-page';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PublisherInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  category?: CategoryInterface[];
  overview_page?: OverviewPageInterface[];
  user?: UserInterface;
  _count?: {
    category?: number;
    overview_page?: number;
  };
}

export interface PublisherGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
