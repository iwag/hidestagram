import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/posts';

function posts(state=[], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
      console.log("increment likes");
      const i = action.index;
      return Object.assign({}, state, {
        posts: [...state.posts.slice(0, i),
        {...state.posts[i], likes: state.posts[i].likes + 1},
        ...state.posts.slice(i + 1)]

      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      posts: action.posts,
      lastUpdated: action.receivedAt
    });
    default:
      return state;
  }
  return state;
}

export default posts;
