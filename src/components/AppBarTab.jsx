import { Pressable, StyleSheet } from "react-native";
import StyledText from "./StyledText";
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
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <StyledText style={styles.text}>{title}</StyledText>
      </Pressable>
    );
  }

  return (
    <Link to={to}>
      <StyledText style={styles.text}>{title}</StyledText>
    </Link>
  );
};

export default AppBarTab;