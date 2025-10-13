import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import {useApolloClient, useQuery} from "@apollo/client/react";
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.primary,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: theme.appBar.textPrimary,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, { fetchPolicy: 'network-only' })
  const navigate = useNavigate()
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" to="/" />
        {data?.me ? (
          <>
            <AppBarTab title="Create a review" to="/createReview" />
            <AppBarTab title="My reviews" to="/myReviews" />
            <AppBarTab title="Sign out" onPress={handleSignOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;