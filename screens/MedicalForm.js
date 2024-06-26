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
    const [name, setName] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [age, setAge] = useState('');
    const [ongoingMedications, setOngoingMedications] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [allergies, setAllergies] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [isOrganDonor, setIsOrganDonor] = useState(false);
    const [familyDoctorPhoneNo, setFamilyDoctorPhoneNo] = useState('');
    const userData = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const handleSubmit = () => {
        if(name == "")
            alert("User Name cannot be empty!");
        else if(bloodGroup == "NULL")
            alert("Blood Group not selected!");
        else if(age == "")
            alert("Enter your age");
        else{
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
            console.log(userInfo);
            dispatch(setUserInfo(userInfo));
            navigation.push('AddContacts')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Medical Form</Text>

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
                                <Picker.Item label="--" value="NULL" />
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