import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleScreen = () => {
  const [hours, setHours] = useState([
    { time: '07:00', color: '#ec6196', meeting: '' },
    { time: '08:00', color: '#6ccce3', meeting: '' },
    { time: '09:00', color: '#ec6196', meeting: '' },
    { time: '10:00', color: '#6ccce3', meeting: '' },
    { time: '11:00', color: '#ec6196', meeting: '' },
    { time: '12:00', color: '#6ccce3', meeting: '' },
    { time: '13:00', color: '#ec6196', meeting: '' },
    { time: '14:00', color: '#6ccce3', meeting: '' },
    { time: '15:00', color: '#ec6196', meeting: '' },
    { time: '16:00', color: '#6ccce3', meeting: '' },
    { time: '17:00', color: '#ec6196', meeting: '' },
    { time: '18:00', color: '#6ccce3', meeting: '' },
    { time: '19:00', color: '#ec6196', meeting: '' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para agregar un pendiente
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Función para eliminar un pendiente
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Función para cambiar el texto de una reunión
  const handleMeetingChange = (text, index) => {
    const updatedHours = [...hours];
    updatedHours[index].meeting = text;
    setHours(updatedHours);
  };

  // Función para manejar el cambio de fecha
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  // Función para guardar los datos en AsyncStorage
  const saveData = async () => {
    const dateKey = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const data = {
      meetings: hours,
      tasks: tasks,
    };

    try {
      const existingData = await AsyncStorage.getItem('citas');
      const citas = existingData ? JSON.parse(existingData) : {};

      // Si ya existe un objeto para la fecha, lo actualizamos
      if (!citas[dateKey]) {
        citas[dateKey] = { meetings: [], tasks: [] };
      }

      // Actualizamos las citas para la fecha seleccionada
      citas[dateKey].meetings = data.meetings;
      citas[dateKey].tasks = data.tasks;

      // Guardamos el objeto actualizado en AsyncStorage
      await AsyncStorage.setItem('citas', JSON.stringify(citas));

      Alert.alert('Éxito', 'Datos guardados correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar los datos');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.title}>Reuniones y citas</Text>
        </View>

        {/* Botón para la fecha */}
        <View style={styles.datePickerContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>Seleccionar fecha</Text>
          </TouchableOpacity>
          <Text style={styles.selectedDateText}>
            Fecha seleccionada: {selectedDate.toLocaleDateString()}
          </Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Horario */}
        <ScrollView style={styles.schedule}>
          {hours.map((hour, index) => (
            <View key={index} style={styles.hourContainer}>
              <Text style={[styles.hourText, { color: hour.color }]}>{hour.time}</Text>
              <TextInput
                style={styles.meetingInput}
                placeholder="Agregar cita o reunión"
                value={hour.meeting}
                onChangeText={(text) => handleMeetingChange(text, index)}
                multiline
              />
            </View>
          ))}
        </ScrollView>

        {/* Sección de pendientes */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Pendientes</Text>
          <TextInput
            style={styles.taskInput}
            placeholder="Agregar pendiente"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Agregar" onPress={addTask} color="#ec6196" />

          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item}</Text>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Botón para guardar */}
          <Button title="Guardar" onPress={saveData} color="#6ccce3" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde9f0',
    padding: 21,
  },
  header: {
    backgroundColor: '#ec6196',
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#6ccce3',
    padding: 10,
    borderRadius: 8,
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedDateText: {
    marginTop: 5,
    fontSize: 14,
    color: '#ec6196',
  },
  schedule: {
    flex: 1,
    marginBottom: 10,
    width: width * 0.9,
    alignSelf: 'center',
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f4cfe2',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hourText: {
    width: 60,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  meetingInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  footer: {
    backgroundColor: '#fde9f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginTop: 5,
    width: width * 0.9,
    alignSelf: 'center',
  },
  footerText: {
    color: '#ec6196',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  taskInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5,
    fontSize: 14,
    paddingVertical: 3,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 14,
  },
  deleteButton: {
    color: '#ec6196',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ScheduleScreen;
