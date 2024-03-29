import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUserInfo } from '../redux/slices/userSlice';
import { ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
// import * as Contacts from 'expo-contacts';



const AddContact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const contacts = userInfo.contacts;
  const navigation = useNavigation();

  // const [Contacts,setMobileContacts] = useState([]);
  // const [hasPermission, setHasPermission] = useState(null);

  const handleAddContact = () => {
    const existingContactIndex = contacts.findIndex(
      (contact) => contact.phoneNumber === phoneNumber && contact.name === name
    );
  
    if (existingContactIndex >= 0) {
      Alert.alert('Duplicate Contact', '"' + name + '" is already in your list.');
      return;
    }
  
    dispatch(
      setUserInfo({ ...userInfo, contacts: [...contacts, { name: name, phoneNumber: phoneNumber }] })
    );
    setName('');
    setPhoneNumber('');
  };

  const handleAddContactFromMobile = () => {
    navigation.push('ShowContacts')
  }

  const handleDeleteContact = (phoneNumber) => {
    dispatch(setUserInfo({ ...userInfo, contacts: contacts.filter((contact) => contact.phoneNumber !== phoneNumber) }));
  }

  const Contact = ({ name, phoneNumber }) => (
    <View style={styles.contactContainer} >
      <MaterialIcons name="person" size={24} color="#FF5659" />
      <Text style={styles.contactText}>{name}</Text>
      <Text style={{ fontWeight: 'bold', marginRight: 20 }}>{phoneNumber}</Text>
      {/* <View style={styles.callButton}>
        <MaterialIcons name="call" size={24} color="black" />
      </View> */}
      <TouchableOpacity
        onPress={(e) => {
          e.preventDefault();





























          handleDeleteContact(phoneNumber);
        }}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 25,fontWeight:'bold', left: 110,marginBottom:15}}>Add Contacts</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddContact} style={{ backgroundColor: '#FF5659', marginTop: 20 }}>
        Add Contact
      </Button>
      <Button mode="contained" onPress={handleAddContactFromMobile} style={{ backgroundColor: '#FF5659', marginTop: 20 }}>
        Add Contact from Mobile
      </Button>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <Contact key={index} name={contact.name} phoneNumber={contact.phoneNumber} />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>No Contacts added</Text>
          )}
        </View>
      </ScrollView>
      <View style={{}}>
        <Button mode="contained" style={styles.submitButton} onPress={() => navigation.push('HomaPage')}>
          Submit
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 30,
  },
  input: {
    marginBottom: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#E1E3DE',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
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
  contactItem: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#FF5659'
  }
});

export default AddContact;


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
// import * as Contacts from 'expo-contacts';

// export default function AddContacts() {
//   const [contacts, setContents] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Contacts.requestPermissionsAsync();

//       if (status === 'granted') {
//         const { data } = await Contacts.getContactsAsync({
//           fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
//         });

//         if (data.length > 0) {
//           setContents(data);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Your Contacts:</Text>
//       <ScrollView>
//         {contacts.map((contact, index) => (
//           <View style={styles.contactContainer} key={index}>
//             <Text style={styles.contactName}>{contact.name}</Text>
//             {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
//               <Text style={styles.contactPhoneNumber}>
//                 {contact.phoneNumbers[0].number}
//               </Text>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 30,
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   contactContainer: {
//     backgroundColor: '#E1E3DE',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 15,
//     marginVertical: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
//   contactName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#3F51B5',
//   },
//   contactPhoneNumber: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

