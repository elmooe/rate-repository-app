import { View, Image, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';

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
});

const RepositoryItemTop = ({ avatarUrl, fullName, description, language }) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: avatarUrl }} />
      </View>
      <View style={styles.topTextContainer}>
        <StyledText fontWeight="bold">{fullName}</StyledText>
        <StyledText color="textSecondary">{description}</StyledText>
        <View style={styles.text}>
          <StyledText style={styles.language}>{language}</StyledText>
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
        <StyledText fontWeight="bold">{parsedStargazers}</StyledText>
        <StyledText color="textSecondary">Stars</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold">{parsedForks}</StyledText>
        <StyledText color="textSecondary">Forks</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold">{reviewCount}</StyledText>
        <StyledText color="textSecondary">Reviews</StyledText>
      </View>
      <View style={styles.bottomText}>
        <StyledText fontWeight="bold">{ratingAverage}</StyledText>
        <StyledText color="textSecondary">Rating</StyledText>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;