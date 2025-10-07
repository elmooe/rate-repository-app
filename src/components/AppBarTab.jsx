import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: theme.appBar.textPrimary,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Link to={to}>
        <Text style={styles.text}>{title}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;