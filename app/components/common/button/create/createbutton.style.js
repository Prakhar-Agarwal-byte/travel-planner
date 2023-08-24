import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 0,
        zIndex: 100,
    },
    createButton: {
        position: 'absolute',
        bottom: SIZES.large,
        alignSelf: 'center',
        backgroundColor: COLORS.tertiary,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});

export default styles;
