import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";


export async function addData(firstName, lastName, phoneNumber, email ) {
  try {
    const currentUser = firebase.auth().currentUser;

    console.log('currentUser.uid', currentUser.uid);
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
      });

      console.log('Data setted');
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}


export async function getData(firstName, lastName, phoneNumber, email ) {
  try {
        const currentUser = firebase.auth().currentUser;
        let db = await firebase.firestore();
        db.collection('users')
        .doc(currentUser.uid)
        .get();

        if (!db.exists){
          Alert.alert('No user data found!')
          return null
        } else {
          let dataObj = db.data();
          console.log('dataObj', dataObj);
          return dataObj
        }
  } catch (err) {
    return null
    Alert.alert("There is something wrong!!!!", err.message);
  }
}





export async function login(phone, setVerificationID, recaptchaVerifier) {
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phone,
            recaptchaVerifier.current
        );
        setVerificationID(verificationId);
        console.log('Verification code has been sent to your phone.');
    } 
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

export async function confirmOTP(verificationId, otp)
{
    try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          otp
        );
        await firebase.auth().signInWithCredential(credential);
        console.log('Phone authentication successful 👍');
        return true
      } 
      catch (err) {
        return false
        console.log(`Error: ${err.message}`);
      }
}


// export async function loggingOut() {
//   try {
//     await firebase.auth().signOut();
//   } catch (err) {
//     Alert.alert('There is something wrong!', err.message);
//   }
// }