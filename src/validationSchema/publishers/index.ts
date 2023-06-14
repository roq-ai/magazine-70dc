import * as yup from 'yup';
import { categoryValidationSchema } from 'validationSchema/categories';
import { overviewPageValidationSchema } from 'validationSchema/overview-pages';

export const publisherValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  category: yup.array().of(categoryValidationSchema),
  overview_page: yup.array().of(overviewPageValidationSchema),
});
