import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 0,
        zIndex: 100,
    },
    button: {
        position: 'absolute',
        bottom: SIZES.large,
        alignSelf: 'center',
        backgroundColor: COLORS.tertiary,
        width: 50,
        height: 50,
        borderRadius: 25,
        right: 20,
        bottom: 35,
        ...SHADOWS.small,
    },
});

export default styles;
