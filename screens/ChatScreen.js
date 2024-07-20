import { Text, View, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons, } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import firebase from 'firebase/compat/app';
import { auth, db } from "../firebase";
import RegisterScreen from "./RegisterScreen";

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >


                    <Avatar
                        rounded
                        source={{
                            uri: "data:image/jpeg;base64,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"
                        }} />
                    <Text>{route.params.chatName}</Text>

                </View>
            ),
            headerLeft: () => (

                <TouchableOpacity

                    style={{
                        marginLeft: 10
                    }}
                    onPress={navigation.goBack}

                >
                    <AntDesign name="arrowleft" size={24} color="white" />

                </TouchableOpacity>

            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>

                    <TouchableOpacity>

                        <AntDesign name="videocamera" size={24} color="black" />

                    </TouchableOpacity>


                    <TouchableOpacity>

                        <Ionicons name="ios-call-outline" size={24} color="black" />

                    </TouchableOpacity>
                </View>

            )
        });

    }, [navigation]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput('')

    };

    useLayoutEffect(() => {

        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
            );

        return unsubscribe;

    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView  contentContainerStyle = {{paddingTop:15}}>

                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (

                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded

                                            // WEB

                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}

                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL
                                            }} />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>

                                ) : (
                                    <View key={id}style={styles.sender}>
                                        <Avatar

                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}

                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL
                                            }}

                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>

                                )
                            ))}

                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Signal Message"
                                style={styles.textInput}
                            />

                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

};

export default ChatScreen;

const styles = StyleSheet.create({

    container: { flex: 1 },
    recieverText: {},
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: 500,
        marginLeft: 10,
        marginBottom: 15,
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 10
        
      },
      recieverText: {
        color: "black",
        fontWeight: 500,
        marginLeft: 10,
      },
    senderName: {
      left: 10,
      paddingRight: 10,
      fontSize: 10,
      color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: 100,
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",

        padding: 10,
        color: "grey",
        borderRadius: 30,
    },

});