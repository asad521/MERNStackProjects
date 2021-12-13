import React,{useState,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { AddComment } from '../../actions/post';
const CommentForm = ({postID,AddComment}) => {
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
              AddComment(postID,{text});
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
    )
}

CommentForm.propTypes = {

}

export default connect(null,{AddComment})(CommentForm)
