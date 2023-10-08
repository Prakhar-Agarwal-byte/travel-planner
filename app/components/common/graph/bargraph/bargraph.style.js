import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        shadowColor: 'rgba(199, 199, 199, 0.5)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    barContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    bar: {
        width: 20,
        backgroundColor: 'steelblue',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        color: '#8B3B3B',
        shadowColor: 'rgba(199, 199, 199, 0.5)',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#023E8A',
        textShadowColor: COLORS.gray2,
        textShadowOffset: { width: 1, height: 1 },
    },
});

export default styles;
