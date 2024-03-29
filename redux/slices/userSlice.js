import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  bloodGroup: '',
  age: '',
  ongoingMedications: '',
  medicalHistory: '',
  allergies: '',
  height: '',
  weight: '',
  isOrganDonor: false,
  familyDoctorPhoneNo: '',
  contacts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
  },
});

export const { setUserInfo, addContact } = userSlice.actions;

export default userSlice.reducer;