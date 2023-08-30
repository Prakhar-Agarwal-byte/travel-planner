import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import styles from "../../styles/profile";

import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/auth";

const UserProfile = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const { data, isLoading, error } = useFetch(`users/profile/${params.id}`);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.logo}
              dimension="100%"
              handlePress={() => router.push("/")}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={{
                uri: user?.profileImage
              }}
              dimension="100%"
              handlePress={() => router.push("/profile")}
            />
          ),
          headerTitle: "",
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={{ uri: data?.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{data?.name}</Text>
            <Text style={styles.userEmail}>{data?.email}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
