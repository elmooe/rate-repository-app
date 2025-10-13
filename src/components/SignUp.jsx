import StyledText from './StyledText';
import { useFormik } from 'formik';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useAuthStorage from '../hooks/useAuthStorage';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';

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

const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(1, 'Username is a required string with a length between 5 and 30').max(30, 'Username is a required string with a length between 5 and 30'),
    password: yup.string().required('Password is required').min(5, 'Password is a required string with a length between 5 and 50').max(50, 'Password is a required string with a length between 5 and 50'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username ? styles.inputError : null]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.username}</StyledText>
      ) : null}
      <TextInput
        style={[styles.input, formik.touched.password && formik.errors.password ? styles.inputError : null]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.password}</StyledText>
      ) : null}
      <TextInput
        style={[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? styles.inputError : null]}
        placeholder="Password confirmation"
        secureTextEntry
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
        <StyledText style={{ color: theme.colors.error }}>{formik.errors.passwordConfirmation}</StyledText>
      ) : null}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <StyledText style={styles.text}>Sign Up</StyledText>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn(authStorage);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;