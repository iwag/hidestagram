import React, {Component} from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { incrementLike } from '../actions/actionCreators';


class Photo extends Component {
  _incrementLike(v) {
    const { id, i, likes } = this.props;
   return this.props.dispatch(incrementLike(id, i, likes));
  }

  render() {
    const { post, i, comments } = this.props;
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/view/${post.code}`}>
            <img src={post.display_src} alt={post.caption} className="grid-photo" />
          </Link>

          <CSSTransitionGroup transitionName="like"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

          <figcaption>
            <p>{post.caption}</p>
            <div className="control-buttons">
              <button onClick={this._incrementLike.bind(this)} className="likes">&hearts; {post.likes}</button>
              <Link className="button" to={`/view/${post.code}`}>
                <span className="comment-count">
                <span className="speech-bubble"></span>
                  {comments[post.code] ? comments[post.code].length : 0}
                </span>
              </Link>
            </div>
          </figcaption>

        </div>
      </figure>
    )
  }
}

export default Photo;
