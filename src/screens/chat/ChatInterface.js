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

            setIsTyping(true);

            // Simulate a machine reply
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => ([...prev, { type: 'machine', text: 'Hello, user! I got your message.' }]));
            }, 1000);
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


