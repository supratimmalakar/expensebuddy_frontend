import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Pressable,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useAuth } from '../providers/auth';


const Account = ({ navigation }) => {
    const { logout } = useAuth();
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1, width: Dimensions.get('window').width }} source={require('../assets/layered-waves-2.png')}>
                <View style={styles.subContainer}>
                    <Pressable onPress={() => {logout()}}>
                        <Text>Logout</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#5170ff",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 10,
        width: 250,
        marginBottom: 30,
        height: 50
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: 'Montserrat_500',
        color: 'white',
    },
    header: {
        marginBottom: 40,
        fontFamily: 'Montserrat_400',
        fontSize: 18,
        color: 'rgba(0,0,0,0.6)',
    }
});
export default Account;
