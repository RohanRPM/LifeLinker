import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/color";
import SignupButton from "../components/LoginButton";
import axios from 'axios';
import {useNavigation} from '@react-navigation/native'
import {Button} from 'react-native-paper'

const LoginScreen = () => {
  const [userPhoneNo, setUserPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();

  const sendOTP = async () => {
    try {
      const response = await axios.post('https://his-backend-j0rg.onrender.com/api/send-otp', { PhoneNumber: "+91" + userPhoneNo });
      console.log(response.data);
      Alert.alert('OTP Sent', 'An OTP has been sent to your phone number.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('https://his-backend-j0rg.onrender.com/api/verify-otp', { PhoneNumber: "+91" + userPhoneNo, OTP: otp });
      console.log(response.data);
      Alert.alert('Login Successful', 'You have successfully logged in.');
      // navigation.push('MedicalForm');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please check your OTP and try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 120, alignItems: "center" }}>
          <Image
            source={require("../assets/app_icon.png")}
            style={styles.image}
          />
          <Text style={styles.appname}>App name</Text>
        </View>
        <View style={styles.LoginContainer}>
          <View>
            <Text style={styles.Text}>Login</Text>
          </View>
          <View>
            <Text style={styles.Label}>Phone No.</Text>
            <View style={styles.TextField}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor={"gray"}
                keyboardType="phone-pad"
                value={userPhoneNo}
                onChangeText={(value) => setUserPhoneNo(value)}
                style={styles.phoneInput}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.sendotpLink}
            onPress={sendOTP}
          >
            <Text style={styles.sendotpLinkText}>Send OTP</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.Label}>OTP</Text>
            <View style={styles.TextField}>
              <TextInput
                placeholder="OTP"
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />
            </View>
          </View>
          <View style={styles.SubmitButton}>
            <SignupButton onPress={verifyOTP}>Login</SignupButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  appname: {
    fontSize: 24,
    fontWeight: '400',
  },
  LoginContainer: {
    height: 427,
    width: 370,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 20,
  },
  Text: {
    padding: 10,
    fontSize: 32,
    fontFamily: "sans-serif",
    color: colors.tertiary,
  },
  Label: {
    color: colors.textcolor,
    fontSize: 16,
    fontFamily: "sans-serif",
    padding: 20,
  },
  TextField: {
    width: 320,
    height: 50,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  prefix: {
    fontSize: 16,
    color: colors.textcolor,
    paddingHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
  },
  sendotpLinkText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: "sans-serif",
    paddingHorizontal: 10,
  },
  SubmitButton: {
    marginVertical: 40,
    marginHorizontal: 30,
  },
});

export default LoginScreen;