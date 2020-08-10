import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const dish = this.props.selectedDish;
        if (dish != null) {

            const comments = dish.comments.map(( dishComment ) => {
                return (
                    <div key={ dishComment.id }>
                        <p> { dishComment.comment } </p>
                        <p> -- { dishComment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dishComment.date)))} </p>
                    </div>
                );
            });

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={dish.image} alt={dish.name} />
                                <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>

                        <div  className="col-12 col-md-5 m-1">
                            <h3> Comments </h3>
                            { comments }
                        </div>

                    </div>
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }
}

export default Dishdetail;