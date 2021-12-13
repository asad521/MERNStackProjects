import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm';

const Post = ({getPosts,posts:{loading,post,posts}}) => {
    console.log(posts)
    useEffect(() => {
        getPosts();
    },[getPosts])
    return (
        loading ? 'spinner' : (<Fragment>
                <h1 className='large text-primary'>Posts</h1>
                <p className='lead'>Welcome to the Community</p>
                <PostForm ></PostForm>

            <div className='posts'>
                {posts.map(post=>
                
                    <PostItem post={post}></PostItem>
                )}
            </div>
        </Fragment>)

    )
}

Post.propTypes = {

}

const mapStateToProps = state => ({
    posts : state.posts //this is posts state.reducer file.
})

export default connect(mapStateToProps,{getPosts})(Post)
