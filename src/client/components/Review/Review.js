import React from 'react';
import './Review.scss';
import {connect} from 'react-redux';
import ReviewActions from '../Review/actions';
import {Button, Form, Input} from 'semantic-ui-react'
import {Rating} from 'primereact/rating'
import {InputTextarea} from 'primereact/inputtextarea';

class Review extends React.Component {

    constructor(props){
        super(props);
        this.viewReviewItem = this.viewReviewItem.bind(this);
        this.editReviewItem = this.editReviewItem.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.updateStateField = this.updateStateField.bind(this);
        this.makeEditableAction = this.makeEditableAction.bind(this);

        const {username, name, location, bathroom, staff, clean, food,
            driveIn, delivery, freeText,
            picture, timeStamp, avgRate} = this.props.review;

        const editReview = false;
        this.state = {
            editReview, avgRate,
            username, name, location,
            bathroom, staff, clean,
            food, driveIn, delivery,
            freeText, timeStamp,
            picture: {
                pictureType: picture.contentType,
                pictureData: picture.data
            }
        };
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
            this.updateStateField(e, {id:'picture' ,value: value});
        };
        fs.readAsDataURL(file);
    }

    updateStateField(e, data= null){
        if (data) {
            this.setState({[data.id]: data.value});
        }
        else {
            this.setState({[e.target.id]: e.target.value});
        }
    }

    makeEditableAction(){

        const newEdit = !this.state.editReview;
        this.setState({
            editReview: newEdit,
        });
    }

    viewReviewItem()
    {
        const hasFreeText = this.state.freeText ?
            (<label htmlFor="freeText">Description: {this.state.freeText}</label>)
            : null;
        const reviewImg = !(this.state.picture.pictureData) ? null:
            (<div className="imgPreview">
                <img src={this.state.picture.pictureData} width="200" height="100"/>
            </div>);


        const editable = this.state.username !== this.props.username ? null:
            (<div>
                <Button id={this.state.username+"_"+this.state.timeStamp} type="button" className="ui button"
                        onClick={() => this.makeEditableAction()}>Edit</Button>
                <Button id={"delete_"+this.state.username+"_"+this.state.timeStamp}  type="button" className="ui button"
                        onClick={() => this.props.deleteReviewEventHandler(this.state)}>Delete</Button>
            </div>);

        return(
            <Form className="register-form" key={this.state.username+"_"+this.state.timeStamp}>
                <Form.Field width='9'>
                    <h2 id="name">{this.state.name}</h2>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="writer">Writer: </label>
                    <p id="writer">{this.state.username}</p>
                </Form.Field>
                <Form.Field width='9'>
                    {reviewImg}
                </Form.Field>

                <Form.Field width='9'>
                    <label htmlFor="bathroomRate" className="form-text">Bathroom Quality:</label>
                    <Rating id='bathroomRate' value={this.state.bathroom} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="staffRate">Staff Kindness:</label>
                    <Rating id='staffRate' value={this.state.staff}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="cleanRate">Cleanliness:</label>
                    <Rating id='cleanRate' value={this.state.clean}  stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="foodRate">Food Quality:</label>
                    <Rating id='foodRate' value={this.state.food} stars={5} cancel={false} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="driveInRate">Drive-thru Quality:</label>
                    <Rating id='driveInRate' value={this.state.driveIn}  stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    <label htmlFor="deliveryRate">Delivery Speed:</label>
                    <Rating id='deliveryRate' value={this.state.delivery} stars={5} readonly={true}/>
                </Form.Field>
                <Form.Field width='9'>
                    {hasFreeText}
                </Form.Field>
                <br/>
                {editable}
                <hr/>
            </Form>)
    }


    editReviewItem()
    {
        const reviewImg = !this.state.picture.pictureData ? null:
            (<div className="imgPreview">
                <img src={this.state.picture.pictureData} width="200" height="100"/>
            </div>);
        return (
            <Form className="register-form" key={this.state.username+"_"+this.state.timeStamp}
                  onSubmit={() => {
                      this.props.submitEditEventHandler(
                          this.state.username,
                          this.state.name,
                          this.state.location,
                          this.state.timeStamp,
                          this.state.bathroom,
                          this.state.staff,
                          this.state.clean,
                          this.state.food,
                          this.state.driveIn,
                          this.state.delivery,
                          this.state.picture,
                          this.state.freeText,
                          this.state.avgRate,
                      );
                      this.makeEditableAction();
                  }}>
            <Form.Field width='9'>
                <h2 id="name">{this.state.name}</h2>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="writer">Writer: </label>
                <p id="writer">{this.state.username}</p>
            </Form.Field>
            <Form.Field width='9'>
                <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                {reviewImg}
            </Form.Field>

            <Form.Field width='9'>
                <label htmlFor="bathroom" className="form-text">Bathroom Quality:</label>
                <Rating id='bathroom' value={this.state.bathroom} cancel={false}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="staff">Staff Kindness:</label>
                <Rating id='staff' value={this.state.staff}  stars={5} cancel={false}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="clean">Cleanliness:</label>
                <Rating id='clean' value={this.state.clean}  stars={5} cancel={false}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="food">Food Quality:</label>
                <Rating id='food' value={this.state.food} stars={5} cancel={false}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="driveIn">Drive-thru Quality:</label>
                <Rating id='driveIn' value={this.state.driveIn}  stars={5}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="delivery">Delivery Speed:</label>
                <Rating id='delivery' value={this.state.delivery} stars={5}
                        onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
            <Form.Field width='9'>
                <label htmlFor="freeText">Description: </label>
                <InputTextarea id="freeText" value={this.state.freeText}
                               onChange={(e) => this.updateStateField(e)}/>
            </Form.Field>
                <br/>
                <Form.Button id={"edit_" + this.state.username+"_"+this.state.timeStamp}
                             content='Submit Review' type="submit"/>
                <Button id={"cancel_" + this.state.username+"_"+this.state.timeStamp} type="button"
                             content="Cancel"
                             onClick={() => this.makeEditableAction()}/>
                <hr/>
            </Form>
        );
    }

    render() {
        const toRender = this.state.editReview ?
            this.editReviewItem(): this.viewReviewItem();

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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteReviewEventHandler: (reviewContent) => {
            dispatch(ReviewActions.deleteReviewAction(reviewContent));
        },
        submitEditEventHandler: (username, name, location, timeStamp,
                                 bathroom, staff, clean, food, driveIn,
                                 delivery, picture, freeText, avgRate) => {
            dispatch(ReviewActions.submitEditReviewAction({
                username, name, location, timeStamp,
                bathroom, staff, clean, food,
                driveIn, delivery, picture, freeText, avgRate}));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
