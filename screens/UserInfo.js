import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserInfo = () => {
    const userInfo = useSelector((state) => state.user);
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={[styles.userBar, {paddingVertical:12}]}>
                <TouchableOpacity style={{}} onPress={() => navigation.push('HomePage')}>
                    <MaterialIcons name='home' size={24} color='white' />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 20, marginLeft: 10 }}>

                    <MaterialIcons name='person' size={24} color='white' />
                    <Text style={styles.userName}>{userInfo.name}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.infoContainer}>
                    <InfoItem label="Name" value={userInfo.name} />
                    <InfoItem label="Blood Group" value={userInfo.bloodGroup} />
                    <InfoItem label="Age" value={userInfo.age} />
                    <InfoItem label="Ongoing Medications" value={userInfo.ongoingMedications} />
                    <InfoItem label="Medical History" value={userInfo.medicalHistory} />
                    <InfoItem label="Allergies" value={userInfo.allergies} />
                    <InfoItem label="Height" value={`${userInfo.height} cm`} />
                    <InfoItem label="Weight" value={`${userInfo.weight} kg`} />
                    <InfoItem label="Is Organ Donor" value={userInfo.isOrganDonor ? 'Yes' : 'No'} />
                    <InfoItem label="Family Doctor Phone No" value={userInfo.familyDoctorPhoneNo} />
                </View>
            </ScrollView>
        </View>
    );
};

const InfoItem = ({ label, value }) => {
    const isDetailLabel =
        label === "Ongoing Medications" ||
        label === "Medical History" ||
        label === "Allergies" ||
        label === "Family Doctor Phone No";

    return (
        <View style={[styles.infoItem, {flexDirection: (isDetailLabel && value !== '')? 'column' : 'row',marginVertical:8}]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, {marginTop: isDetailLabel ? 6 : 0}]}>{value}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#F0F0F0',
        // paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop:25
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
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
});

export default UserInfo;
