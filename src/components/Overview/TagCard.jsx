import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '../Avatar';
import { getFileUrl } from '../../utils/upload';
import api from '../../api';
import urls from '../../utils/urls';
import { addTags } from '../../actions/tags';

const TagCard = (props) => {
  const tagTitle = props.tag;

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const getTag = async () => {
    try {
      const tag = await api.getTag(tagTitle);
      props.addTags([tag]);
    } catch (e) {
      console.error(e);
      setLoaded(true);
    }

    setLoading(false);
    setLoaded(true);
  };

  useEffect(() => {
    if (tagTitle) {
      getTag();
    }
  }, [tagTitle]);

  const tag = props.tags.data[tagTitle];
  const tagLink = urls.getTagUrl(tagTitle);

  if (loading) {
    return null;
  }

  if (loaded && !tag) {
    return null;
  }

  return (
    <div className="community-item">
      <div className="community-item__header">
        <div className="community-item__content">
          <div className="community-item__toobar">
            <div className="community-item__main">
              <Link target="_blank" to={tagLink} href={tagLink} className="community-item__title">#{tag.title}</Link>
            </div>
            <div className="community-item__rate">
              {tag.currentRate}°
            </div>
          </div>
        </div>
      </div>

      <div className="community-item__footer">
        {tag.users.data &&
        <div className="community-item__folowers">
          {tag.users.metadata.totalAmount ?
            <div className="community-item__user-avatars">{
              tag.users.data.slice(0, 3)
              .map((item, i) => (
                <div className="community-item__user-avatar" key={i}>
                  <Avatar src={getFileUrl(item.avatarFilename)} size="xmsmall" />
                </div>))}
            </div> : null
          }

          {tag.users.metadata.totalAmount}
          <div className="community-item__caption">
              Followers
          </div>
        </div>}

        <div className="community-item__posts">{tag.posts.metadata.totalAmount}
          <div className="community-item__caption">
            Posts
          </div>
        </div>
      </div>
    </div>
  );
};


export default connect(
  state => ({
    tags: state.tags,
  }),
  dispatch => bindActionCreators({
    addTags,
  }, dispatch),
)(TagCard);
