import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonScreen from './ButtonScreen'; // Ajusta la ruta si es necesario
import CalendarScreen from './CalendarScreen'; // Ajusta la ruta si es necesario
import ScheduleScreen from './ScheduleScreen'; // Ajusta la ruta si es necesario
import WeekListScreen from './WeekListScreen'; // Ajusta la ruta si es necesario
import DayDetail from './components/DayDetail'; // Ajusta la ruta si es necesario
import ObjectivesAndPrioritiesScreen from './ObjectivesAndPrioritiesScreen';
import noss from './noss';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={ButtonScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="WeekList" 
          component={WeekListScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DayDetail" 
          component={DayDetail} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="ObjectivesAndPriorities" component={ObjectivesAndPrioritiesScreen}
        options={{ headerShown: false }} />
        <Stack.Screen 
          name="noss" 
          component={noss} 
          options={{ headerShown: false }} 
        />
        {/* Agrega otras pantallas si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
