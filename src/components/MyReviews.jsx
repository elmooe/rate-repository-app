import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";
import { StyleSheet } from "react-native";
import StyledText  from "./StyledText";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <StyledText>Loading...</StyledText>;
  if (error) return <StyledText>Error: {error.message}</StyledText>;

  const { reviews } = data.me;
  if (!reviews || reviews.edges.length === 0) {
    return <StyledText>No reviews</StyledText>;
  }

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} reviewActions={true} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;