import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, GET_SPOST } from "./types";
import { useNavigate } from "react-router";

export const getPosts = () => async (dispatch) => {
  console.log("This is get post action");

  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    console.log("This is getPost actions after dispatch");
  } catch (err) {
    console.log("This is getPost actions error");

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err.response.status);
    console.log(err.response.statusText);
    console.log(err.response);
    dispatch(
      setAlert(err.response.statusText + " " + err.response.status, "danger")
    );
  }
};

//get single post
export const getSPost = (id) => async (dispatch) => {
  console.log("This is get Single post action");
  console.log(id +" This is id ")
  try {
    const res = await axios.get(`/api/posts/${id}`);
    console.log(Object.keys(res.data) +"This is response")
    dispatch({
      type: GET_SPOST,
      payload: res.data,
    });
    console.log("This is receveid data succesffuly");

  } catch (err) {
    console.log("This is getPost Single actions error");
    dispatch({
      type: POST_ERROR,
      payload: { msg: err },
    });
 
  }
};
//Add like
export const updateLikes = (postID) => async (dispatch) => {
  console.log("This is updateLikes action");
  try {
    const res = await axios.put(`api/posts/likes/${postID}`);
    console.log(res.data + " response of addlike");
    // dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));
    console.log(Object.values(res.data)[0].user);
    console.log(Object.values(res.data)[0]._id);
    console.log(postID + "Post id ");
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    console.log("error of like");
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
    console.log(res.data + " response of dislike");
    // console.log(Object.values(res.data))
    // console.log(Object.values(res.data)[0].user)
    // console.log(Object.values(res.data)[0]._id)
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    console.log("error of dislike");
    dispatch({
      type: POST_ERROR,
      payload: { err },
    });
  }
};

//Add Post

export const AddPost = (formData) => async (dispatch) => {
  console.log("This is add post action");
  console.log(formData+"This is ofrm Data")
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log("error of add post");
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Add Comment
export const AddComment = ({formData,postID}) => async (dispatch) => {
  console.log("This is add comment action");
  console.log(formData+"This is form Data")
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts/comment/${postID}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log("error of  add comment");
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Delete Comment
export const RemoveComment = ({commentID,postID}) => async (dispatch) => {
  console.log("This is remove comment action");
  
  };
  try {
    const res = await axios.post(`/api/posts/comment/${postID}/${commentID}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
  } catch (err) {
    console.log("error of  remove comment");
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};