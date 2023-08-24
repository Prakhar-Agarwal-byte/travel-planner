import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";

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
  input: {
    borderWidth: 2,
    marginVertical: SIZES.small,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall,
    fontFamily: FONT.regular,
  },
  dropdownContainer: {
    marginTop: SIZES.small,
    marginBottom: SIZES.medium,
  },
  dropdownStyle: {
    borderWidth: 2,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    zIndex: 10000,
  },
  buttonContainer: {
    backgroundColor: COLORS.tertiary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});

export default styles;
