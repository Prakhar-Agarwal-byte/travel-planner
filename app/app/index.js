import { View, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { ScreenHeaderBtn, Welcome, Nearbytrips } from "../components";
import Trip from "./trip";

const Home = () => {
  return <Trip />;
};

export default Home;
