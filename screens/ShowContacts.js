import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddContacts() {
    const [contacts, setContents] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContents(data);
                }
            }
        })();
    }, []);

    const handleContactPress = (contact) => {
        if(contact){
            alert("Contact object exists");
        }else
        throw Error;
        if(contact.name){
            alert("Contact's name exists");
        }else
        throw Error;
        if(contact.phoneNumbers[0]){
            alert("Contacts Phone number exist");
        }else
            throw Error;
        const { name, phoneNumbers } = contact;
        const phoneNumber = phoneNumbers[0]?.number;
      
        // Check if the contact already exists in the array
        if (!selectedContacts.some(c => c.name === name && c.phoneNumber === phoneNumber)) {
          setSelectedContacts([...selectedContacts, { name, phoneNumber }]);
        }
      }

    const handleSearchChange = (text) => {
        setSearchTerm(text);
    }

    const filteredContacts = contacts.filter(
        (contact) =>
            !searchTerm ||
            contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddContacts = () => {
        // Dispatch the selected contacts in the user's contacts store
        dispatch(setUserInfo({ ...userInfo, contacts: selectedContacts }));
        navigation.push('AddContacts');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Contacts</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search contacts"
                onChangeText={handleSearchChange}
                value={searchTerm}
                clearButtonMode="always"
            />
            <ScrollView style={{ width: '95%', flex: 1 }}>
                {filteredContacts.map((contact, index) => (
                    <TouchableOpacity
                        style={[
                            styles.contactContainer,
                            selectedContacts.some(
                                (c) => c.phoneNumber === contact.phoneNumbers[0]?.number
                            ) && [styles.selectedContact, styles.selectedContactBorder],
                        ]}
                        key={index}
                        onPress={(contact) => handleContactPress(contact)}
                    >
                        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                            <MaterialIcons name="person" size={24} color="#FF5659"  style = {[{marginLeft:10}, selectedContacts.some((c) => c.phoneNumber === contact.phoneNumbers[0]?.number) && styles.selectedContactText]} />

                            <Text style={[styles.contactName, selectedContacts.some((c) => c.phoneNumber === contact.phoneNumbers[0]?.number) && styles.selectedContactText]}>
                                {contact.name}
                            </Text>
                        </View>
                        <View style={{alignItems:'center', flexDirection:'row'}}>
                            
                        {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
                            <Text style={[{},styles.contactText, styles.contactPhoneNumber, selectedContacts.some((c) => c.phoneNumber === contact.phoneNumbers[0]?.number) && styles.selectedContactText]}>
                                {contact.phoneNumbers[0].number}
                            </Text>
                        )}
                               <MaterialIcons name="call" size={24} color="#FF5659" style = {[{marginLeft:10}, selectedContacts.some((c) => c.phoneNumber === contact.phoneNumbers[0]?.number) && styles.selectedContactText]}/>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={{ width: '100%', alignItems: 'center' }}>
                <Button mode="contained" style={styles.submitButton} onPress={ handleAddContacts}>
                    Submit
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    searchBar: {
        height: 40,
        width: "100%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#FF5659',
        borderWidth: 1,
        width: '100%',
        elevation:5,
    },
    contactText: {
        color: 'red',
    },
    selectedContact: {
        borderColor: 'green',
    },
    selectedContactText: {
        color: 'green',
    },
    submitButton: {
        width: '95%',
        marginTop: 10,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#FF5659'
    },
});  