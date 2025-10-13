import StyledText from './StyledText';
import { useFormik } from 'formik';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: theme.colors.backgroundPrimary,
    alignSelf: 'center',
  },
  inputError: {
    borderColor: theme.colors.error,
  }
});

const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().required('Rating is required').min(0, 'Rating is a required number between 0 and 100').max(100, 'Rating is a required number between 0 and 100'),
    text: yup.string(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.ownerName && styles.inputError]}
        placeholder="Repository owner name"
        onChangeText={formik.handleChange('ownerName')}
        value={formik.values.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.ownerName}</StyledText>
      )}
      <TextInput
        style={[styles.input, formik.errors.repositoryName && styles.inputError]}
        placeholder="Repository name"
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.repositoryName}</StyledText>
      )}
      <TextInput
        style={[styles.input, formik.errors.rating && styles.inputError]}
        placeholder="Rating between 0 and 100"
        onChangeText={text => formik.setFieldValue('rating', text === '' ? '' : Number(text))}
        value={formik.values.rating.toString()}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.rating}</StyledText>
      )}
      <TextInput
        style={[styles.input, formik.errors.text && styles.inputError]}
        placeholder="Review"
        onChangeText={formik.handleChange('text')}
        value={formik.values.text}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.text}</StyledText>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <StyledText style={styles.text} fontWeight="bold">Create a review</StyledText>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      if (data?.createReview) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/${repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;