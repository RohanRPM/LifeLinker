import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fetchData } from './Hospital';
// import DeviceInfo from 'react-native-device-info';
// import * as Device from 'expo-device';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, startLocationUpdatesAsync } from 'expo-location';
import SMS from 'react-native-sms';
import SendSMS from 'react-native-sms'

let contactNumbers = []

const dialCall = (number) => {
  let phoneNumber = '';
  const isAndroid = Platform.OS === 'android';

  if (isAndroid) {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }

  Linking.openURL(phoneNumber);
};



const Contact = ({ name, phoneNumber }) => (
  <TouchableOpacity style={styles.contactContainer} onPress={handleContactPress}>
    <MaterialIcons name="person" size={24} color="#FF5659" />
    <Text style={styles.contactText}>{name}</Text>
    <TouchableOpacity style={styles.callButton}>
      <MaterialIcons name="call" size={24} color="black" onPress={() => dialCall(phoneNumber)} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const handlePlacePress = () => {
  console.log('Place pressed');
};

const handleAddPress = () => {
  console.log('Add pressed');
};

const handleNaturePress = () => { 
  console.log('Nature pressed');
};


const handleContactPress = (index) => {
  console.log(`Contact ${index} pressed`);
};


const handleExtraPress = () => {
  console.log('Extra pressed');
};



const HomePage = () => {

  const [search, setSearch] = useState('');
  const userInfo = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null });
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  
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

  const navigation = useNavigation();
  const userContacts = userInfo.contacts;

  const getCurrentLocation = async () => {
    // setIsLoading(true);
    try {
      const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true }); // Enable high accuracy mode
      setCurrentPosition({ latitude: coords.latitude, longitude: coords.longitude });
      // alert("Inside the part where we fetch coords" + coords.latitude + coords.longitude);
      return [coords.longitude, coords.latitude];
    } catch (error) {
      console.error('Error getting current location:', error);
      // setIsLoading(false);
      Alert.alert(
        'Error',
        'Failed to get current location. Please make sure location services are enabled and try again.'
        );
      }
    };
    
    
    const sendMessage = async (messageWithLocation, phoneNumber)  =>  {
      // const phoneNumber = contact;
      // const messageWithLocation = `${message} Lat: ${currentPosition.latitude}, Long: ${currentPosition.longitude}`;
      console.log(messageWithLocation + " " + phoneNumber);
      alert(messageWithLocation + " " + phoneNumber);
      

      SendSMS.send(
        {
          body: messageWithLocation,
          recipients: [phoneNumber],
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS Sent Completed');
          } else if (cancelled) {
            console.log('SMS Sent Cancelled');
          } else if (error) {
            console.log('Some error occured');
          }
        },
      );
    };

    //   await SMS.send({
    //     phoneNumber: phoneNumber,
    //     message: messageWithLocation,
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true,
    //     onSend: (status) => {
    //       console.log(`Message sent to ${phoneNumber}:`, status);
    //     },
    //     onFail: (error) => {
    //     console.error(`Error sending message to ${phoneNumber}:`, error);
    //   },onPress: (status){
    //     console.log('message sending initiated');
    //   }
    // });
  // };
  
  async function sendEmergencyMessageWithLocation() {
    const location = await getCurrentLocation();
    // alert(location[0] + " " + location[1]);
    // console.log("Contact detail : " + userInfo.contact);
    
    // const contacts = userInfo.contact;\
    const contactNumbers = [];
    {
      filteredContacts.map((contact, index) =>(
        contactNumbers.push({"name":contact.name, "number": contact.phoneNumber})
      ));
    }

    locationString = "" + location[1] + "," + location[0];
    let mapLink = `http://maps.google.com/maps?daddr=${locationString}`

    for (const contact of contactNumbers) {
      alert("Contact detail : " + contact["number"]);
      sendMessage(`I met an accident! Check this message immediately. My location is: ${mapLink}`, contact["number"]);
    }
  }
  function openHomePage() {
    navigation.push('HomePage');
  }
  const handleSOSPress = async () => {
    console.log('SOS pressed');
    try {
      await sendEmergencyMessageWithLocation();
      openHomePage();
    } catch (error) {
      console.error('Error sending emergency message:', error);
    }
  };
  const SOSButton = () => (
    <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
      <Text style={styles.sosText}>SOS</Text>
    </TouchableOpacity>
  );
  const ExtraButton = ({ iconName, onPress, display }) => (
    <TouchableOpacity style={styles.extraButton} onPress={onPress}>
      {iconName && <MaterialIcons name={iconName} size={32} color="black" />}
      <Text>{iconName}</Text>
    </TouchableOpacity>
  );

  const [isPhoneLocked, setIsPhoneLocked] = useState(true);

  // useEffect(() => {
  //   const checkLockScreen = async () => {
  //     try {
  //       const lockScreenType = await Device.getLockScreenType();
  //       setIsPhoneLocked(lockScreenType !== 'None');
  //     } catch (error) {
  //       console.log('Error checking lock screen type:', error);
  //     }
  //   }

  //   checkLockScreen();
  // }, []);

  const ICONS = [
    // { name: 'Medical Info', onPress: () => { handlePlacePress(); } },
    { name: 'person', onPress: () => { handlePersonPress(); }, display: 'User Info' },
    // { name: 'nature', onPress: () => { handleNaturePress(); } },
    { name: 'local-hospital', onPress: () => { handleHospitalPress(); }, display: 'Nearby-Hospital' },
  ];

  const createExtraButtons = (icons) => icons.map((icon, index) => (
    <ExtraButton
      key={index}
      iconName={icon.name}
      onPress={icon.onPress}
    />
  ));

  const ButtonGrid = ({ onPress }) => (
    <View style={styles.buttonGrid}>
      {createExtraButtons(ICONS)}
    </View>
  );
  const handlePersonPress = () => {
    navigation.push('UserInfo');
  }
  const handleHospitalPress = () => {
    navigation.push('Hospital');
  };

  const filteredContacts = Array.isArray(userContacts)
    ? userContacts.filter(contact =>
      typeof contact.name === 'string' && contact.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleEditInfo = () => {
    navigation.navigate('EditInfo');
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.userBar}>
        <View style={{ flexDirection: 'row', gap: 20, marginLeft: 10 }}>

          <MaterialIcons name='person' size={24} color='white' />
          <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
        <TouchableOpacity onPress={() => handleEditInfo()}>
          {/* <Text style={styles.userInfoText}>User Info</Text> */}
          {isPhoneLocked && <MaterialIcons name="edit" size={24} color="white" />}
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {filteredContacts.map((contact, index) => (
            <Contact key={index} name={contact.name} phoneNumber={contact.phoneNumber} />
          ))}
          <SOSButton />
          <ButtonGrid />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    fontWeight: 500,
    backgroundColor: 'white',
  },
  sosButton: {
    width: '100%',
    height: 80,
    backgroundColor: '#FF5659',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
  },
  sosText: {
    color: 'white',
    fontSize: 38,
  },
  buttonGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexWrap: "wrap",
  },
  extraButton: {
    width: "45%",
    height: 90,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    borderBottomWidth: 1,
    flex: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#E1E3DE',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  contactText: {
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    elevation: 10,
  },
  callButton: {
    marginLeft: 'auto',
  },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2E2F2F',
    elevation: 5,
    marginTop: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfoButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FF5659',
    borderRadius: 5,
    elevation: 2,
  },
  userInfoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  }
});

export default HomePage;