import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";

const activeTabs = ["Community", "Trip"];

const Welcome = ({
  welcomeMessage,
  activeTab,
}) => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={() => router.push(`/search/${activeTab.toLowerCase()}`)}>
          <Text style={styles.searchInput}>Go to Search-{activeTab} page</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {activeTabs.map((item) => (
          <View style={styles.tabsWrapper}>
            <TouchableOpacity
              style={styles.tab(activeTab, item)}
              onPress={() => {
                router.push(`/${item.toLowerCase()}`);
              }}
            >
              <Text style={styles.tabText(activeTab, item)}>{item}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Welcome;
