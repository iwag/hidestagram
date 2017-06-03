import React, { Component } from 'react';
import { connect } from 'react-redux'
import Photo from './Photo';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure, fetchPostsIfNeeded } from '../actions/posts';

class PhotoGrid extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded('id'));
  }

  render() {
    return (
      <div className="photo-grid">
        {this.props.posts.posts.map((post, i) => <Photo {...this.props} key={i} i={i} post={post} />)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    posts: posts
  } = {
    isFetching: true,
    lastUpdated: null,
    posts:  state.posts || []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(PhotoGrid)
