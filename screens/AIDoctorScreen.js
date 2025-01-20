import React, {useState} from "react";
import { FlatList, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function AIDoctorScreen() {

  const [messages, setMessages] = useState([
    { id: 1, sender: 'AI', text: 'Hello! How can I help you today?' },
  ]);  

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { id: messages.length + 1, sender: 'User', text: input };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { id: messages.length + 2, sender: 'AI', text: 'I see. Tell me more about that.' };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const renderItem = ({item}) => (
    <View style={[styles.messageContainer, item.sender === 'User' ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AI Doctor</Text>
      <View style={styles.messageBox}>
        <Text>Lorem Ipsum dolor sit amet lorem ipsum</Text>
      </View>
      <View style={styles.messageBox}>
        <Text>Lorem Ipsum dolor sit amet lorem ipsum</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.chatBox}>
        <TextInput placeholder="Type a message" style={styles.input} onChangeText={setInput} value={input} />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text>✈️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  messageBox: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  chatBox: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  input: { flex: 1, padding: 10 },
  sendButton: { padding: 10 },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  chatContainer: { padding: 10 },
  messageContainer: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '70%' },
  userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  aiMessage: { backgroundColor: '#E8E8E8', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 15 },
  sendButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#007AFF', borderRadius: 20, paddingHorizontal: 20 },
  sendText: { color: '#fff', fontWeight: 'bold' },
});
