import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface OverviewPageInterface {
  id?: string;
  title: string;
  description?: string;
  publisher_id: string;
  created_at?: any;
  updated_at?: any;

  publisher?: PublisherInterface;
  _count?: {};
}

export interface OverviewPageGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  publisher_id?: string;
}
