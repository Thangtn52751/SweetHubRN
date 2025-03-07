import { Image, StyleSheet, Text, View } from 'react-native';
import  React from 'react';
import { useEffect } from 'react';



const Splash_screen = ({ navigation }) => {
    // Navigate to Login screen after 3 seconds
    useEffect(() => {
        setTimeout(() => {
        navigation.navigate('Intro')
        }, 3000)
    }, [])

  return (
    <View style={styles.splash_container}>
        <Image 
         source={require('../img/logo.png')}
         style={styles.logo}
        ></Image>
    </View>
  )
}

export default Splash_screen

const styles = StyleSheet.create({
    splash_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC0CB',
    },
})