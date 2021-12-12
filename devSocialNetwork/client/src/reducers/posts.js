import {
 GET_POSTS,
 POST_ERROR,
 UPDATE_LIKES
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
        default:
            return state;
    }
}