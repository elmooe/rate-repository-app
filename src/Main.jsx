import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import SignIn from './components/SignIn';
import SingleRepositoryView from './components/SingleRepositoryView';
import CreateReview from './components/CreateReview';
import MyReviews from './components/MyReviews';
import SignUp from './components/SignUp';
import { Route, Routes, Navigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepositoryView />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;