import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Rating, Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: ( commentData ) => dispatch( postComment( commentData ) )
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={ styles.Icons }>
                        
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            style={ styles.Icon }
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.toggleCommentModal() }
                            style={ styles.Icon }
                            />
                    
                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments( props ) {
    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 1.0
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 1.0
        });
    }


    handleSubmit() {
        const commentData = {
            dishId: this.props.route.params.dishId,
            rating: this.state.rating,
            comment: this.state.comment,
            author: this.state.author,
            date: (new Date()).toISOString()
        }
        this.props.postComment( commentData );
        // console.log(JSON.stringify( commentData ));
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleCommentModal={ () => this.toggleModal() }
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}>
                    <View style = {styles.modal}>
                        <View style={styles.modalView}>
                            <Rating 
                                showRating 
                                fractions={1}
                                startingValue={1.0}
                                onFinishRating={ value => this.setState( { rating: value } ) } />
                        </View>

                        <View style={styles.modalView}>
                            <Input
                                placeholder="name"
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                style={styles.modalInput}
                                onChangeText={value => this.setState({ author: value })}
                                />
                        </View>

                        <View style={styles.modalView}>
                            <Input
                                placeholder="comment"
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                style={styles.modalInput}
                                onChangeText={value => this.setState({ comment: value })}
                                />
                        </View>

                        <View style={ styles.modalView, styles.modalButtonSubmit }>
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.handleSubmit(); this.resetForm; }}
                                color="#fff"
                                title="Submit" 
                                />
                        </View>

                        <View style={ styles.modalView, styles.modalButtonCancel }>
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#fff"
                                title="Close" 
                                />
                        </View>
                    </View>
                </Modal>
            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 10,
        marginTop: 50
     },
     modalView: {
         margin: 10,
     },
     modalButtonSubmit: {
        backgroundColor: '#512DA8',
        margin: 10,
     },
     modalButtonCancel: {
        backgroundColor: '#A9A9A9',
        margin: 10,
     },
     Icons: {
        justifyContent: 'center',
        flexDirection: "row"
     },
     Icon: {
        flex: 1
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);;