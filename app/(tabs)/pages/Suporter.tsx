 import { View, Text, StyleSheet } from 'react-native'
 import React from 'react'
 
 const Suporter = () => {
   return (
     <View style={styles.container}>
       <Text style={styles.text}>Seja bem-vindo ao suporter</Text>
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: '#333',
        fontWeight: 'bold',
    },
 })
 
 export default Suporter