import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT, SHADOWS } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.large,
        margin: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: SIZES.medium,
    },
    userName: {
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: SIZES.small,
        color: COLORS.primary,
    },
    userEmail: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        alignSelf: 'center',
        marginBottom: SIZES.medium,
    },
    logoutButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.xSmall,
        marginTop: SIZES.xSmall,
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    tabsWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        borderRadius: SIZES.medium,
        height: '100%',
    },
    tab: (activeTab, item) => ({
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.medium,
        alignItems: 'center',
        backgroundColor: activeTab === item ? COLORS.lightWhite : 'transparent',
        marginRight: SIZES.small / 4,
    }),
    tabText: (activeTab, item) => ({
        fontFamily: FONT.medium,
        color: activeTab === item ? COLORS.secondary : COLORS.gray2,
    }),
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: SIZES.large,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        borderRadius: SIZES.medium,
        height: '100%',
    },
    searchInput: {
        fontFamily: FONT.regular,
        width: '100%',
        height: '100%',
        paddingHorizontal: SIZES.medium,
    },
    searchBtn: {
        width: 50,
        height: '100%',
        backgroundColor: COLORS.tertiary,
        borderRadius: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtnImage: {
        width: '50%',
        height: '50%',
        tintColor: COLORS.white,
    },
    tripContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    },
    logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.lightWhite,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "80%",
        height: "80%",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    },
    tripStatus: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
        textTransform: "capitalize",
    },
});

export default styles;
