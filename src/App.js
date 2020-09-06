import * as React from 'react';
import Bookmarks from './containers/Bookmarks';
import Bible from './containers/Bible';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { Colors } from './Theme';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{activeTintColor: Colors.primary_blue, inactiveTintColor: Colors.primary_blue }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark-sharp' : 'ios-bookmark-outline';
          }else if (route.name === 'Home'){
              iconName = focused ? 'ios-home': 'ios-home-outline'
          }

          return <Icon name={iconName} size={size} style={{color:color}} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Bible} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
    </Tab.Navigator>
  );
};

export default App;
