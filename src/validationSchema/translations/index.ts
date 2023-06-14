import * as yup from 'yup';

export const translationValidationSchema = yup.object().shape({
  language: yup.string().required(),
  translated_title: yup.string().required(),
  translated_content: yup.string().required(),
  article_id: yup.string().nullable().required(),
  translator_id: yup.string().nullable().required(),
});
