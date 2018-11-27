import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../api';
import PostHeader from '../components/Post/PostHeader';
import PostContent from '../components/Post/PostContent';
import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';
import { fetchPost } from '../actions/posts';
import { selectUser } from '../store/selectors';

class Offer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.getData(nextProps.match.params.id);
    }
  }

  getData(postId) {
    api.getPost(postId)
      .then((data) => {
        this.setState({ post: data });
      });

    this.props.fetchPost(postId);
  }

  createComment(commentData, commentId) {
    return api.createComment(commentData, this.props.match.params.id, commentId)
      .then((data) => {
        if (data.errors) {
          return;
        }

        const post = Object.assign({}, this.state.post, {
          comments: [{ ...data, ...commentData }].concat(this.state.post.comments),
        });

        this.setState({ post });
      });
  }

  render() {
    const { post } = this.state;

    return (
      <LayoutBase>
        <div className="content">
          <div className="content__inner">
            <div className="sheets">
              <div className="sheets__list">
                <div className="sheets__item">
                  <PostHeader userId={post.User && post.User.id} />
                </div>
              </div>

              <div
                className={cn(
                  'sheets__content',
                  'sheets__content_posts',
                  { 'sheets__content_no-radius': this.state.post.post_type_id === 2 },
                )}
              >
                <PostContent postId={post && post.id} />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </LayoutBase>
    );
  }
}

Offer.propTypes = {
  fetchPost: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchPost,
  }, dispatch),
)(Offer);
