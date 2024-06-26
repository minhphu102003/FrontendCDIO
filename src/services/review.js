import * as request from '../ultils/request'
import {getHasBody} from "../ultils/request";

const POST_FEEDBACK_ENDPOINT = "/api/feedback/create-feedback"

export const createFeedback = async (receiverId, accessToken, rate, comment) => {
    try {
        return await request.post(POST_FEEDBACK_ENDPOINT,
            {
                rate,
                comment
            },
            {
                params: {receiverId},
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${accessToken}`
                },
                withCredentials: true
            }
        );

    } catch (error) {
        return error
    }
};


const PUT_FEEDBACK_ENDPOINT = "/api/feedback/update-feedback"

export const updateFeedback = async (receiverId, accessToken, rate, comment) => {
    try {
        return await request.put(PUT_FEEDBACK_ENDPOINT,
            {
                rate,
                comment
            },
            {
                params: {receiverId},
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${accessToken}`
                },
                withCredentials: true
            }
        );
    } catch (error) {
        return error
    }
};

const DELETE_FEEDBACK_ENDPOINT = "/api/feedback/delete-feedback"

export const deleteFeedback = async (feedbackId, accessToken) => {
    try {
        return await request.deleteRe(DELETE_FEEDBACK_ENDPOINT,
            {
                params: {feedbackId},
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${accessToken}`
                },
                withCredentials: true
            }
        );
    } catch (error) {
        return error
    }
};


const GET_FEEDBACK_ENDPOINT = "/api/medicine/list-medicine"

export const getListFeedback = async (paramsObject) => {
    try {
        return await request.get(GET_FEEDBACK_ENDPOINT, {
            params: paramsObject
        });
    } catch (error) {
        return error
    }
};


const CHECK_FEEDBACK_ENDPOINT = "/api/feedback/check-feedback"

export const checkFeedback = async (ownerId, accessToken) => {
    try {
        return await request.get(CHECK_FEEDBACK_ENDPOINT, {
            params: {ownerId},
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            withCredentials: true
        });
    } catch (error) {
        return error
    }
};


