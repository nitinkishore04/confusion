import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}) {
        if( dish != null) {
            return(
                <Card>
                    <CardImg object src={dish.image} alt={dish.name}></CardImg>
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
    function RenderComment({comments}) {
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
                        <RenderComment comments={props.comments}/>
                    </div>
            </div>
            </div>
        );
    }
export default Dishdetail;