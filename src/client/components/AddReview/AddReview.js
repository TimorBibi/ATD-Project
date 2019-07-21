import React from 'react';
import './AddReview.scss';
import {connect} from 'react-redux';
import {InputText} from 'primereact/inputtext';
import {Form, Input} from "semantic-ui-react";
import {Password} from "primereact/components/password/Password";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import RegisterPageActions from "../RegisterPage/actions";


class AddReview extends React.Component {

    componentDidMount() {
        // this.props.loadReviewsEventHandler();
    }

    render() {
        return (
            <Form className="addReview-form" onSubmit={() => {
                this.props.submitEventHandler(
                    this.props.username,
                    this.props.password,
                    this.props.location,
                    this.props.picture,
                    this.props.isValid);}}>
                <Form.Field width='9'>
                <span className="p-float-label">
                    <InputText id="username" value={this.props.username} onChange={this.props.updateStateFieldEventHandler}
                               className="form-text form-input" onBlur={this.props.validateUsernameEventHandler} />
                    <label htmlFor="username" className="form-text">Username</label>
                </span>
                </Form.Field>
                <Form.Field width='9'>
                  <span className="p-float-label">
                    <Password id='password' className="form-text form-input"
                              value={this.props.password} onChange={this.props.updateStateFieldEventHandler}/>
                    <label htmlFor="password" className="form-text">Password</label>
                  </span>
                </Form.Field>
                <Form.Field width='9'>
                    <Input type="file" id="picture"  accept="image/*" onChange={this.downloadFile}/>
                </Form.Field>
                <Form.Field width='9'>
                    <AutoComplete id='location' value={this.props.location} onChange={this.props.updateStateFieldEventHandler}
                                  suggestions={this.props.suggestions}
                                  completeMethod={(e) => this.props.suggestLocationsEventHandler(this.props.locations, e)} />
                </Form.Field>
                <Form.Button content='Register' type="submit"/>
            </Form>

        );
    }
}

const mapStateToProps = (state) => {
    return {


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateFieldEventHandler: (e, data) => {
            if (data) {
                dispatch(RegisterPageActions.updateStateFieldAction(data.id, data.value));
            }
            else
                dispatch(RegisterPageActions.updateStateFieldAction(e.target.id, e.target.value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
