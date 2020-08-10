import React from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments( { dishComments } ) {

    const comments = dishComments.map(( dishComment ) => {
        return (
            <div key={ dishComment.id }>
                <p> { dishComment.comment } </p>
                <p> -- { dishComment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dishComment.date)))} </p>
            </div>
        );
    });

    return (
        <div  className="col-12 col-md-5 m-1">
            <h3> Comments </h3>
            { comments }
        </div>
    );
}

const Dishdetail = ( { selectedDish } ) => {
    if (selectedDish != null) {
        return(
            <div className="container">
                <div className="row">
                    <RenderDish dish={ selectedDish } />
                    <RenderComments dishComments={ selectedDish.comments } />
                </div>
            </div>
        );
    }
    else
        return(
            <div></div>
        );

}

export default Dishdetail;