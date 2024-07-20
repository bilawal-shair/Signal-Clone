import {Text, View,StyleSheet, Image,KeyboardAvoidingView} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input,  } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

import { auth } from "../firebase";




const LoginScreen = ({navigation}) =>{


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=> {

        const unsubscribe = auth.onAuthStateChanged((authUser)=>{

            console.log(authUser);
            if(authUser){

                navigation.replace("Home");
            }

            return unsubscribe;
        });

    }, []);

    const signIn =()=>{

        navigation.navigate("Home");

        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error));

    }
     return(
        <KeyboardAvoidingView behavior ='padding'style={styles.container}>
            <StatusBar style="light" />
            <Image
            source={{uri:
                "https://images.macrumors.com/t/V3tKe3qc7g1ZIY-1sltdiv5ttD4=/800x0/article-new/2020/12/signal-icon-200x200.jpg?lossy",
            }}
            style={{width:200,height:200}}
            />

            <View style={styles.inputContainer}>

                <Input placeholder="Email"  autoFocus type="email" value={email}  onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password"  secureTextEntry type="password"  value={password} onChangeText={(text)=>setPassword(text)}/>
            </View>

            <Button containerStyle = {styles.button} onPress={signIn} title="Login"/>
            
            <Button onPress = {()=> navigation.navigate('Register')} containerStyle = {styles.button} type="outline"  title="Register"/>

       </KeyboardAvoidingView>
    );
   
};

export default LoginScreen;

const styles = StyleSheet.create({
     container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
     },
    inputContainer:{
        width: 300
    },
    button:{
        width: 200,
        marginTop: 10,
    },
});