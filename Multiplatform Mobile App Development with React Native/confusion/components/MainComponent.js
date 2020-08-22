import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import Login from './LoginComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorite from './FavoriteComponent';
import Reservation from './ReservationComponent';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

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


const LoginStack = createStackNavigator();

const LoginNavigator = ( props ) => {
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
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} options={{ ...options, title: 'Login', ...navigationOptions }} />
        </LoginStack.Navigator>
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


const FavoriteStack = createStackNavigator();

const FavoriteNavigator = ( props ) => {
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
        <FavoriteStack.Navigator>
            <FavoriteStack.Screen name="Favorite" component={ Favorite } options={{ ...options, title: 'My Favorites', ...navigationOptions }} />
            <FavoriteStack.Screen name="Dishdetail" component={Dishdetail} options={{ ...options, title: 'Dish Details' }} />
        </FavoriteStack.Navigator>
    )
}

const ReservationStack = createStackNavigator();

const ReservationNavigator = ( props ) => {
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
        <ReservationStack.Navigator>
            <ReservationStack.Screen name="About" component={ Reservation } options={{ ...options, title: 'Reserve Table', ...navigationOptions }} />
        </ReservationStack.Navigator>
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
            <MainDrawer.Navigator 
                    style={ drawerOptions } 
                    drawerContent={ props => <CustomDrawerContentComponent {...props}  /> } 
                    initialRouteName="Home">
                <MainDrawer.Screen name="Login" component={ LoginNavigator } options={{ 
                    title: 'Login', drawerLabel: 'Login', 
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'            
                            size={24}
                            iconStyle={{ color: tintColor }}
                            />
                        ) }} />
                <MainDrawer.Screen name="Home" component={ HomeNavigator } options={{ 
                    title: 'Home', drawerLabel: 'Home', 
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='home'
                            type='font-awesome'            
                            size={24}
                            iconStyle={{ color: tintColor }}
                            />
                        ) }} />
                <MainDrawer.Screen name="About" component={ AboutNavigator } options={{ 
                    title: 'About Us', drawerLabel: 'About Us',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                          name='info-circle'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      ), }} />
                <MainDrawer.Screen name="Menu" component={ MenuNavigator } options={{ title: 'Menu', drawerLabel: 'Menu',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                        name='list'
                        type='font-awesome'            
                        size={24}
                        iconStyle={{ color: tintColor }}
                        />
                    ), }} />
                <MainDrawer.Screen name="Contact" component={ ContactNavigator } options={{ title: 'Contact Us', drawerLabel: 'Contact Us',
                    drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'            
                        size={22}
                        iconStyle={{ color: tintColor }}
                    />
                    ), }} />
                <MainDrawer.Screen name="Favorite" component={ FavoriteNavigator } options={{ title: 'My Favorites', drawerLabel: 'My Favorites',
                    drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'            
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                    ), }} />
                <MainDrawer.Screen name="Reservation" component={ ReservationNavigator } options={{ title: 'Reserve Table', drawerLabel: 'Reserve Table',
                    drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'            
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                    ), }} />
            </MainDrawer.Navigator>
        </NavigationContainer>
    )
}

class Main extends Component {

    unsubscribe = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        
        NetInfo.fetch()
            .then(state => {
                ToastAndroid.show('Initial Network Connectivity Type: '
                    + state.type + ', is Connected: ' + state.isConnected,
                    ToastAndroid.LONG)
            });

        this.props.unsubscribe = NetInfo.addEventListener(state => this.handleConnectivityChange( state ) )
        
    }

    componentWillUnmount() {
        this.props.unsubscribe();
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);