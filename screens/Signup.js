import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import PhoneInput from "react-native-phone-number-input";


const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);

    const isPhoneValidFn = (phone) => {
        var allNumericDigits = true;
        for (let i = 0; i < phone.length; i++) {
            if (!(/^\d$/.test(phone[i]))) {
                allNumericDigits = false;
                break;
            }
        }
        return allNumericDigits && phone.length === 10;
    }
    const handleSubmit = () => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let nameReg = /^[a-z ,.'-]+$/;
        let emailValid = emailReg.test(email);
        let passwordValid = passwordReg.test(password);
        let phoneNoValid = isPhoneValidFn(phoneNo.trim().slice(3, phoneNo.length));

        let fNameValid = nameReg.test(firstName.toLowerCase());
        let lNameValid = nameReg.test(lastName.toLowerCase());
        if (emailValid && passwordValid && fNameValid && lNameValid && phoneNoValid) {
            axios.post('http://localhost:8000/api/register/', {
                email: email,
                password: password,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                phone_number : phoneNo.trim(),
            })
                .then(response => {
                    console.log(response);
                    Snackbar.show({
                        text: 'Signed up successfully. Redirecting to Login page',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    navigation.navigate('Login');
                })
                .catch(error => {
                    console.log(error);
                    const emailExists = error.response.data.hasOwnProperty('email') ? error.response.data.email[0]?.code === 'unique' : false;
                    const phoneExists = error.response.data.hasOwnProperty('phone_number') ? error.response.data.phone_number[0]?.code === 'unique' : false;
                    if (emailExists && phoneExists) {
                        Snackbar.show({
                            text: 'Email and phone number already exists',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                    else if (emailExists) {
                        Snackbar.show({
                            text: 'Email already exists',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                    else if (phoneExists) {
                        Snackbar.show({
                            text: 'Phone number already exists',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                    else {
                        Snackbar.show({
                            text: 'There was an error',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                });
        }
        else {
            setIsEmailValid(emailValid);
            setIsPasswordValid(passwordValid);
            setIsFirstNameValid(fNameValid);
            setIsLastNameValid(lNameValid);
            setIsPhoneValid(phoneNoValid);
            setTimeout(() => {
                setIsEmailValid(true);
                setIsPasswordValid(true);
                setIsFirstNameValid(true);
                setIsLastNameValid(true);
                setIsPhoneValid(true);
            }, 4000);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1, width: Dimensions.get('window').width }} source={require('../assets/layered-waves-2.png')}>
                <View style={styles.subContainer}>
                    {/* <Image style={{ width: 150, height: 150 }} source={require('../assets/logo.png')} />
                    <Text style={styles.header}>ExpenseBuddy</Text> */}
                    <TextInput
                        value={firstName}
                        textContentType="name"
                        onChangeText={(text) => setFirstName(text)}
                        style={{
                            ...styles.input,
                            borderColor: isFirstNameValid ? 'gray' : 'red'
                        }}
                        placeholder="First Name" />
                    {!isFirstNameValid && <Text style={styles.errorText}>Enter a valid first name.</Text>}
                    <TextInput
                        value={lastName}
                        textContentType="name"
                        onChangeText={(text) => setLastName(text)}
                        style={{
                            ...styles.input,
                            borderColor: isLastNameValid ? 'gray' : 'red'
                        }}
                        placeholder="Last Name" />
                    {!isLastNameValid && <Text style={styles.errorText}>Enter a valid last name.</Text>}
                    <TextInput
                        value={email}
                        textContentType="emailAddress"
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        style={{
                            ...styles.input,
                            borderColor: isEmailValid ? 'gray' : 'red'
                        }}
                        placeholder="Email" />
                    {!isEmailValid && <Text style={styles.errorText}>Enter a valid email</Text>}
                    <TextInput
                        onSubmitEditing={handleSubmit}
                        value={password}
                        textContentType='newPassword'
                        onChangeText={(text) => { setPassword(text) }}
                        secureTextEntry={true}
                        style={{
                            ...styles.input,
                            borderColor: isPasswordValid ? 'gray' : 'red',
                        }}
                        placeholder="Password" />
                    {!isPasswordValid && <Text style={styles.errorText}>Please enter a valid password</Text>}
                    <PhoneInput
                        // ref={phoneInput}
                        value={phoneNo}
                        containerStyle={styles.phoneContainer}
                        textContainerStyle={styles.textContainer}
                        defaultValue={phoneNo}
                        defaultCode="IN"
                        onChangeFormattedText={(text) => {
                            setPhoneNo(text);
                            console.log(text);
                        }}
                        textInputStyle={{ color: 'black' }}
                        codeTextStyle={styles.codeTextStyle}
                    />
                    {!isPhoneValid && <Text style={styles.errorText}>Please enter a valid phone number</Text>}
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        backgroundColor: 'transparent',
        color: 'black',
        paddingVertical: 0,
    },
    // codeTextStyle : {
    //     paddingLeft : 10,
    // },
    phoneContainer: {
        height: 50,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 20,
    },
    input: {
        height: 50,
        width: screenWidth - 60,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    errorText: {
        textAlign: 'left',
        width: screenWidth - 60,
        marginTop: 10,
        fontFamily: 'Montserrat_200',
        fontSize: 10,
        color: 'red',
    },
    subContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    header: {
        marginBottom: 40,
        // fontWeight: 600,
        fontFamily: 'Montserrat_400',
        fontSize: 18,
        color: 'rgba(0,0,0,0.6)',
    },
    button: {
        backgroundColor: "#5170ff",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 10,
        width: Dimensions.get('window').width - 60,
        marginBottom: 30,
        height: 50,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: 'Montserrat_500',
        color: 'white',
        // fontWeight: 'bold'
    },
});
export default Signup;