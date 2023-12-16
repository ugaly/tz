import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ProfileScreen from './src/views/screens/ProfileScreen';
import LocationScreen from './src/views/screens/LocationScreen';
import COLORS from './src/consts/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}
          options={{ headerShown: false,  headerStyle: {
            backgroundColor: COLORS.primary, // Set the background color
          },
          headerTitleStyle: {
            color: 'white', // Set the text color to white
            fontWeight: 'bold', // Set the text to be bold
          },
          
          }} />
    
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import OnBoardScreen from './src/views/screens/OnBoardScreen';
// import HomeScreen from './src/views/screens/HomeScreen';
// import DetailsScreen from './src/views/screens/DetailsScreen';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const HomeStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="HomeScreen" component={HomeScreen} />
//     <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
//   </Stack.Navigator>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//         <Drawer.Screen name="Home" component={HomeStack} />
//         <Drawer.Screen name="OnBoardScreen" component={OnBoardScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
