import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { constants } from "./../../data";
import auth from '../../helpers/firebase_auth';
import storage from "./../../helpers/storage";

export default function Login({navigation}) {
    const [state, setState] = useState({email: '', password: ''})

    const login = () => {
        const {email, password} = state;
        if(email.length > 0 && password.length > 0) {
            auth.signIn(email, password).then((data) => {
                setUser(data);
            }).catch(err => console.log(err))
        }
    }

    const setUser = async userData => {
        await storage.set(constants.USER, JSON.stringify(userData));
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
            <TouchableOpacity style={{backgroundColor: '#007BFE', padding: 10, alignItems: "center", borderRadius: 25}} onPress={() => login()}>
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
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});