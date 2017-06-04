import fetch from 'isomorphic-fetch'

//increment

export const REQUEST_LIKES = 'REQUEST_LIKES';
export const INCREMENT_LIKES= 'INCREMENT_LIKES';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

function requestLikes(id, index) {
  return {
    type: REQUEST_LIKES,
    index,
    id
  }
}

function receiveLikes(id, index, json) {
  return {
    type: INCREMENT_LIKES,
    index,
    id,
    likes: json.likes,
    posts: json,
    receivedAt: Date.now()
  }
}

function fetchLikes(id, index, likes) {
  return dispatch => {
    var body = {
      likes: likes +1
    };
    dispatch(requestLikes(id, index))
    return fetch(`http://localhost:8080/v1/post/${id}/edit.json`, {
     method:"POST",
     headers: {
       'Accpet': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
	}).then(response => response.json())
    .then(json => dispatch(receiveLikes(id, index, json)))
  }
}

export function incrementLike(id, index, likes) {
  return (dispatch, getState) => {dispatch(fetchLikes(id, index,likes))}
}

// add commnet
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}

//remove comment
export function removeComment(postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}
