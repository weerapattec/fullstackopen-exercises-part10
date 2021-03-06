import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.'),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textBox: {
    fontFamily: theme.fonts.main,
    borderColor: theme.colors.textSecondary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginVertical: 5,
  },
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textBox}
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        style={styles.textBox}
        secureTextEntry={true}
        name="password"
        placeholder="Password"
        testID="passwordField"
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.loginButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export default SignIn;
