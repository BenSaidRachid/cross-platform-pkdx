import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { constants } from "./../../data";
import auth from '../../helpers/firebase_auth';
import storage from "./../../helpers/storage";

export default function Login({route, navigation}) {
    const [state, setState] = useState({email: '', password: ''})
    
    const login = () => {
        const {email, password} = state;
        if(email.length > 0 && password.length > 0) {
            auth.signIn(email, password).then((data) => {
                setUser(data);
            });
        } else {
            alert("Error can't log in");
        }
    }

    const setUser = async userData => {
        await storage.set(constants.USER, userData);
        route.params.onGoBack();
        navigation.goBack();
    }

    return (
      <SafeAreaView style={styles.container}>
       <View style={{flex:1, marginHorizontal: 45, marginTop: 80}}>
        <TextInput
            style={styles.input}
            onChangeText={text => setState({...state, email: text})}
            value={state.email}
            placeholder="Email"
            />
            <TextInput secureTextEntry 
            style={styles.input}
            onChangeText={text => setState({...state, password: text})}
            value={state.password}
            placeholder="Password"
            />
            <TouchableOpacity style={{backgroundColor: '#007BFE', padding: 15, alignItems: "center", borderRadius: 10}} onPress={() => login()}>
                <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: "center"}} onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#89CCC6'}}>Don't have an account yet? Sign up</Text>
        </TouchableOpacity>
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
        borderRadius: 10,
        marginBottom: 20,
        padding: 15
    }
});