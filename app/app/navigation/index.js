import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { useAuth } from "../../context/auth";
import Mapbox from "@rnmapbox/maps";
import { useLocalSearchParams } from "expo-router";
import { icons, COLORS } from "../../constants";
import styles from "../../styles/navigation";
import { MaterialIcons } from "@expo/vector-icons";


const APIKEY = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

Mapbox.setAccessToken(APIKEY);
Mapbox.setWellKnownTileServer("Mapbox");

const Navigation = () => {
  const { fromCoordinates, toCoordinates } = useLocalSearchParams();
  const [locate, setLocate] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const startCoords = fromCoordinates.split(",").map((e) => parseFloat(e));
  const destinationCoords = toCoordinates.split(",").map((e) => parseFloat(e));
  const [routeDirections, setRouteDirections] = useState(null);

  async function createRouterLine(coords, routeProfile) {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${destinationCoords[0]},${destinationCoords[1]}`;
    const geometries = "geojson";
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    console.log("url: ", url);

    try {
      let response = await fetch(url);
      let json = await response.json();

      let coordinates = json["routes"][0]["geometry"]["coordinates"];

      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        console.log("routerFeature: ", routerFeature);

        setRouteDirections(routerFeature);
      }
    } catch (e) {
      console.log("error creating route line: ", e);
    }
  }

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

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Track Your Trip</Text>
        <TouchableOpacity style={styles.locateButton} onPress={() => (setLocate(!locate))}>
          {!locate && <MaterialIcons name="my-location" size={40} color="lightblue" />}
          {locate && <MaterialIcons name="location-disabled" size={40} color="lightblue" />}
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        {startCoords && (
          <Mapbox.MapView
            style={styles.map}
            styleURL={Mapbox.StyleURL.Street}
            zoomEnabled={true}
            rotateEnabled={true}
            onDidFinishLoadingMap={async () => {
              await createRouterLine(startCoords, "driving");
            }}
          >
            <Mapbox.Camera
              zoomLevel={15}
              centerCoordinate={[startCoords[0], startCoords[1]]}
              animationMode="flyTo"
              animationDuration={2000}
            />
            {routeDirections && (
              <Mapbox.ShapeSource id="line1" shape={routeDirections}>
                <Mapbox.LineLayer
                  id="routerLine01"
                  style={{
                    lineColor: "#07a3ff",
                    lineWidth: 1.8,
                    lineGapWidth: 1.8,

                  }}
                />
              </Mapbox.ShapeSource>
            )}

            <Mapbox.UserLocation
              animated={true}
              androidRenderMode={"gps"}
              showsUserHeadingIndicator={true}
              minDisplacement={1}
              visible={locate}
            />

            {startCoords && (
              <Mapbox.PointAnnotation
                id="startCoords"
                coordinate={startCoords}
                title="start"
              />
            )}

            {destinationCoords && (
              <Mapbox.PointAnnotation
                id="destinationPoint"
                coordinate={destinationCoords}
                title="destination"
              />
            )}
          </Mapbox.MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Navigation;
