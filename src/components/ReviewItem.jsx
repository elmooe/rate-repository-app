import { View, StyleSheet, Pressable, Alert } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';
import { useNavigate } from "react-router-native";
import { useMutation } from '@apollo/client/react';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    gap: 10,
  },
  openButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const ReviewItem = ({ review, reviewActions = false }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });

  const handleViewRepository = () => {
    navigate(`/${review.repositoryId}`);
  };

  const handleDeleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReview({ variables: { deleteReviewId: review.id } });
          } catch (error) {
            console.error('Error deleting review:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingCircle}>
          <StyledText color="primary" fontWeight="bold">{review.rating}</StyledText>
        </View>
        <View style={styles.userInfo}>
          {!reviewActions ? (
            <StyledText fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
              {review.user.username}
            </StyledText>
          ) : (
            <StyledText fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
              {review.repository.name}
            </StyledText>
          )}
          <StyledText color="textSecondary" style={{ marginBottom: 5 }}>
            {new Date(review.createdAt).toLocaleDateString()}
          </StyledText>
          <StyledText fontSize="subheading">
            {review.text}
          </StyledText>
          {reviewActions && (
            <View style={styles.buttons}>
              <Pressable style={styles.openButton} onPress={handleViewRepository}>
                <StyledText fontWeight="bold" style={{ color: theme.colors.backgroundPrimary }}>View repository</StyledText>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={handleDeleteReview}>
                <StyledText fontWeight="bold" style={{ color: theme.colors.backgroundPrimary }}>Delete review</StyledText>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;