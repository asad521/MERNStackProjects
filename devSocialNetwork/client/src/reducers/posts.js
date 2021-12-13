import {
 GET_POSTS,
 POST_ERROR,
 UPDATE_LIKES,
 ADD_POST,
 GET_SPOST,
 ADD_COMMENT,
 REMOVE_COMMENT
} from '../actions/types';

const initialState = {
    posts: [],
    post : null,
    loading: true,
    error: {}
}

export default function(state = initialState,action) {
    const {type, payload} = action;
    
    // if(payload != null) {
    //     console.log(payload)
    //     console.log(payload.likes +"payload likes")
    // }
   // const save=state.posts.map(post =>post._id === payload.postID ?  console.log('match'): console.log('Not'))
    // console.log(save)
    switch(type)  {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            }
        case GET_SPOST:
            return {
                ...state,
                post: payload,
                loading: false,
            }
        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case UPDATE_LIKES: 
                
            return {
                ...state,

                posts: state.posts.map(post =>post._id === payload.postID ? {...post ,likes:payload.likes}: post) ,
                loading:false,
                            }
        case ADD_REMOVE:
            return {
                ...state,
                post: {...state.post, comments:payload},
                loading:false,
            }
        case REMOVE_REMOVE:
            return {
                ...state,
                post: {...state.post, comments:state.post.comments.filter(comment => comment._id!==paylaod)},
                loading:false,

            }
        default:
            return state;
    }
}