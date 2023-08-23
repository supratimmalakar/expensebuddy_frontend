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
import { useAuth } from '../../providers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';


const AddExpense = ({ navigation }) => {
    const { authState } = useAuth();
    console.log(authState);
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1, width: Dimensions.get('window').width }} source={require('../../assets/layered-waves-2.png')}>
                <View style={styles.subContainer}>
                    <View style={styles.headerBar}>
                        <Pressable>
                            <Ionicons color="rgba(0,0,0,0.7)" name="close-sharp" size={25}/>
                        </Pressable>
                        <Text style={styles.headerText}>Add an expense</Text>
                        <Pressable>
                            <Text style={styles.saveBtn}>Save</Text>
                        </Pressable>
                    </View>
                    <View style={styles.addPeopleBar}>
                        <Text style={styles.addPeopleBarText}>With <Text style={{fontFamily : 'Montserrat_700'}}>you</Text> and:  </Text>
                        <TouchableOpacity activeOpacity={0.4} style={styles.addPeopleBtn}><Image style={{width : 35, height : 35}} source={require('../../assets/add-circle.png')}/></TouchableOpacity>
                        
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
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
    },
    headerBar : {
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height: 50,
        alignItems : 'center',
        paddingHorizontal : 10,
    },
    headerText : {
        fontFamily : 'Montserrat_600',
    },
    saveBtn : {
        fontFamily: 'Montserrat_500',
    },
    addPeopleBar : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems : 'center',
        flexWrap : 'wrap',
    },
    addPeopleBarText: {
        fontFamily: 'Montserrat_400',
        
    },
    addPeopleBtn : {
        backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
    }
});
export default AddExpense;
