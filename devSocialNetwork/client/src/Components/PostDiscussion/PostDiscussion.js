import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getSPost } from '../../actions/post';
import { useParams, Link } from 'react-router-dom';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
const PostDiscussion = ({getSPost,post}) => {
    console.log(Object.keys(post)+"  This is post")
    const params= useParams();
    useEffect(() => {
        getSPost(params.id);
    },[getSPost])
    // return 234234
    return <Fragment>
        {/* <Link to='/posts'  className='btn'>Back to Posts</Link> */}
        <PostItem post={post} showActions={false}></PostItem>
        <CommentForm postID={post._id} ></CommentForm>
        <div className="comments">
            {post.comments.map(comment => {
                <CommentItem key={comment._id} comment={comment} postID={post._id}></CommentItem>
            })}
        </div>
    </Fragment>
}

PostDiscussion.propTypes = {

}

const mapStateToProps = state => ({
    post : state.posts.post
})
export default connect (mapStateToProps,{getSPost})(PostDiscussion)
