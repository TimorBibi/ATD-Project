import { ReviewActionsConstants } from './constants';

function submitEditReviewAction(review)
{
    return {
        type: ReviewActionsConstants.SUBMIT_EDIT_REVIEW,
        uri: '/api/submit/edit/review',
        payload: {
            username: review.username, name: review.name, location: review.location,
            bathroom: review.bathroom, staff: review.staff, clean: review.clean,
            food: review.food, driveIn: review.driveIn, delivery: review.delivery,
            picture: review.picture, freeText: review.freeText,
            timeStamp: review.timeStamp, avgRate: review.avgRate,
        }
    };
}

function deleteReviewAction(review)
{
    return {
        type: ReviewActionsConstants.DELETE_REVIEW,
        uri: '/api/delete/review',
        payload: {
            review:review
        }
    };
}



let ReviewActions = {
    submitEditReviewAction,
    deleteReviewAction,

};

export default ReviewActions