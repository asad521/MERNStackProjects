import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS,POST_ERROR, UPDATE_LIKES } from "./types";
import { useNavigate } from 'react-router';


export const getPosts = () => async (dispatch) => {

    console.log('This is get post action')

  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    console.log('This is getPost actions after dispatch');

  } catch (err) {
    console.log('This is getPost actions error');
    
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err.response.status)
    console.log(err.response.statusText)
    console.log(err.response)
    dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));

  }
};
//Add like
export const updateLikes = (postID) => async (dispatch) => {
    console.log('This is updateLikes action')
try {
  const res = await axios.put(`api/posts/likes/${postID}`);
  console.log(res.data +' response of addlike')
  // dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));
      console.log(Object.values(res.data)[0].user)
    console.log(Object.values(res.data)[0]._id)
    console.log(postID +"Post id ")
  dispatch({
    type: UPDATE_LIKES,
    payload: {postID, likes:  res.data},
  });

} catch (err) {
  console.log('error of like')
  dispatch({
    type: POST_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status },
  });
}
};

//Add Unlike
export const updateUnlikes = (postID) => async (dispatch) => {

  try {
    const res = await axios.put(`api/posts/unlikes/${postID}`);
    console.log(res.data+' response of dislike')
    // console.log(Object.values(res.data))
    // console.log(Object.values(res.data)[0].user)
    // console.log(Object.values(res.data)[0]._id)
    dispatch({
      type: UPDATE_LIKES,
      payload: {postID, likes: res.data},
    });
  
  } catch (err) {
    console.log('error of dislike')
    dispatch({
      type: POST_ERROR,
      payload: { err },
    });
  
  }
  };