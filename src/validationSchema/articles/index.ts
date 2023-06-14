import * as yup from 'yup';
import { translationValidationSchema } from 'validationSchema/translations';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  status: yup.string().required(),
  category_id: yup.string().nullable().required(),
  author_id: yup.string().nullable().required(),
  editor_id: yup.string().nullable(),
  translation: yup.array().of(translationValidationSchema),
});
