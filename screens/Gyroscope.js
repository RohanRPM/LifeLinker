import React, { useState, useEffect } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const Gyroscope = () => {
  const [gyroData, setGyroData] = useState({ y: 0, status: 'connecting' });

  useEffect(() => {
    const checkBluetoothStatus = async () => {
      const isBluetoothEnabled = await BluetoothSerial.isEnabled();
      if (!isBluetoothEnabled) {
        const isBluetoothSettingsOpened = await Linking.openSettings();
        if (!isBluetoothSettingsOpened) {
          console.log('Failed to open Bluetooth settings');
        }
      }
    };

    checkBluetoothStatus();

    const connectToDevice = async () => {
      try {
        await BluetoothSerial.connect('98:DA:50:02:53:05');

        startListeningForData();
        setGyroData({ ...gyroData, status: 'connected' });
      } catch (error) {
        console.log(error);
        setGyroData({ ...gyroData, status: 'error' });
      }
    };
  
    const startListeningForData = () => {
      if (BluetoothSerial) {
        BluetoothSerial.withDelimiter('\n').then(() => {
          BluetoothSerial.on('read', (data) => {
            try {
              const parsedData = JSON.parse(data.data);
              setGyroData({
                y: parsedData.Y,
                status: 'connected',
              });
            } catch (error) {
              console.log(error);
            }
          });
        });
      } else {
        console.log('BluetoothSerial object is null');
      }
    };
  
    connectToDevice();
  
    return () => {
   
    };
  }, []);

  return (
    <View>
      <Text>
        Axis Y: {gyroData.y}
      </Text>
      <Text>
        {gyroData.status === 'connected' ? (
          gyroData.y >= 210 || gyroData.y <= gyroData.lowerBound ? (
            <Text>Danger</Text>
          ) : (
            <Text>Safe</Text>
          )
        ) : (
          <Text>Connecting...</Text>
        )}
      </Text>
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text>Open Bluetooth settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gyroscope;