import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    searchBar: {
        width: "80%",
        height: 40,
        borderColor: COLORS.gray2,
        borderWidth: 1,
        borderRadius: SIZES.medium,
        marginBottom: SIZES.medium,
        paddingHorizontal: SIZES.medium,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.large,
        margin: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
        marginTop: SIZES.medium,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
        marginBottom: SIZES.medium,
    },
    userName: {
        fontSize: SIZES.xxLarge,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: SIZES.small,
        color: COLORS.primary,
    },
    userEmail: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        alignSelf: "center",
        marginBottom: SIZES.medium,
    },
    editProfileButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    editProfileButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: "bold",
        textAlign: "center",
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: SIZES.medium,
    },
    tab: {
        flex: 1,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.medium,
        alignItems: "center",
        backgroundColor: "transparent",
        marginRight: SIZES.small/4,
    },
    activeTab: {
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.lightWhite,
    },
    tabText: {
        fontSize: SIZES.medium,
        fontWeight: "bold",
        color: COLORS.gray,
    },
    activeTabText: {
        color: COLORS.secondary,
    },
    tabContentsContainer: {
        flex: 1,
    },
    tabContent: {
        paddingVertical: SIZES.medium,
        borderBottomWidth: 1,
        borderColor: COLORS.gray2,
    },
    tripTitle: {
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
    tripDate: {
        color: COLORS.gray,
    },
    communityName: {
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
});

export default styles;
