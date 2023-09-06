import React, { useState, useRef } from 'react';
import { Text, TextInput, View, FlatList, StatusBar, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles'
import TypeIndicator from './TypeIndicator';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const flatListRef = useRef(null);
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { type: 'user', text: message.trim() }]);
            setMessage('');

            console.log("Sending message:", message.trim());  // <-- This will log the message being sent

            setIsTyping(true);

            // Send the user's message to the Flask server
            fetch('https://e6c1-150-204-195-10.ngrok-free.app/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: message.trim()
                })
            })
                .then(response => response.json())
                .then(data => {
                    setIsTyping(false);
                    console.log("Received response:", data.response);  // <-- This will log the received response
                    // Display the server's response
                    setMessages(prev => ([...prev, { type: 'machine', text: data.response }]));
                })
                .catch(error => {
                    setIsTyping(false);
                    console.error("There was an error sending the message:", error);
                });
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
            <StatusBar />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Medical Assistant</Text>
                {isTyping && <TypeIndicator />}
            </View>

            <View style={styles.contentContainer}>
                <FlatList
                    ref={flatListRef}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={item.type === 'user' ? styles.userMessageContainer : styles.machineMessageContainer}>
                            <Text style={item.type === 'user' ? styles.userMessage : styles.machineMessage}>{item.text}</Text>
                        </View>
                    )}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type your query..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                        <Ionicons name="send" size={24} color="#2196F3" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}


