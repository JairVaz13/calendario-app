import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ObjectivesAndPrioritiesScreen = () => {
  const [objectives, setObjectives] = useState([]);
  const [newObjective, setNewObjective] = useState('');
  const [priorities, setPriorities] = useState([]);
  const [newPriority, setNewPriority] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('prioridades');
        if (jsonData) {
          const { objectives, priorities } = JSON.parse(jsonData);
          setObjectives(objectives || []);
          setPriorities(priorities || []);
        }
      } catch (error) {
        console.error('Error loading data', error);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    try {
      const data = { objectives, priorities };
      await AsyncStorage.setItem('prioridades', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const addObjective = () => {
    if (newObjective.trim() === '') {
      Alert.alert('Error', 'Por favor, escribe un objetivo antes de agregarlo.');
      return;
    }
    const updatedObjectives = [...objectives, newObjective];
    setObjectives(updatedObjectives);
    setNewObjective('');
    saveData(); // Save data whenever an objective is added
  };

  const addPriority = () => {
    if (newPriority.trim() === '') {
      Alert.alert('Error', 'Por favor, escribe una prioridad antes de agregarla.');
      return;
    }
    const updatedPriorities = [...priorities, newPriority];
    setPriorities(updatedPriorities);
    setNewPriority('');
    saveData(); // Save data whenever a priority is added
  };

  const deleteObjective = (index) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    saveData(); // Save data after deletion
  };

  const deletePriority = (index) => {
    const updatedPriorities = priorities.filter((_, i) => i !== index);
    setPriorities(updatedPriorities);
    saveData(); // Save data after deletion
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/imagen5.png')} style={styles.image} />
      </View>

      <Text style={styles.header}>OBJETIVOS Y PRIORIDADES</Text>

      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <Text style={styles.subHeader}>Objetivos</Text>

          {objectives.map((objective, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{objective}</Text>
              <TouchableOpacity onPress={() => deleteObjective(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TextInput
            style={styles.input}
            placeholder="Escribe un objetivo"
            value={newObjective}
            onChangeText={setNewObjective}
          />

          <TouchableOpacity style={styles.addButton} onPress={addObjective}>
            <Text style={styles.addButtonText}>Agregar nuevo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <Text style={styles.subHeader}>Prioridades</Text>

          {priorities.map((priority, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{priority}</Text>
              <TouchableOpacity onPress={() => deletePriority(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TextInput
            style={styles.input}
            placeholder="Escribe una prioridad"
            value={newPriority}
            onChangeText={setNewPriority}
          />

          <TouchableOpacity style={styles.addButton} onPress={addPriority}>
            <Text style={styles.addButtonText}>Agregar nuevo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          ¡Recuerda que debes mantener el orden de cada tarea!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf3e3',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3A55B4',
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '45%',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3A55B4',
  },
  item: {
    backgroundColor: '#e6eaf7',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  itemText: {
    fontSize: 16,
    color: '#3A55B4',
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#FC9E7F',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  tipContainer: {
    marginTop: 30,
    backgroundColor: '#D9A9E3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ObjectivesAndPrioritiesScreen;
