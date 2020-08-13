import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody,  } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    return (
        <div>
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

function RenderComments( { comments } ) {

    const commentsEl = comments.map(( dishComment ) => {
        return (
            <div key={ dishComment.id }>
                <p> { dishComment.comment } </p>
                <p> -- { dishComment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dishComment.date)))} </p>
            </div>
        );
    });

    return (
        <div>
            <h3> Comments </h3>
            { commentsEl }
        </div>
    );
}

class CommentForm extends Component {

    constructor( props ) {
        super(props);

        this.state = {
            isCommentModalOpen: false
        }

        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleComment( values ) {
        this.props.addComment( this.props.dishId, values.rating, values.name, values.comment )
    }

    render( ) {
        return (
            <div>
                <Button outline onClick={this.toggleCommentModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div class="container">
                            <div className="row">
                                <div className="col-12">
                                    <LocalForm onSubmit={(values) => this.handleComment(values)}>


                                        <div className="row form-group">
                                            <Label htmlFor="rating">Rating</Label>
                                            
                                            <Control.select model=".rating" name="rating"
                                                defaultValue="1" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </Control.select>
                                        </div>

                                        <div className="row form-group">
                                            <Label htmlFor="name">Your Name</Label>
                                                <Control.text model=".name" id="name" name="name"
                                                    placeholder="Your Name"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                    }}
                                                    />
                                                <Errors
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters. ',
                                                        maxLength: 'Must be 15 characters or less. '
                                                    }}
                                                />
                                        </div>

                                        <div className="row form-group">

                                            <Label htmlFor="comment">Comment</Label>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="5"
                                                className="form-control" />

                                        </div>

                                        <div className="row form-group">
                                            <Button type="submit" color="primary">
                                                Submit
                                            </Button>
                                        </div>
                                    </LocalForm>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}


class Dishdetail extends Component {

    constructor( props ) {
        super(props);
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} />
                            <CommentForm addComment={ this.props.addComment } dishId={ this.props.dish.id } />
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