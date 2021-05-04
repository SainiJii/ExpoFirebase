import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login, confirmOTP } from '../API/firebaseApi';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import apiKeys from '../config/keys';


export default function Login({ navigation }) {

  const recaptchaVerifier = React.useRef(null);
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [verificationId, setVerificationID] = useState('');
  

  const emptyState = () => {
    setPhone('');
    setOTP('');
    setVerificationID('')
    
  };

  const sendOTP = () => {
    if (!phone) {
      Alert.alert('Phone number is required');
    } 
    // else if (!otp) {
    //   Alert.alert('OTP is required.');
    // } 
    else {
      login(
        phone,
        setVerificationID,
        recaptchaVerifier
      );
      
      emptyState();
    }
  };
  const confirmMyOTP = async () => {
    if (!otp) {
      Alert.alert('OTP is required.');
    } 
    else {
      let isVerified = await confirmOTP(
        verificationId, 
        otp)
        if(isVerified)
        {
          navigation.navigate('Home');
        }
      
    }
  };

  return (
    <SafeAreaView style = {{flex: 1}}>
     <View style={{flex: 1}}>

     <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={apiKeys.firebaseConfig}
        attemptInvisibleVerification={true}
      />
       <Text style={{fontSize: 16, color: '#000000', textAlign: 'center'}}>Login </Text>
      <View style = {{flex: 1, paddingTop: 30}}>
        <ScrollView onBlur={Keyboard.dismiss}>
          {  
            !verificationId
            ?
            <TextInput
              style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5}}
              placeholder="Phone Number*"
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
              />
            :
            <TextInput
              style={{width: '80%', height: 50, backgroundColor: '#DFDFDF', alignSelf: 'center', padding: 5}}
              placeholder="Verification Code*"
              value={otp}
              onChangeText={(otp) => setOTP(otp)}
              secureTextEntry={true}
          />
          }
          
          
            {/* <TouchableOpacity style={{}} onPress={sendOTP}>
            <Text style={{}}>Login</Text>
            </TouchableOpacity> */}
            {
              !verificationId
              ?
                <TouchableOpacity style = {{width: '80%', padding: 10, alignSelf: 'center', backgroundColor: '#28D393', marginTop: 10}}  onPress={async () => sendOTP()}>
                  <Text style={{fontSize: 15, color: '#FFFFFF', textAlign: 'center'}}>Send OTP</Text>
                </TouchableOpacity> 
              :
                <TouchableOpacity style = {{width: '80%', padding: 10, alignSelf: 'center', backgroundColor: '#28D393', marginTop: 10}}  onPress={async () => confirmMyOTP()}>
                  <Text style={{fontSize: 15, color: '#FFFFFF', textAlign: 'center'}}>Confirm Verification Code</Text>
                </TouchableOpacity> 
            }

          
        </ScrollView>
        
      </View>

      </View>
    </SafeAreaView>
  );
}