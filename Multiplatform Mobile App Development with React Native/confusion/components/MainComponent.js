import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

// const MenuNavigator = createStackNavigator({
//     Menu: { screen: Menu },
//     Dishdetail: { screen: Dishdetail }
// },
// {
//     initialRouteName: 'Menu',
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: "#512DA8"
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             color: "#fff"            
//         }
//     }
// });

const Stack = createStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
 
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
                        <Stack.Screen name="Dishdetail" component={Dishdetail} options={{ title: 'Dish Details' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}
  
export default Main;