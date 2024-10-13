import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, Button, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const DayDetail = ({ route }) => {
  const { dayId } = route.params;
  const [importantNotes, setImportantNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const getDayName = (id) => {
    const dayNames = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
    };
    return dayNames[id];
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleAddNote = () => {
    if (importantNotes.trim()) {
      Alert.alert('Nota Agregada', 'La nota importante ha sido agregada.');
      setImportantNotes(''); // Limpia el campo después de agregar la nota
    } else {
      Alert.alert('Nota Vacía', 'Por favor, escribe una nota antes de agregar.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{getDayName(dayId)}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.subHeader}>Horas del día:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.buttonText}>Seleccionar hora</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <Text style={styles.selectedText}>Hora seleccionada: {selectedTime.toLocaleTimeString()}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.subHeader}>Fecha:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Seleccionar fecha</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.selectedText}>Fecha seleccionada: {selectedDate.toDateString()}</Text>
      </View>
      <View style={styles.importantContainer}>
        <Text style={styles.subHeader}>Importante:</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Escribe aquí las notas importantes..."
          value={importantNotes}
          onChangeText={setImportantNotes}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNote}
        >
          <Text style={styles.addButtonText}>Agregar Nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf2f8', // Fondo azul claro
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004080', // Azul oscuro para el texto del encabezado
    backgroundColor: '#b3cde0', // Azul claro para el fondo del encabezado
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  timeContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#b3cde0', // Azul claro para el fondo del contenedor de tiempo
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#b3cde0', // Azul claro para el fondo del contenedor de fecha
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  importantContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#b3cde0', // Azul claro para el fondo del contenedor importante
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  subHeader: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#003366', // Azul más oscuro para los subtítulos
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7ec8e3', // Azul claro para el botón
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff', // Blanco para el texto del botón
    fontSize: width * 0.04,
  },
  selectedText: {
    fontSize: width * 0.04,
    color: '#003366', // Azul más oscuro para el texto seleccionado
    marginTop: 10,
  },
  textInput: {
    height: 120,
    borderColor: '#b3cde0', // Azul claro para el borde del campo de texto
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4a90e2', // Azul más intenso para el botón de agregar nota
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff', // Blanco para el texto del botón
    fontSize: width * 0.04,
  },
});

export default DayDetail;
