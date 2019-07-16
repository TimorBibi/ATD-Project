import React from 'react';
import './TopBar.scss';
import {connect} from 'react-redux';
import { Button } from 'primereact/button';
import ReviewFormActions from '../ReviewForm/actions';
import {InputText} from 'primereact/inputtext';


class TopBar extends React.Component {

    componentDidMount() {
        // this.props.loadReviewsEventHandler();
    }

    render() {
        console.log('name=', this.props.name);
        return (
        <div className="reviewform-root">
            <InputText
                value={this.props.name}
                onChange={this.props.updateNameEventHandler}
            />
            <div className= "reviewform-button">
                <Button
                    label="Send"
                    className="p-button-raised p-button-rounded "
                    onClick={() => this.props.addReviewEventHandler(this.props.name)
                    }
                />
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state['reviewform'].get('name'),
        // names: state['reviewform'].get('names').toArray()
}
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReviewEventHandler: (name) => {
            dispatch(ReviewFormActions.addReviewAction(name));
        },
        updateNameEventHandler: (e) => {
            dispatch(ReviewFormActions.updateNameAction(e.target.value));
        },
        loadReviewsEventHandler:(name)=> {
        dispatch(ReviewFormActions.loadReviewsAction(name))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
