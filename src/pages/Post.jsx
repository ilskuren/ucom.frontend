import React, { PureComponent } from 'react';
import cn from 'classnames';
import api from '../api/Api';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';
import PostHeader from '../components/PostHeader';
import EventTitle from '../components/EventTitle';
import PostContent from '../components/PostContent';
import Footer from '../components/Footer';

class Offer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    api.getPost(this.props.match.params.id)
      .then((post) => {
        this.setState({ post });
      });
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
    return (
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  userId={this.state.post.User && this.state.post.User.id}
                  userAccountName={this.state.post.User && this.state.post.User.account_name}
                  userUrl={getUserUrl(this.state.post.User && this.state.post.User.id)}
                  avatar={getFileUrl(this.state.post.User && this.state.post.User.avatar_filename)}
                  name={getUserName(this.state.post.User)}
                  rating={this.state.post.User && this.state.post.User.current_rate}
                  follow={this.state.post.User && this.state.post.User.myselfData && this.state.post.User.myselfData.follow}
                />
              </div>
            </div>

            {this.state.post.post_type_id === 2 && (
              <EventTitle
                big
                id={this.state.post.id}
                userId={this.state.post.User && this.state.post.User.id}
                imgSrc={getFileUrl(this.state.post.main_image_filename)}
                tags={['sell']}
                rate={+this.state.post.current_rate}
                title={this.state.post.title}
                actionButtonTitle={this.state.post.action_button_title}
                actionDurationInDays={this.state.post.action_duration_in_days}
                actionButtonUrl={this.state.post.action_button_url}
                createdAt={this.state.post.created_at}
                join={this.state.post.myselfData && this.state.post.myselfData.join}
                team={this.state.post.post_users_team && this.state.post.post_users_team.map(item => ({
                  id: item.id,
                  avatarUrl: getFileUrl(item.avatar_filename),
                  accountName: item.account_name,
                  rate: +item.current_rate,
                  profileLink: getUserUrl(item.id),
                  userName: getUserName(item),
                }))}
              />
            )}

            <div
              className={cn(
                'sheets__content',
                'sheets__content_posts',
                { 'sheets__content_no-radius': this.state.post.post_type_id === 2 },
              )}
            >
              <PostContent
                id={this.state.post.id}
                userId={this.state.post.User && this.state.post.User.id}
                title={this.state.post.post_type_id === 1 ? this.state.post.title : null}
                leadingText={this.state.post.leading_text}
                description={this.state.post.description}
                imgSrc={this.state.post.post_type_id === 1 ? getFileUrl(this.state.post.main_image_filename) : null}
                rating={this.state.post.current_vote}
                rate={+this.state.post.current_rate}
                tags={['story']}
                сhoice={this.state.post.myselfData && this.state.post.myselfData.myselfVote}
                comments={this.state.post.comments}
                onSubmitComment={(data, commentId) => this.createComment(data, commentId)}
              />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Offer;
