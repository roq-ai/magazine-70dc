import * as yup from 'yup';
import { articleValidationSchema } from 'validationSchema/articles';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  publisher_id: yup.string().nullable().required(),
  article: yup.array().of(articleValidationSchema),
});
