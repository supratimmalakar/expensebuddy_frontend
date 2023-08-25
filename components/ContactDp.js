import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils';

function ContactDp({ contact, size = 25, startColor = theme.primary, endColor = theme.secondary }) {
    const initial = contact.contact_name[0];
    const containerSide = size + 15;
    return (
        <LinearGradient colors={contact.unregistered ? ["rgba(0,0,0,0.3)","rgba(0,0,0,0.8)"] : [startColor, endColor]} style={{width : containerSide, height : containerSide, borderRadius : containerSide/2 }}>
            <View style={{ ...styles.container, width: containerSide, height: containerSide, borderRadius: containerSide / 2 }}>
                <Text style={{ ...styles.text, fontSize: size }}>{initial.toUpperCase()}</Text>
            </View>
        </LinearGradient>
    )
}

export default ContactDp;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
    },
    text: {
        fontFamily: 'Montserrat_500',
        color: 'white',
    },
});
