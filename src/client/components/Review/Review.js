import React from 'react';
import './Review.scss';
import {connect} from 'react-redux';
import ReviewActions from '../Review/actions';
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react'
import {Rating} from 'primereact/rating'
import {InputTextarea} from 'primereact/inputtextarea';
import {Growl} from "primereact/components/growl/Growl";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";

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
        (<Header className= 'rating_title' as='h4'>
                Description: {this.state.freeText}
        </Header>)
        : null;
    const reviewImg = !(this.state.picture.pictureData) ? null:
        (<div>
            <Image src={this.state.picture.pictureData} size='small' spaced='left'/>
        </div>);


    const editable = this.state.username !== this.props.username;
    const edit_button = editable? null:
        <Button className='left_review_btn' basic color='violet' fluid size='small' id={this.state.username+"_"+this.state.timeStamp} type="button"
                                                   onClick={() => this.makeEditableAction()}>Edit</Button>;
    const delete_button = editable? null:
            <Button className='right_review_btn' basic color='violet'  size='small' fluid
                    id={"delete_"+this.state.username+"_"+this.state.timeStamp}  type="button"
                    onClick={() => this.props.deleteReviewEventHandler(this.state)}>Delete</Button>;

    return(
        <Form size='large' key={this.state.username+"_"+this.state.timeStamp}>
        <Segment stacked className= 'review_form'>
        <Grid textAlign='center' relaxed verticalAlign='middle'>
            <Grid.Row columns={3}>
                <Grid.Column>
                    {reviewImg}
                    <Header className= 'review' id="view_review_name" as='h1' color='grey'>
                        {this.state.name}
                    </Header>
                    <Header className= 'review' id="view_review_location" as='h5' color='grey'>
                        {this.state.location.city}
                    </Header>
                    <Header className= 'review' id="view_review_writer" as='h5' color='grey'>
                        {this.state.username}
                    </Header>

                </Grid.Column>
                <Grid.Column>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Bathroom Quality
                        </Header>
                        <Rating id='bathroom' value={this.state.bathroom} cancel={false} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Staff Kindness
                        </Header>
                        <Rating id='staff' value={this.state.staff}  stars={5} cancel={false} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Cleanliness
                        </Header>
                        <Rating id='clean' value={this.state.clean}  stars={5} cancel={false} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Food Quality
                        </Header>
                        <Rating id='food' value={this.state.food} stars={5} cancel={false} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Drive-thru Quality
                        </Header>
                        <Rating id='driveIn' value={this.state.driveIn}  stars={5} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <Header className= 'rating_title' as='h4'>
                            Delivery Speed
                        </Header>
                        <Rating id='delivery' value={this.state.delivery} stars={5} readonly={true}
                                onChange={(e) => this.updateStateField(e)}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
                <Grid.Column >
                    {hasFreeText}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column verticalAlign='middle'>
                   {edit_button}
                </Grid.Column>
                <Grid.Column verticalAlign='middle'>
                    {delete_button}
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Segment>
        </Form>
    )
}


    editReviewItem()
    {
        const reviewImg = !this.state.picture.pictureData ? null:
            (<div>
                <Image src={this.state.picture.pictureData} size='small' spaced='left'/>
            </div>);
        return (
            <Form size='large'
                  key={this.state.username+"_"+this.state.timeStamp}
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
                <Growl ref={(el) => this.growl = el} position="bottomright"/>
                <Segment stacked className= 'review_form'>
                    <Grid textAlign='center' relaxed verticalAlign='middle'>
                        <Grid.Row columns={1} style={{paddingBottom: '0px'}}>
                            <Header className='edit_review_title' as='h2' >
                                Edit Review
                            </Header>
                        </Grid.Row>
                        <Grid.Row columns={3} style={{paddingTop: '0px'}}>
                            <Grid.Column>
                                {reviewImg}
                                <Header className= 'review' id="edit_review_name" as='h1' color='grey'>
                                    {this.state.name}
                                </Header>
                                <Header className= 'review' id="edit_review_location" as='h5' color='grey'>
                                    {this.state.location.city}
                                </Header>
                                <Header className= 'review' id="edit_review_writer" as='h5' color='grey'>
                                    {this.state.username}
                                </Header>

                                <Form.Input fluid type='file' id="picture"  accept="image/*"
                                            onChange={this.downloadFile}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Bathroom Quality
                                    </Header>
                                    <Rating id='bathroom' value={this.state.bathroom} cancel={false}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Staff Kindness
                                    </Header>
                                    <Rating id='staff' value={this.state.staff}  stars={5} cancel={false}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Cleanliness
                                    </Header>
                                    <Rating id='clean' value={this.state.clean}  stars={5} cancel={false}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Food Quality
                                    </Header>
                                    <Rating id='food' value={this.state.food} stars={5} cancel={false}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Drive-thru Quality
                                    </Header>
                                    <Rating id='driveIn' value={this.state.driveIn}  stars={5}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                                <Form.Field>
                                    <Header className= 'rating_title' as='h4'>
                                        Delivery Speed
                                    </Header>
                                    <Rating id='delivery' value={this.state.delivery} stars={5}
                                            onChange={(e) => this.updateStateField(e)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={1}>
                            <Grid.Column >
                            <Header className= 'rating_title' as='h4'>
                                Description
                            </Header>
                            <Form.TextArea id='freeText' value={this.props.freeText}
                                           onChange={(e) => this.updateStateField(e)}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2} >
                            <Grid.Column >
                                <Button className='left_review_btn' basic color='violet'
                                        id={"edit_" + this.state.username+"_"+this.state.timeStamp} fluid size='small' type="submit">
                                    Submit
                                </Button>
                            </Grid.Column >
                            <Grid.Column >
                                <Button className='right_review_btn' basic color='violet'
                                        id={"cancel_" + this.state.username+"_"+this.state.timeStamp} fluid size='small' type="button"
                                        onClick={() => this.makeEditableAction()}>
                                    Cancel
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>);
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
