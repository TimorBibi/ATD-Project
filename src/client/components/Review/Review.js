import React from 'react';
import './Review.scss';
import {connect} from 'react-redux';
import ReviewActions from '../Review/actions';
import {Button, Form, Input} from 'semantic-ui-react'
import {List, Map} from 'immutable'
import {Rating} from 'primereact/rating'
import {InputTextarea} from 'primereact/inputtextarea';

class Review extends React.Component {

    constructor(props){
        super(props);
        this.viewReviewItem = this.viewReviewItem.bind(this);
        this.editReviewItem = this.editReviewItem.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

        downloadFile(e) {
        const file = e.target.files[0];
        let fs = new FileReader();
        fs.onloadend = () => {
            let pictureData = fs.result;
            let value = {
                pictureType: file.type,
                pictureData: pictureData,
            };
            this.props.updateStateFieldEventHandler(e, {id:'picture' ,value: value});
        };
        fs.readAsDataURL(file);
    }

    viewReviewItem(review)
    {
        const hasFreeText = review.get('freeText')?
            (<label htmlFor="freeText">Description: {review.get('freeText')}</label>)
            : null;

        const reviewImg = review.get('picture').contentType !== "" && review.get('picture').contentType!==null?
            (<div className="imgPreview">
                <img src={review.get('picture').data} width="200" height="100"/>
            </div>):
            null;

        const editable = review.get('username') !== this.props.username ? null:
            (<div>
                <Button id={review.get('username')+"_"+review.get('timeStamp')}  className="ui button"
                        onClick={() => this.props.makeEditableEventHandler(this.props.editReview, review)}>Edit</Button>
                <Button id={"delete_"+review.get('username')+"_"+review.get('timeStamp')}  className="ui button"
                        onClick={() => this.props.deleteReviewEventHandler(review)}>Delete</Button>
            </div>);

        return(
            <Form className="register-form" key={review.get('username')+"_"+review.get('timeStamp')}>
                <Form.Field width='9'>
                    <label htmlFor="writer">Writer: </label>
                    <p id="writer">{review.get('username')}</p>
                </Form.Field>
                <Form.Field width='9'>
                    {reviewImg}
                </Form.Field>

                <Form.Field width='9'>
                    <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                    <Rating id='bathroomRate' value={review.get('bathroom')} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="staffRate">Staff Kindness:</label>
                    <Rating id='staffRate' value={review.get('staff')}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="cleanRate">Cleanliness:</label>
                    <Rating id='cleanRate' value={review.get('clean')}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="foodRate">Food Quality:</label>
                    <Rating id='foodRate' value={review.get('food')} stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="driveInRate">Drive-thru Quality:</label>
                    <Rating id='driveInRate' value={review.get('driveIn')}  stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="deliveryRate">Delivery Speed:</label>
                    <Rating id='deliveryRate' value={review.get('delivery')} stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    {hasFreeText}
                </Form.Field>
                <br/>
                {editable}
                <hr/>
            </Form>)
    }


    editReviewItem(review)
    {
        const reviewImg = review.get('picture').contentType !== "" && review.get('picture').contentType!==null?
            (<div className="imgPreview">
                <img src={review.get('picture').data} width="200" height="100"/>
            </div>):
            null;
        return (
            <Form className="register-form" key={review.get('username')+"_"+review.get('timeStamp')}
                  onSubmit={() => {
                      this.props.submitEditEventHandler(
                          review.get('username'),
                          review.get('name'),
                          review.get('location'),
                          review.get('timeStamp'),
                          this.props.bathroomRate,
                          this.props.staffRate,
                          this.props.cleanRate,
                          this.props.foodRate,
                          this.props.driveInRate,
                          this.props.deliveryRate,
                          this.props.picture,
                          this.props.freeText
                      );
                      this.props.makeEditableEventHandler(this.props.editReview, review);
                  }}>
            <Form.Field width='9'>
                <label htmlFor="writer">Writer: </label>
                <p id="writer">{review.get('username')}</p>
            </Form.Field>
            <Form.Field width='9'>
                <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                {reviewImg}
            </Form.Field>

            <Form.Field width='9'>
                <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                <Rating id='bathroomRate' value={this.props.bathroomRate} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="staffRate">Staff Kindness:</label>
                <Rating id='staffRate' value={this.props.staffRate}  stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="cleanRate">Cleanliness:</label>
                <Rating id='cleanRate' value={this.props.cleanRate}  stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="foodRate">Food Quality:</label>
                <Rating id='foodRate' value={this.props.foodRate} stars={5} cancel={false}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="driveInRate">Drive-thru Quality:</label>
                <Rating id='driveInRate' value={this.props.driveInRate}  stars={5}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="deliveryRate">Delivery Speed:</label>
                <Rating id='deliveryRate' value={this.props.deliveryRate} stars={5}
                        onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="freeText">Description: </label>
                <InputTextarea id="freeText" value={this.props.freeText}
                               onChange={this.props.updateStateFieldEventHandler}/>
            </Form.Field>
                <br/>
                <Form.Button id={"edit_" + review.get('username')+"_"+review.get('timeStamp')}
                             content='Submit Review' type="submit"/>
                <Form.Button id={"cancel_" + review.get('username')+"_"+review.get('timeStamp')} className="ui button"
                        onClick={() => this.props.makeEditableEventHandler(this.props.editReview, review)} >
                    Cancel
                </Form.Button>
                <hr/>
            </Form>
        );
    }

    render() {
        const review = new Map(this.props.review);

        const toRender = this.props.editReview ?
            this.editReviewItem(review): this.viewReviewItem(review);

        return (
            <div className='review'>
                {toRender}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        username: state['app'].get('username'),
        editReview: state['review'].get('editReview'),
        bathroomRate: state['review'].get('bathroomRate'),
        staffRate: state['review'].get('staffRate'),
        cleanRate: state['review'].get('cleanRate'),
        foodRate: state['review'].get('foodRate'),
        driveInRate: state['review'].get('driveInRate'),
        deliveryRate: state['review'].get('deliveryRate'),
        avgRate: state['review'].get('avgRate'),
        freeText: state['review'].get('freeText'),
        picture: state['review'].get('picture'),

    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(ReviewActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(ReviewActions.updateStateFieldAction(e.target.id, e.target.value));
        },
        //TODO reviewContent is a Map
        makeEditableEventHandler: (prevEditReview, reviewContent) => {
            dispatch(ReviewActions.enableEditReviewAction(prevEditReview, reviewContent))
        },
        //TODO reviewContent is a Map
        deleteReviewEventHandler: (reviewContent) => {
            dispatch(ReviewActions.deleteReviewAction(reviewContent));
        },
        //TODO ReviewActions.submitEditReviewAction from restaurant to here + saga function
        submitEditEventHandler: (username, name, location, timeStamp, bathroom, staff, clean, food, driveIn, delivery, picture, freeText) => {
            dispatch(ReviewActions.submitEditReviewAction(
                username, name, location, timeStamp,
                bathroom, staff, clean, food,
                driveIn, delivery, picture, freeText));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
