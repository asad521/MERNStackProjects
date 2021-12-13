import React, { useState,Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddPost } from "../../actions/post";

const PostForm = ({AddPost}) => {
  const [text, setText] = useState("");
  return (
    <Fragment>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            console.log('clicked')
            AddPost({text});
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            onChange={e=>setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {};

export default connect(null, { AddPost })(PostForm);
