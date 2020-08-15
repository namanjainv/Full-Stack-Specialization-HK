import React, { Component } from 'react';
import { DISHES } from '../shared/dishes'
import Menu from './MainComponent';

class Main extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            dishes: DISHERS
        }
    }

    render( ) {
        return(
            <Menu />
        )
    }
}

export default Main;