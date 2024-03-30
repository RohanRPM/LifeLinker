import React from 'react'
import { View, StyleSheet } from 'react-native'
export default function Spinner() {
    return (
        <View style={styles.Spinner}></View>
    )
}

const styles = StyleSheet.create({
    Spinner: {
        width: 48,
        height: 48,
        border: 5,
        borderColor: "#FF3D00",
        borderLeftColor: "transparent",
        borderRadius: 50,
        display: "inline-block",
        boxSizing: "border-box",
        animation: "rotation 1s linear infinite",
    },

    "@keyframes rotation": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        },
    },
});

