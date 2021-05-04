import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addData, getData } from '../API/firebaseApi';
import apiKeys from '../config/keys';
import * as firebase from 'firebase';


export default function Home({ navigation }) {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  

  const emptyState = () => {
    setFirstName('');
    setLastName('')
    setPhoneNumber('');
    setEmail('');
    
  };


  const submitData = () => {
    addData(firstName, lastName, phoneNumber, email)

    setTimeout(() => {
      getData()
    }, 2000);
  }
  
 

  return (
    <SafeAreaView style = {{flex: 1}}>
        <View style={{flex: 1}}>
        <Text style={{fontSize: 16, color: '#000000', textAlign: 'center'}}>Login </Text>
            <View style = {{flex: 1, paddingTop: 30}}>
              <ScrollView onBlur={Keyboard.dismiss}>
                  <TextInput
                      style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5, marginTop: 10}}
                      placeholder="First Name*"
                      value={firstName}
                      onChangeText={(firstName) => setFirstName(firstName)}
                  />
                  <TextInput
                      style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5, marginTop: 10}}
                      placeholder="Last Name*"
                      value={lastName}
                      onChangeText={(lastName) => setLastName(lastName)}
                  />
                  <TextInput
                      style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5, marginTop: 10}}
                      placeholder="Phone Number*"
                      keyboardType = {'phone-pad'}
                      value={phoneNumber}
                      onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  />
                  <TextInput
                      style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5, marginTop: 10}}
                      placeholder="Email*"
                      keyboardType = {'phone-pad'}
                      value={email}
                      onChangeText={(email) => setEmail(email)}
                  />

                  <TouchableOpacity style = {{width: '80%', padding: 10, alignSelf: 'center', backgroundColor: '#28D393', marginTop: 10}}  onPress={async () => submitData()}>
                    <Text style={{fontSize: 15, color: '#FFFFFF', textAlign: 'center'}}>SUBMIT</Text>
                  </TouchableOpacity> 
              </ScrollView>
            </View>
            </View>
    </SafeAreaView>
  );
}