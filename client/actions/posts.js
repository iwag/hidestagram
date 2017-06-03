import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

function requestPosts(subpost) {
  return {
    type: REQUEST_POSTS,
    subpost
  }
}

function receivePosts(subpost, json) {
  return {
    type: RECEIVE_POSTS,
    subpost,
    posts: json, //.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subpost) {
  return dispatch => {
    dispatch(requestPosts(subpost))
    return fetch(`http://localhost:8080/v1/words.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subpost, json)))
  }
}

export function fetchPostsIfNeeded(subpost) {
      return (dispatch, getState) => {dispatch(fetchPosts(subpost))}
}

