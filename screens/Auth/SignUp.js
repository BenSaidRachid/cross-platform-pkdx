import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import auth from '../../helpers/firebase_auth';

export default function SignUp({navigation}) {
    const [state, setState] = useState({email: '', password: ''});

    const signUp = () => {
      const {email, password} = state;
      if(email.length > 0 && password.length > 0) {
          auth.signUp(email, password).then(() => {
                alert("New user created");
                setTimeout(() => { navigation.goBack() }, 1500);
          });
      } else {
          alert("Error can't sign up");
      }
      
  }
    return (
      <SafeAreaView style={styles.container}>
      <View style={{flex:1, marginHorizontal: 45, marginTop: 80}}>
          <TextInput
            style={styles.input}
            onChangeText={text => setState({...state, email: text})}
            value={state.mail}
            placeholder="Email"
            />
            <TextInput secureTextEntry 
              style={styles.input}
              onChangeText={text => setState({...state, password: text})}
              value={state.password}
              placeholder="Password"
            />
          <TouchableOpacity style={{backgroundColor: '#007BFE', padding: 15, alignItems: "center", borderRadius: 10}} onPress={() => signUp()}>
              <Text style={{color: 'white'}}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: "center"}} onPress={() => navigation.goBack()}>
            <Text style={{color: '#89CCC6'}}>Already have an account ? Sign in</Text>
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