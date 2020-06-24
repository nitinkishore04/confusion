import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component{
        constructor(props){
            super(props);

            this.state={
                isModalOpen: false,
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                    isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.toggleModal();
            // console.log("Your Feedback is"+JSON.stringify(values));
            // alert("Your Feedback is"+JSON.stringify(values))
            this.props.addComment(this.props.dishId, values.rating, values.yourname, values.feedback);
        }
        render(){
            return(
                <>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="rating">Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="yourname">Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".yourname" name="yourname" id="yourname"
                                        className="form-control" placeholder="Your Name"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".yourname" show="touched" messages={{
                                         required: "Required ",
                                         minLength: "Minimum Length should be 3 character ",
                                         maxLength: "Maximum Length should be 15 character "
                                     }}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="feedback">Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".feedback" className="form-control"  id="feedback" 
                                        name="feedback" rows="6"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }

    function RenderDish({dish}) {
        if( dish != null) {
            return(
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    function RenderComment({comments, addComment, dishId}) {
        if (comments != null) {
                const cmnt = comments.map((comment) => {
                    return (
                        <div className="m-2">
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, 
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                            .format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    );
                })    

            return (
                <div>
                    <h4>Comment</h4>
                    <ul className="list-unstyled">
                        {cmnt}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    function Dishdetail (props) {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                     </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComment comments={props.comments}
                            addComment = {props.addComment} dishId = {props.dish.id}
                            />
                        </div>
                </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
        
    }
export default Dishdetail;