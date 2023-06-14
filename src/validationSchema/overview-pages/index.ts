import * as yup from 'yup';

export const overviewPageValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  publisher_id: yup.string().nullable().required(),
});
