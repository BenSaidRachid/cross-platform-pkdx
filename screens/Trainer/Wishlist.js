import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import api from './../../services/api';

export default function Wishlist({navigation, route}) {
    const [state, setState] = useState({isAuth: false})
    useEffect(() => {
       if(!state.isAuth) {
        checkAuth();
       }
    }, [state.isAuth])

   
    useEffect(() => {
        if(!state.isAuth) {
         checkAuth();
        }
    }, [route])

    useEffect(() => {
        checkAuth();
    }, [])


    const checkAuth = async () => {
        const isAuth = await api.auth.isAuth();

        if(!isAuth)
            navigation.navigate('Auth');
        else {
            setState({isAuth: true})
        }
  };

    return (
      <SafeAreaView style={styles.container}>
        <Text>Wishlist</Text>
      </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
      backgroundColor: '#EEEEEE',
      alignContent: 'center',
      borderRadius: 12,
      marginBottom: 20,
      paddingHorizontal: 10,
      paddingVertical: 5
  }
});