import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
 
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/color";
import axios from 'axios';
import {useNavigation} from '@react-navigation/native'
import Gyroscope from "../Gyroscope";

const AccidentAlert = () => {
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
        
          <Text style={styles.appname}>Accident Detected!</Text>
        </View>
        <View style={styles.LoginContainer}>
         {/* <TouchableOpacity>
         <Image
            source={require("../assets/icons8-power-off-button-50 (1).png")}
            style={styles.image}
          />
         </TouchableOpacity> */}
         <Gyroscope />
           
         
          </View>
         
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  appname: {
    fontSize: 34,
    paddingTop:56,
    fontWeight: 'bold',
  },
  LoginContainer: {
    height: 427,
    width: 370,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: 100,
    marginVertical: 150,
  },

});

export default AccidentAlert;
