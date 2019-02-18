import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) =>{
    await dispatch(fetchPosts());
    const userIds=_.uniq(_.map(getState().posts, 'userId'));//use lodash to extract unique user id
    userIds.forEach(id=>dispatch(fetchUser(id)));
}

export const fetchPosts = () =>{
    return async dispatch =>{
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    })
    }
}



export const fetchUser = (id) =>async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:'FETCH_USER', payload:response.data})
}