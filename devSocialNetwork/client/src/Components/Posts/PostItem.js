import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { updateLikes } from "../../actions/post";
import { updateUnlikes } from "../../actions/post";

const PostItem = ({ auth, post, updateUnlikes, updateLikes, showActions }) => {
  console.log(Object.keys(post) +" This is post in postITEM ")
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <p class="my-1">{post.text}</p>
        <p class="post-date">
          <Moment fomate="DD/MM/YYYY ">{post.date}</Moment>
        </p>
        
        {showActions && (
          <Fragment>
            <button
          type="button"
          class="btn btn-light"
          onClick={(e) => updateLikes(post._id)}
        >
          <i class="fas fa-thumbs-up"></i>
          <span>
            {post.likes === null || typeof post.likes ==='undefined' ? "No Likes" : post.likes.length}
          </span>
        </button>
            {" "}
            <button
              type="button"
              class="btn btn-light"
              onClick={(e) => updateUnlikes(post._id)}
            >
              <i class="fas fa-thumbs-down">Dislikes</i>
            </button>
            <Link to={`/posts/${post._id}`} class="btn btn-primary">
              Discussion{" "}
              <span class="comment-count">
                {post.comments.length === 0
                  ? "No Comment"
                  : post.comments.length}
              </span>
            </Link>
            {console.log(post.user + "tHIS IS POST.USER")}
            {console.log(auth.user + "tHIS IS auth.USER")}
            {!auth.loading && post.user === auth.user && (
              <button type="button" class="btn btn-danger">
                <i class="fas fa-times">Delete Post</i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { updateLikes, updateUnlikes })(
  PostItem
);
