import React, { useState, useEffect } from 'react';
import { Text, View, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '../components/Spinner'
import MapView, { Marker } from 'react-native-maps';
// var MapView = require('react-native-maps');
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, startLocationUpdatesAsync } from 'expo-location';
import { YOUR_MAPBOX_ACCESS_TOKEN } from './secret'

const Hospital = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null });
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    const requestGeolocationPermission = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === 'granted') {
          console.log('Location permission granted');
          setIsPermissionGranted(true);
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Please Allow Location Permission First',
            'Location Permission is needed for the application to function properly'
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestGeolocationPermission();
  }, []);

  useEffect(() => {
    if (isPermissionGranted) {
      getCurrentLocation();
    }
  }, [isPermissionGranted]);

  useEffect(() => {
    if (currentPosition.latitude) {
      fetchData();
    }
  }, [currentPosition]);

  const handleHospitalPress = (hospital) => {
    setSelectedHospital(hospital);
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true }); // Enable high accuracy mode
      setCurrentPosition({ latitude: coords.latitude, longitude: coords.longitude });
    } catch (error) {
      console.error('Error getting current location:', error);
      setIsLoading(false);
      Alert.alert(
        'Error',
        'Failed to get current location. Please make sure location services are enabled and try again.'
      );
    }
  };

  const fetchNearbyHospitals = async (latitude, longitude) => {
    const radius = 5000; // Decrease the radius to search within a smaller area (e.g., 5 kilometers)?
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?type=poi&limit=1&routing=true&proximity=${longitude},${latitude}&radius=${radius}&access_token=${YOUR_MAPBOX_ACCESS_TOKEN}`
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      console.log("\n\n\n");
      console.log(responseData);
      return responseData.features; // Return only the features array
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw new Error('Error fetching hospitals:', error);
    }
  };

  if (!isPermissionGranted && currentPosition.latitude) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', color: '#666' }}>Nearby Hospitals</Text>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </View>
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: currentPosition.latitude - 0.09,
              longitude: currentPosition.longitude - 0.02,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            onRegionChange={() => setSelectedHospital(null)} // Reset selected hospital when map region changes
          >
            {nearbyHospitals.map(item => (
              <Marker
                key={item.id} // Change the key to match the ID in the response data
                title={item.text} // Change the title to match the relevant field in the response data
                coordinate={{ latitude: item.geometry.coordinates[1], longitude: item.geometry.coordinates[0] }} // Adjust the coordinates based on the structure of the response data
                onPress={() => handleHospitalPress(item)} // Handle press event to select the hospital
              />
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};


const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNearbyHospitals(currentPosition.latitude, currentPosition.longitude);
      console.log("Fetched data:", data);
      if (data && data.length > 0) { // Check if data is not null and has length
        setNearbyHospitals(data); // Set nearbyHospitals directly without parsing
        location = "" + data[0]["center"][1] + ", " + data[0]["center"][0];
        startLocation = "" + currentPosition.latitude + ", " + currentPosition.longitude
        Linking.openURL(`http://maps.google.com/maps?daddr=${location}&saddr=${startLocation}&directionsmode=driving`)
        .then(() => console.log('Maps app opened'))
        .catch(() => console.log('Error opening maps app'));
      } else {
        console.log("No data fetched");
        // Handle case where no data is fetched
      }
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      Alert.alert('Error', 'Failed to fetch nearby hospitals. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  
export { Hospital as default, fetchData };

  const parseHospitalData = hospital => ({
    id: hospital.id, // Change the field names to match the structure of the response data
    text: hospital.text,
    geometry: {
      coordinates: hospital.geometry.coordinates,
    },
    features: hospital.features
  });
