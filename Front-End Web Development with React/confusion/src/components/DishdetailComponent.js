import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const dish = this.props.selectedDish;

        // Ref: https://stackoverflow.com/questions/27480262/get-current-date-in-dd-mon-yyy-format-in-javascript-jquery
        Date.prototype.toShortFormat = function( ) {

            let monthNames =["Jan","Feb","Mar","Apr",
                              "May","Jun","Jul","Aug",
                              "Sep", "Oct","Nov","Dec"];
            
            let day = this.getDate();
            day = day > 9 ? day.toString() : "0" + day.toString()
            
            let monthIndex = this.getMonth();
            let monthName = monthNames[monthIndex];
            
            let year = this.getFullYear();
            
            // return `${day}-${monthName}-${year}`;  
            return `${monthName} ${day}, ${year}`;  
        }

        if (dish != null) {

            const comments = dish.comments.map(( dishComment ) => {
                return (
                    <div key={dishComment.id}>
                        <p> { dishComment.comment } </p>
                        <p> -- { dishComment.author }, { ( new Date( dishComment.date ) ).toShortFormat() } </p>
                    </div>
                );
            });

            return(

                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
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
            );
        }
        else
            return(
                <div></div>
            );
    }
}

export default Dishdetail;