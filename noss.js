import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Asegúrate de tener expo-file-system instalado

export default function Planner() {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Notas'];
  const colors = ['#FFD3BA', '#FFAAA7', '#BFFCC6', '#FFCCB6', '#FF968A', '#CDF0EA', '#CDF7F6', '#CDF7F6'];

  // State for input values
  const [inputs, setInputs] = useState({
    Lunes: '',
    Martes: '',
    Miércoles: '',
    Jueves: '',
    Viernes: '',
    Sábado: '',
    Domingo: '',
    Notas: ''
  });

  // State for radio button selection
  const [selected, setSelected] = useState(Array(days.length).fill(false));

  // Handle text input changes
  const handleInputChange = (day, value) => {
    setInputs({ ...inputs, [day]: value });
  };

  // Handle radio button selection
  const handleRadioChange = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  // Save action
  const handleSave = async () => {
    const allSelected = selected.every(Boolean);
    if (allSelected) {
      Alert.alert('Completado', 'Has completado todas las actividades');
    }

    // Guardar datos en JSON
    const jsonData = JSON.stringify(inputs, null, 2);
    const fileUri = FileSystem.documentDirectory + 'titi.json';
    await FileSystem.writeAsStringAsync(fileUri, jsonData);

    Alert.alert('Guardado', 'Tus datos han sido guardados con éxito');
  };

  return (
    <View style={styles.container}>
      {/* Save Button at the Top */}
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} color="#841584" />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.header}>Planner Semanal</Text>
        {days.map((day, index) => (
          <View key={day} style={[styles.inputContainer, { backgroundColor: colors[index % colors.length] }]}>
            <Text style={styles.day}>{day}:</Text>
            <TextInput
              style={styles.input}
              placeholder={`Escribe algo para ${day.toLowerCase()}`}
              underlineColorAndroid="transparent"
              multiline={true}
              value={inputs[day]} // Mantener el valor del input
              onChangeText={(text) => handleInputChange(day, text)}
            />
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => handleRadioChange(index)}
            >
              <View style={[styles.radioButton, selected[index] && styles.selectedRadioButton]} />
              <Text>Completo</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    margin: 20,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'transparent',
    minHeight: 40,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#000',
  },
});
