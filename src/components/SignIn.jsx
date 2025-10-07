import StyledText from './StyledText';
import { useFormik } from 'formik';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

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

const SignInForm = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.username}</StyledText>
      )}
      <TextInput
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.password}</StyledText>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <StyledText style={styles.text} fontWeight="bold">Sign in</StyledText>
      </Pressable>
    </View>
  );
}

const SignIn = () => {

  const onSubmit = (values) => {
  console.log(values);
};

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;