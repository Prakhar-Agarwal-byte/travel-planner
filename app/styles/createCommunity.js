import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.xxLarge,
    textAlign: "center",
    color: COLORS.black,
    fontFamily: FONT.bold,
    marginBottom: SIZES.medium,
  },
  inputContainer: {
    marginBottom: SIZES.large,
    marginTop: SIZES.large,
  },
  input: {
    borderWidth: 2,
    marginVertical: SIZES.small,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall,
    fontFamily: FONT.regular,
  },
  buttonContainer: {
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    ...SHADOWS.medium, // Apply shadow from theme
    backgroundColor: COLORS.tertiary,
  },
});

export default styles;
