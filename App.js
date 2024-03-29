// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import OtpVerification from './screens/OtpVerification';
import AddContacts from './screens/AddContacts';
import MedicalInfo from './screens/MedicalInfo';
import MedicalForm from './screens/MedicalForm';
import HomaPage from './screens/HomaPage';
import UserInfo from './screens/UserInfo';
import ShowContacts from './screens/ShowContacts';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

function App() {
  return (

    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MedicalForm" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomaPage" component={HomaPage} />
            <Stack.Screen name="MedicalForm" component={MedicalForm} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="AddContacts" component={AddContacts} />
            <Stack.Screen name="MedicalInfo" component={MedicalInfo} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="ShowContacts" component={ShowContacts} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

export default App;