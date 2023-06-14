import axios from 'axios';
import queryString from 'query-string';
import { OverviewPageInterface, OverviewPageGetQueryInterface } from 'interfaces/overview-page';
import { GetQueryInterface } from '../../interfaces';

export const getOverviewPages = async (query?: OverviewPageGetQueryInterface) => {
  const response = await axios.get(`/api/overview-pages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOverviewPage = async (overviewPage: OverviewPageInterface) => {
  const response = await axios.post('/api/overview-pages', overviewPage);
  return response.data;
};

export const updateOverviewPageById = async (id: string, overviewPage: OverviewPageInterface) => {
  const response = await axios.put(`/api/overview-pages/${id}`, overviewPage);
  return response.data;
};

export const getOverviewPageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/overview-pages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOverviewPageById = async (id: string) => {
  const response = await axios.delete(`/api/overview-pages/${id}`);
  return response.data;
};
