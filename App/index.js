// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { 
                        role: "user", 
                        content: `Create a fairy tale with the following details:
                                  Heroes: ${heroes}
                                  Villains: ${villains}
                                  Plot: ${plot}`
                    }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            const resultString = data.response;
            setStory(resultString);
        } catch (error) {
            console.error("Error generating story:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Heroes"
                    value={heroes}
                    onChangeText={setHeroes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villains"
                    value={villains}
                    onChangeText={setVillains}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Fairy Tale" onPress={generateStory} />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                ) : (
                    story ? <Text style={styles.story}>{story}</Text> : null
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 40,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        lineHeight: 24,
    },
});