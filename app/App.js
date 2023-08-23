import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage />
      {/* <SignupPage /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

