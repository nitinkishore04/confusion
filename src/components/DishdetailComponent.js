import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

class Dishdetail extends Component {
    
    constructor(props){
        super(props);
    }

    renderDish(dish) {
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


    renderComment(dish) {
        if (dish != null) {

                const cmnt = dish.comments.map(comment => {
                    return (
                        <div className="m-2">
                            <p>{comment.comment}</p>
                            -- {comment.author}, {comment.date}
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


    render() {

        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComment(this.props.dish)}
                </div>
            </div>
        );

    }
}

export default Dishdetail;