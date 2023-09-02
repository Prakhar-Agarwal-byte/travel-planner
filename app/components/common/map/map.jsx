import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import polyline from '@mapbox/polyline';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [directionPoints, setDirectionPoints] = useState([]);

  useEffect(() => {
    // Get user's current location
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchDirections(latitude, longitude);
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const fetchDirections = async (userLat, userLng) => {
    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const modeOfTransport = 'driving'; // Change this based on your requirements
    const origin = `25.321684,82.987289`;
    const destination = `27.492413,77.673676}`;

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${modeOfTransport}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setDirectionPoints(decodedPoints);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  }

  const decodePolyline = (encoded) => {
    const decoded = polyline.decode(encoded);
    const coordinates = decoded.map(point => {
      const [latitude, longitude] = point;
      return { latitude, longitude };
    });
    return coordinates;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 25.321684,
          longitude: 82.987289,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="You are here"
          />
        )}

        {directionPoints.length > 0 && (
          <Polyline
            coordinates={directionPoints}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}

        {/* Add markers for "from" and "to" locations */}
        <Marker
          coordinate={{ latitude: 25.321684, longitude: 82.987289 }}
          title="From Location"
        />
        <Marker
          coordinate={{ latitude: 27.492413, longitude: 77.673676 }}
          title="To Location"
        />
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});