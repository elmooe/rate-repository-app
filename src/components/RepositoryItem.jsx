import { View, Image, StyleSheet, Pressable } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 10,
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imgContainer: {
    padding: 10,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.backgroundPrimary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  text: {
    padding: 5,
    flexGrow: 0,
  },
  topTextContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  bottomText: {
    padding: 5,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
  },
  urlButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

const RepositoryItemTop = ({ avatarUrl, fullName, description, language }) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: avatarUrl }} testID="repositoryItemImage" />
      </View>
      <View style={styles.topTextContainer}>
        <StyledText fontWeight="bold" testID="repositoryItemFullName">{fullName}</StyledText>
        <StyledText color="textSecondary" testID="repositoryItemDescription">{description}</StyledText>
        <View style={styles.text}>
          <StyledText style={styles.language} testID="repositoryItemLanguage">{language}</StyledText>
        </View>
      </View>
    </View>
  );
};

const RepositoryItemBottom = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  const parsedStargazers = stargazersCount >= 1000 ? (stargazersCount / 1000).toFixed(1) + 'k' : stargazersCount;
  const parsedForks = forksCount >= 1000 ? (forksCount / 1000).toFixed(1) + 'k' : forksCount;

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold" testID="repositoryItemStars">{parsedStargazers}</StyledText>
        <StyledText color="textSecondary">Stars</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold" testID="repositoryItemForks">{parsedForks}</StyledText>
        <StyledText color="textSecondary">Forks</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold" testID="repositoryItemReviews">{reviewCount}</StyledText>
        <StyledText color="textSecondary">Reviews</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold" testID="repositoryItemRating">{ratingAverage}</StyledText>
        <StyledText color="textSecondary">Rating</StyledText>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, url = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemTop
        avatarUrl={item.ownerAvatarUrl}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
      />
      <RepositoryItemBottom
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
      {url && (
        <Pressable style={styles.urlButton} onPress={() => {
          Linking.openURL(item.url);
        }}>
          <StyledText color="white" fontWeight="bold">Open in Github</StyledText>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;