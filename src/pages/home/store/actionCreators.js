import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
})


export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('http://localhost:5000/home.json').then((res) => {
            const result = res.data.data;
            const action = changeHomeData(result)
            dispatch(action);
        })
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})
