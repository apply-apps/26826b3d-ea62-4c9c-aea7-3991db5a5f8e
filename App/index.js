// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
    const [serialNumber, setSerialNumber] = useState('');
    const [rackPosition, setRackPosition] = useState('');
    const [switches, setSwitches] = useState([]);

    const handleAddSwitch = () => {
        setSwitches([...switches, { serialNumber, rackPosition, id: Date.now().toString() }]);
        setSerialNumber('');
        setRackPosition('');
    };

    const renderSwitch = ({ item }) => (
        <View style={styles.switchItem}>
            <Text style={styles.switchText}>Serial: {item.serialNumber}</Text>
            <Text style={styles.switchText}>Rack Position: {item.rackPosition}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Datacenter Switch Tracker</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Serial Number"
                    value={serialNumber}
                    onChangeText={setSerialNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Rack Position"
                    value={rackPosition}
                    onChangeText={setRackPosition}
                />
                <Button title="Add Switch" onPress={handleAddSwitch} />
                <FlatList
                    data={switches}
                    renderItem={renderSwitch}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
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
        marginHorizontal: 20,
    },
    list: {
        marginTop: 20,
    },
    switchItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    switchText: {
        fontSize: 16,
    },
});