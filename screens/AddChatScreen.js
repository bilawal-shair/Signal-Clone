import {Text, View, StyleSheet} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { Button, Input } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons'; 
import { db } from "../firebase";

const AddChatScreen = ({navigation}) =>{

    const[input, setInput] = useState("");

    useLayoutEffect(()=>{

        navigation.setOptions({

            title: "Add a new Chat",
            headerBackTitle: "Chats"

        })

    },[navigation])

    const createChat = async() =>{

        await db.collection('chats').add({
            chatName: input

        }).then(()=>{
            navigation.goBack()
        }).catch((error)=> alert(error))

    }
    return(
        <View style = {styles.container}>
            <Input

             placeholder="Enter a Chat Name"
             value={input}
             onChangeText= {(text)=>setInput(text)}
             onSubmitEditing = {createChat}
             leftIcon = {
                <AntDesign name="wechat" size={24} color="black" />
             }
            
            
            />

            <Button onPress={createChat} title="create new chat"/>
        </View>
    );
};

export default AddChatScreen;
const styles = StyleSheet.create({
    container:{

        backgroundColor: "white",
        padding: 30,
        height: "100%"

    }
});