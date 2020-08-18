import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

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

const MenuNavigator = ( props ) => {
    let navigation = props.navigation;
    const navigationOptions = {
        headerLeft: ( ) => (
            <Icon name="bars" size={24}  
                type='font-awesome'
                color= 'white'
                onPress={() => {
                    navigation.toggleDrawer();
                }}
            />
        )
    }
    return(
            <MenuStack.Navigator>
                <MenuStack.Screen name="Menu" component={Menu} options={{ ...options, title: 'Menu', ...navigationOptions }} />
                <MenuStack.Screen name="Dishdetail" component={Dishdetail} options={{ ...options, title: 'Dish Details' }} />
            </MenuStack.Navigator>
    )
}

const HomeStack = createStackNavigator();

const HomeNavigator = ( props ) => {
    let navigation = props.navigation;
    const navigationOptions = {
        headerLeft: ( ) => (
            <Icon name="bars" size={24}  
                type='font-awesome'
                color= 'white'
                onPress={() => {
                    navigation.toggleDrawer();
                }}
            />
        )
    }
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{ ...options, title: 'Home', ...navigationOptions }} />
        </HomeStack.Navigator>
    )
}

const ContactStack = createStackNavigator();

const ContactNavigator = ( props ) => {
    let navigation = props.navigation;
    const navigationOptions = {
        headerLeft: ( ) => (
            <Icon name="bars" size={24}  
                type='font-awesome'
                color= 'white'
                onPress={() => {
                    navigation.toggleDrawer();
                }}
            />
        )
    }
    return(
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={Contact} options={{ ...options, title: 'Contact Us', ...navigationOptions }} />
        </ContactStack.Navigator>
    )
}

const AboutStack = createStackNavigator();

const AboutNavigator = ( props ) => {
    let navigation = props.navigation;
    const navigationOptions = {
        headerLeft: ( ) => (
            <Icon name="bars" size={24}  
                type='font-awesome'
                color= 'white'
                onPress={() => {
                    navigation.toggleDrawer();
                }}
            />
        )
    }
    return(
        <AboutStack.Navigator>
            <AboutStack.Screen name="About" component={ About } options={{ ...options, title: 'About Us', ...navigationOptions }} />
        </AboutStack.Navigator>
    )
}

const MainDrawer = createDrawerNavigator();

const drawerOptions = {
    backgroundColor: '#D1C4E9',
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>

            <DrawerItemList {...props}></DrawerItemList>
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MainDrawer.Navigator style={ drawerOptions } drawerContent={ props => <CustomDrawerContentComponent {...props}  /> } >
                <MainDrawer.Screen name="Home" component={ HomeNavigator } options={{ 
                    title: 'Home', drawerLabel: 'Home', 
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='home'
                            type='font-awesome'            
                            size={24}
                            color={tintColor}
                            />
                        ) }} />
                <MainDrawer.Screen name="About" component={ AboutNavigator } options={{ 
                    title: 'About Us', drawerLabel: 'About Us',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                          name='info-circle'
                          type='font-awesome'            
                          size={24}
                          color={tintColor}
                        />
                      ), }} />
                <MainDrawer.Screen name="Menu" component={ MenuNavigator } options={{ title: 'Menu', drawerLabel: 'Menu',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                        name='list'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                        />
                    ), }} />
                <MainDrawer.Screen name="Contact" component={ ContactNavigator } options={{ title: 'Contact Us', drawerLabel: 'Contact Us',
                    drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'            
                        size={22}
                        color={tintColor}
                    />
                    ), }} />
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
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default Main;