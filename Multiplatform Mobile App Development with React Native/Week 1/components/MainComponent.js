import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const options = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }
}
const MenuStack = createStackNavigator();

const MenuNavigator = () => {
    return(
            <MenuStack.Navigator>
                <MenuStack.Screen name="Menu" component={Menu} options={{ ...options, title: 'Menu' }} />
                <MenuStack.Screen name="Dishdetail" component={Dishdetail} options={{ ...options, title: 'Dish Details' }} />
            </MenuStack.Navigator>
    )
}

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{ ...options, title: 'Home' }} />
        </HomeStack.Navigator>
    )
}

const ContactStack = createStackNavigator();

const ContactNavigator = () => {
    return(
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={Contact} options={{ ...options, title: 'Contact Us' }} />
        </ContactStack.Navigator>
    )
}

const AboutStack = createStackNavigator();

const AboutNavigator = () => {
    return(
        <AboutStack.Navigator>
            <AboutStack.Screen name="About" component={ About } options={{ ...options, title: 'About Us' }} />
        </AboutStack.Navigator>
    )
}

const MainDrawer = createDrawerNavigator();

const drawerOptions = {
    backgroundColor: '#D1C4E9'
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MainDrawer.Navigator style={ drawerOptions } >
                <MainDrawer.Screen name="Home" component={ HomeNavigator } options={{ title: 'Home', drawerLabel: 'Home' }} />
                <MainDrawer.Screen name="About" component={ AboutNavigator } options={{ title: 'About Us', drawerLabel: 'About Us' }} />
                <MainDrawer.Screen name="Menu" component={ MenuNavigator } options={{ title: 'Menu', drawerLabel: 'Menu' }} />
                <MainDrawer.Screen name="Contact" component={ ContactNavigator } options={{ title: 'Contact Us', drawerLabel: 'Contact Us' }} />
            </MainDrawer.Navigator>
        </NavigationContainer>
    )
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}
  
export default Main;