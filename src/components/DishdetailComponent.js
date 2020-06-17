import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';


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


    function RenderComment({dish}) {
        if (dish != null) {

                const cmnt = dish.comments.map(comment => {
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
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComment dish={props.dish}/>
                </div>
            </div>
        );
    }
    



export default Dishdetail;