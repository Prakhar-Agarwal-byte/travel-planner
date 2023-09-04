import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { axiosInstance } from "../../config/api";
import { useAuth } from "../../context/auth";
import * as Location from "expo-location";
import MapboxGL, { Logger } from "@rnmapbox/maps";

const Navigation = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [routeDirections, setRouteDirections] = useState(null);
  const [coords, setCoords] = useState([12.48839, 50.72724]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState([
    12.48839, 50.72724,
  ]);

  async function getPermissionLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoords([location.coords.longitude, location.coords.latitude]);
  }

  useEffect(() => {
    getPermissionLocation();
    console.log("User's location: ", coords);
    //console.log(store.longitude);
    // if (selectedRouteProfile !== null) {
    //   createRouterLine(coords, selectedRouteProfile);
    // }
  }, []);

  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(coords, routeProfile) {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${destinationCoords[0]},${destinationCoords[1]}`;
    const geometries = "geojson";
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      const data = json.routes.map((data) => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = json["routes"][0]["geometry"]["coordinates"];
      let destinationCoordinates =
        json["routes"][0]["geometry"]["coordinates"].slice(-1)[0];
      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      console.log(e);
    }
  }

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
                uri: user?.profileImage,
              }}
              dimension="100%"
              handlePress={() => router.push("/profile")}
            />
          ),
          headerTitle: "",
        }}
      />
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}
      >
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[12.48839, 50.72724]}
          animationMode={"flyTo"}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: "#FA9E14",
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}
          >
            <View style={styles.destinationIcon}>
              <Ionicons name="storefront" size={24} color="#E1710A" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={"gps"}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
    </SafeAreaView>
  );
  w;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0 ,0 , 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
  },
  cardContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  flatList: {
    position: "absolute",
    bottom: 20,
    left: Dimensions.get("window").width / 2 - 40,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  selectedRouteProfileButton: {
    backgroundColor: "#FA9E14",
    borderColor: "#FA9E14",
  },
  routeProfileButtonText: {
    color: "#fff",
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: "white",
  },
});

export default Navigation;
