import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect, connent} from 'react-redux';
import {Link} from 'react-router-dom'; 
import { RemoveComment } from '../../actions/post';
const CommentItem = ({RemoveComment,postID,auth,comment:{_id,text,name,avatar,user,date}}) => {
    return (
        <Fragment>
          <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                <Moment formate='DD/MM/YYYY'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <Button className='btn btn-danger' onClick={e =>RemoveComment(postID,_id)}>
                Delete Comment</Button>
            )}
          </div>
        </div>  
        </Fragment>
    )
}

CommentItem.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps,{RemoveComment})(CommentItem)
