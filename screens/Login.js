import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../providers/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const { login, loginLoading } = useAuth();

    const handleSubmit = () => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let emailValid = emailReg.test(email);
        let passwordValid = passwordReg.test(password);
        if (emailValid && passwordValid) {
            login(email, password);
        }
        else {
            setIsEmailValid(emailValid);
            setIsPasswordValid(passwordValid);
            setTimeout(() => {
                setIsEmailValid(true);
                setIsPasswordValid(true);
            }, 4000);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1, width: Dimensions.get('window').width }} source={require('../assets/layered-waves-2.png')}>
                <View style={styles.subContainer}>
                    <Image style={{ width: 150, height: 150 }} source={require('../assets/logo.png')} />
                    <Text style={styles.header}>ExpenseBuddy</Text>
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
                        textContentType='password'
                        onChangeText={(text) => { setPassword(text) }}
                        secureTextEntry={true}
                        style={{
                            ...styles.input,
                            borderColor: isPasswordValid ? 'gray' : 'red',
                        }}
                        placeholder="Password" />
                    {!isPasswordValid && <Text style={styles.errorText}>Please enter a valid password</Text>}
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Login</Text>
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
    input: {
        height: 50,
        width: screenWidth - 60,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20
    },
    errorText: {
        textAlign: 'left',
        width: screenWidth - 60,
        marginTop: 10,
        fontFamily: 'Montserrat_200',
        fontSize: 10,
        color: 'red'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center'
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
        marginTop: 20
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
export default Login;