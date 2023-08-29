import { Stack, Slot } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT, COLORS } from "../constants";
import { Text } from "react-native";
import { Provider } from "../context/auth";

// SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // return <Stack onLayout={onLayoutRootView} />
  return (
    <Provider>
      <Stack onLayout={onLayoutRootView} />
    </Provider>
  );
};

export default Layout;
