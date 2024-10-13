import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [selectedDate, setSelectedDate] = useState(null);
  const [citas, setCitas] = useState({ meetings: [], tasks: [] });

  const handleDayPress = async (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    const savedData = await AsyncStorage.getItem('citas');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData[dateString]) {
        setCitas(parsedData[dateString]);
      } else {
        setCitas({ meetings: [], tasks: [] });
      }
    } else {
      setCitas({ meetings: [], tasks: [] });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Planner Mensual</Text>
      </View>
      <View style={[styles.calendarContainer, { width: screenWidth - 20 }]}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { marked: true },
          }}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#333',
            selectedDayBackgroundColor: '#f3a5a5',
            selectedDayTextColor: '#fff',
            todayTextColor: '#f3a5a5',
            dayTextColor: '#333',
            textDisabledColor: '#d9e1e8',
            dotColor: '#f3a5a5',
            selectedDotColor: '#fff',
            arrowColor: '#f3a5a5',
            monthTextColor: '#f3a5a5',
            indicatorColor: '#f6d1de',
            textDayFontFamily: 'sans-serif',
            textMonthFontFamily: 'sans-serif',
            textDayHeaderFontFamily: 'sans-serif',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      {selectedDate && (
        <View style={styles.citasContainer}>
          <Text style={styles.citasHeader}>Citas para {selectedDate}:</Text>
          <ScrollView style={styles.citasList}>
            {citas.meetings.length > 0 ? (
              citas.meetings.map((meeting, index) => (
                <View key={index} style={styles.citaItem}>
                  <Text style={styles.citaText}>
                    {`${meeting.time}: ${meeting.meeting}`} {/* Ajusta según la estructura de tus datos */}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noCitasText}>No hay citas para este día.</Text>
            )}
          </ScrollView>
          <Text style={styles.pendientesHeader}>Pendientes:</Text>
          <ScrollView style={styles.pendientesList}>
            {citas.tasks.length > 0 ? (
              citas.tasks.map((task, index) => (
                <View key={index} style={styles.pendienteItem}>
                  <Text style={styles.pendienteText}>
                    {task} {/* Ajusta según la estructura de tus datos */}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noPendientesText}>No hay pendientes para este día.</Text>
            )}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f6d1de',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#350a06',
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#b57edc',
    marginBottom: 30,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ffff',
  },
  citasContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ca678e',
  },
  citasHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  citasList: {
    maxHeight: 150, // Ajusta el alto máximo según necesites
    marginBottom: 10,
  },
  citaItem: {
    backgroundColor: '#dca8c7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  citaText: {
    color: '#fff',
  },
  pendientesHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pendientesList: {
    maxHeight: 150, // Ajusta el alto máximo según necesites
  },
  pendienteItem: {
    backgroundColor: '#dca8c7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  pendienteText: {
    color: '#fff',
  },
  noCitasText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  noPendientesText: {
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default CalendarScreen;
