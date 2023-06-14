import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTranslation } from 'apiSdk/translations';
import { Error } from 'components/error';
import { translationValidationSchema } from 'validationSchema/translations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ArticleInterface } from 'interfaces/article';
import { UserInterface } from 'interfaces/user';
import { getArticles } from 'apiSdk/articles';
import { getUsers } from 'apiSdk/users';
import { TranslationInterface } from 'interfaces/translation';

function TranslationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TranslationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTranslation(values);
      resetForm();
      router.push('/translations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TranslationInterface>({
    initialValues: {
      language: '',
      translated_title: '',
      translated_content: '',
      article_id: (router.query.article_id as string) ?? null,
      translator_id: (router.query.translator_id as string) ?? null,
    },
    validationSchema: translationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Translation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="language" mb="4" isInvalid={!!formik.errors?.language}>
            <FormLabel>Language</FormLabel>
            <Input type="text" name="language" value={formik.values?.language} onChange={formik.handleChange} />
            {formik.errors.language && <FormErrorMessage>{formik.errors?.language}</FormErrorMessage>}
          </FormControl>
          <FormControl id="translated_title" mb="4" isInvalid={!!formik.errors?.translated_title}>
            <FormLabel>Translated Title</FormLabel>
            <Input
              type="text"
              name="translated_title"
              value={formik.values?.translated_title}
              onChange={formik.handleChange}
            />
            {formik.errors.translated_title && <FormErrorMessage>{formik.errors?.translated_title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="translated_content" mb="4" isInvalid={!!formik.errors?.translated_content}>
            <FormLabel>Translated Content</FormLabel>
            <Input
              type="text"
              name="translated_content"
              value={formik.values?.translated_content}
              onChange={formik.handleChange}
            />
            {formik.errors.translated_content && (
              <FormErrorMessage>{formik.errors?.translated_content}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<ArticleInterface>
            formik={formik}
            name={'article_id'}
            label={'Select Article'}
            placeholder={'Select Article'}
            fetcher={getArticles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'translator_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'translation',
  operation: AccessOperationEnum.CREATE,
})(TranslationCreatePage);
