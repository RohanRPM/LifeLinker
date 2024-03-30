import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native";
import colors from "../constants/color";
import SignupButton from "../components/SignupButton";

const SignUpScreen = () => {
  const [userPhoneNo, setuserPhoneNo] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 120, alignItems: "center" }}>
          <Image
            source={require("../assets/app_icon.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.SignupContainer}>
          <View>
            <Text style={styles.Text}>SignUp</Text>
          </View>
          <View>
            <Text style={styles.Lable}>phone no.</Text>
            <View style={styles.TextField}>
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.sendotplink}
            onPress={() => navigation.push("Send otp")}
          >
            <Text style={styles.sendotplink}>send otp</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.Lable}>otp</Text>
            <View style={styles.TextField}>
              <TextInput
                placeholder="OTP"
                placeholderTextColor={"gray"}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={styles.SubmitButton}>
            <SignupButton > SignUp</SignupButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  SignupContainer: {
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
  Lable: {
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
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  sendotplink: {
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

export default SignUpScreen;
