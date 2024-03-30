import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/color";

const SignupButton = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => navigation.push('Signup')}
    >
      <Text style={[styles.text, textStyle]}>signup</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,    
    borderRadius: 12,
    width:300,
    height:52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'bold'
  },
});

export default SignupButton;
