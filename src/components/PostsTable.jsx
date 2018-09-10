import PropTypes from 'prop-types';
import humps from 'lodash-humps';
import React, { PureComponent } from 'react';
import UserCard from '../components/UserCard';
import IconTableTriangle from '../components/Icons/TableTriangle';
import { getFileUrl } from '../utils/upload';
import { getPostUrl, getPostTypeById } from '../utils/posts';
import { getPosts } from '../api';

class PostsTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      hasMore: true,
    };

    this.params = {
      page: 1,
      post_type_id: this.props.postTypeId,
    };
  }

  componentDidMount() {
    this.loadMore(this.params);
  }

  loadMore(params) {
    return getPosts(params)
      .then(humps)
      .then((data) => {
        this.setState(prevState => ({
          posts: prevState.posts.concat(data.data),
          hasMore: data.metadata.hasMore,
        }));
      });
  }

  showMore() {
    const params = Object.assign({}, this.params, {
      page: this.params.page + 1,
    });

    this.loadMore(params)
      .then(() => {
        this.params = params;
      });
  }

  render() {
    return (
      <div className="table-content">
        <div className="table-content__table">
          <table className="list-table list-table_evetns list-table_responsive">
            <thead className="list-table__head">
              <tr className="list-table__row">
                <td className="list-table__cell list-table__cell_sortable">
                  <div className="inline inline_small">
                    <div className="inline__item">
                      Name
                    </div>
                    <div className="inline__item">
                      <IconTableTriangle />
                    </div>
                  </div>
                </td>
                <td className="list-table__cell">Views</td>
                <td className="list-table__cell">Comments</td>
                <td className="list-table__cell">Rate</td>
              </tr>
            </thead>
            <tbody className="list-table__body">
              {this.state.posts.map(item => (
                <tr className="list-table__row" key={item.id}>
                  <td className="list-table__cell list-table__cell_name" data-title="Name">
                    <UserCard
                      squareAvatar
                      profileLink={getPostUrl(item.id)}
                      avatarUrl={getFileUrl(item.mainImageFilename)}
                      userName={item.title}
                      accountName={getPostTypeById(item.postTypeId)}
                      sign="#"
                    />
                  </td>
                  <td className="list-table__cell" data-title="Views">
                    —
                  </td>
                  <td className="list-table__cell" data-title="Comments">123212</td>
                  <td className="list-table__cell" data-title="Rate">
                    <span className="title title_xsmall title_light">{item.currentRate}°</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.state.hasMore && (
          <div className="table-content__showmore">
            <button
              className="button-clean button-clean_link"
              onClick={() => this.showMore()}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    );
  }
}

PostsTable.propTypes = {
  postTypeId: PropTypes.number,
};

export default PostsTable;
