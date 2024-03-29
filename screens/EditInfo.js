import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const FormField = ({
    label,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
    radio,
    options,
    optionsVisible,
    onPress,
}) => {
    return (
        <View style={styles.fieldContainer}>
            <TouchableOpacity style={styles.labelContainer} onPress={onPress}>
                <Text style={styles.label}>{label}</Text>
                {optionsVisible && radio && (
                    <View style={styles.radioContainer}>
                        {options.map((option) => (
                            <View style={styles.radioOption} key={option.value}>
                                <RadioButton
                                    value={option.value}
                                    status={value === option.value ? 'checked' : 'unchecked'}
                                    onPress={() => onChangeText(option.value)}
                                />
                                <Text style={styles.radioOptionText}>{option.label}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </TouchableOpacity>
            {!radio && (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                />
            )}
        </View>
    );
};

const MedicalForm = () => {
    const userData = useSelector(state => state.user);
    const [name, setName] = useState(userData.name || '');
    const [bloodGroup, setBloodGroup] = useState(userData.bloodGroup || '');
    const [age, setAge] = useState(userData.age || '');
    const [ongoingMedications, setOngoingMedications] = useState(userData.ongoingMedications || '');
    const [medicalHistory, setMedicalHistory] = useState(userData.medicalHistory || '');
    const [allergies, setAllergies] = useState(userData.allergies || '');
    const [height, setHeight] = useState(userData.height || '');
    const [weight, setWeight] = useState(userData.weight || '');
    const [isOrganDonor, setIsOrganDonor] = useState(userData.isOrganDonor || false);
    const [familyDoctorPhoneNo, setFamilyDoctorPhoneNo] = useState(userData.familyDoctorPhoneNo || '');
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const handleSubmit = () => {
        const userInfo = {
            name,
            bloodGroup,
            age,
            ongoingMedications,
            medicalHistory,
            allergies,
            height,
            weight,
            isOrganDonor,
            familyDoctorPhoneNo,
        }
    
        dispatch(setUserInfo(userInfo));
        navigation.push('HomaPage')
    }

    handleEditContacts = () => {
        navigation.push('EditContacts');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Update Details</Text>

                <FormField label="Name" value={name} onChangeText={setName} />
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>

                    <View style={[styles.fieldContainer, { height: '100%', width: '45%' }]}>
                        <View style={[styles.labelContainer]}>
                            <Text style={styles.label}>Select Blood Group:</Text>
                        </View>
                        <View style={{ marginBottom: 16, backgroundColor: '#ccc', elevation: 5 }}>
                            <Picker
                                selectedValue={bloodGroup}
                                style={{ backgroundColor: '#D9D9D9', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, elevation: 5 }}
                                onValueChange={(itemValue, itemIndex) => setBloodGroup(itemValue)}
                            >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.fieldContainer, { width: '45%' }]}>

                        <FormField label="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={{ width: '100%' }} />
                    </View>
                </View>

                <FormField
                    label="Ongoing Medications"
                    value={ongoingMedications}
                    onChangeText={setOngoingMedications}
                    multiline={true}
                    numberOfLines={4}
                />
                <FormField
                    label="Medical History"
                    value={medicalHistory}
                    onChangeText={setMedicalHistory}
                    multiline={true}
                    numberOfLines={4}
                />
                <FormField
                    label="Allergies"
                    value={allergies}
                    onChangeText={setAllergies}
                    multiline={true}
                    numberOfLines={4}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.fieldContainer, { width: '45%' }]}>
                        <FormField label="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
                    </View>
                    <View style={[styles.fieldContainer, { width: '45%' }]}>
                        <FormField label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
                    </View>
                </View>
                <View style={[styles.isOrganDonorContainer]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.label, { marginRight: 50 }]}>Is organ donor?</Text>
                        <FormField
                            style={{}}
                            label=""
                            value={isOrganDonor ? 'true' : 'false'}
                            onChangeText={(value) => setIsOrganDonor(value === 'true')}
                            radio
                            options={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            optionsVisible={true}
                        />
                    </View>
                </View>
                <FormField
                    label="Family Doctor Phone No."
                    value={familyDoctorPhoneNo}
                    onChangeText={setFamilyDoctorPhoneNo}
                    keyboardType="phone-pad"
                />
                <View style={styles.container}>
                    <Button mode="contained" onPress={handleEditContacts} style={[styles.submitButton, {marginBottom:'-40'}]}>
                        Edit Contacts
                    </Button>
                </View>
                <View style={{marginBottom:30}}>
                    <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                        Submit
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 16,
        paddingTop: 16,
        marginTop: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginLeft: 8,
        marginTop: 8,
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -16,
        justifyContent: 'space-between',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        gap: 6,
    },
    radioOptionText: {
        fontSize: 16,
        marginLeft: 5,
    },
    input: {
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        backgroundColor: '#D9D9D9',
    },
    genderContainer: {
        marginBottom: 16,
    },
    genderOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    genderOptionText: {
        fontSize: 16,
        marginLeft: 8,
    },
    bloodTypeContainer: {
        marginBottom: 16,
    },
    bloodTypeOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bloodTypeOptionText: {
        fontSize: 16,
        marginLeft: 8,
    },
    isOrganDonorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
        justifyContent: 'space-between',
    },
    isOrganDonorText: {
        fontSize: 16,
        marginLeft: 8,
    },
    submitButton: {
        backgroundColor: '#FF5659',
    },
    genderOptionsList: {
        marginTop: 8,
    },
    bloodTypeOptionsList: {
        marginTop: 8,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
});

export default MedicalForm;