import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
 
const buttons = [
  { id: '1', image: require('./assets/imagen1.png'), backgroundColor: '#fdcae1', label: 'Notas' },
  { id: '2', image: require('./assets/imagen2.png'), backgroundColor: '#84b6f4', label: 'SEMANA' },
  { id: '4', image: require('./assets/imagen4.png'), backgroundColor: '#fdf9c4', label: 'REUNION' },
  { id: '5', image: require('./assets/imagen5.png'), backgroundColor: '#b0f2c2', label: 'PRIORIDADES' },
  { id: '6', image: require('./assets/imagen6.png'), backgroundColor: '#ffc0cb', label: 'planear semana' },
  
 
];

const { width } = Dimensions.get('window');

export default function ButtonScreen() {
  const navigation = useNavigation();

  const handleButtonPress = (id) => {
    if (id === '1') { // Botón "Notas"
      navigation.navigate('Calendar');
    } else if (id === '2') { // Botón "SEMANA"
      navigation.navigate('WeekList');
    } else if (id === '4') { // Botón "REUNION"
      navigation.navigate('Schedule');
    }else if (id === '5') {
    navigation.navigate('ObjectivesAndPriorities');
    }else if (id === '6') {
        navigation.navigate('noss');
    }
    // Manejar otras navegaciones si es necesario
  };

  const renderButton = ({ item }) => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: item.backgroundColor }]} 
        onPress={() => handleButtonPress(item.id)}
      >
        <Image source={item.image} style={styles.buttonImage} />
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>{item.label}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ffe4e1', '#d8af97', '#ffe4e1']} 
      style={styles.gradient}
    >
      <FlatList
        data={buttons}
        renderItem={renderButton}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.flatList}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  flatList: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flexGrow: 1, 
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 15,
    width: width * 0.23,
    height: width * 0.20 + 30, // Añadimos espacio para el texto debajo del botón
  },
  button: {
    width: '100%', 
    height: width * 0.23,
    borderRadius: (width * 0.23) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonImage: {
    width: '99%',
    height: '60%',
    resizeMode: 'contain',
    borderRadius: 50,
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 9, // Tamaño de fuente más pequeño
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
});
