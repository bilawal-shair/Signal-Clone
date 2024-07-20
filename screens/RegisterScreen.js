import { Text, View, StyleSheet, KeyboardAvoidingView} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { Button, Input,  } from "react-native-elements";
import { auth } from "../firebase";




const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    


    useLayoutEffect(()=>{

        navigation.setOptions({
            headerBackTitle: "Login",
        });

    }, [navigation]);

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            })

        })
        .catch((error) => alert(error.message))
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>


            <Button style={styles.button1} onPress ={()=> navigation.navigate("Login")} title="Back To Login"/>

            <Text style={{ marginBottom: 50, fontWeight: "bold", fontSize: 30}}>
                Create a signal Account
            </Text>

            <View style={styles.inputContainer} >

                <Input 
                placeholder="Full Name" 
                autofocus type="text" 
                value={name} 
                onChangeText={(text) => setName(text)} 
                />
                <Input 
                placeholder="Email" 
                type="email" 
                value={email} 
                onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                placeholder="Password" 
                type="password" 
                secureTextEntry
                value={password} 
                onChangeText={(text) => setPassword(text)} 
                />
                <Input 
                placeholder="Profile Picture Image URL" 
                type="text" 
                value={imageUrl} 
                onChangeText={(text) => setImageUrl(text)} 
                onSubmitEditing = {register}
                />


            </View>

            <Button

            containerStyle ={styles.button}
            raised
            onPress={register}
            
            
            title="Register"/>

        </KeyboardAvoidingView>
    );
};

export default RegisterScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"


    },
    button:{
        width: 200,
        marginTop: 10
    },
    inputContainer:{
        width: 300,

    },
    button1:{
        borderRadius: 10,
        backgroundColor: "#808080"
    }

});