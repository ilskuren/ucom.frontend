import classNames from 'classnames';
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
      page: 0,
      hasMore: true,
      sortBy: '-current_rate',
      posts: [],
    };
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore() {
    const params = {
      page: this.state.page + 1,
      post_type_id: this.props.postTypeId,
      sort_by: this.state.sortBy,
    };

    getPosts(params)
      .then(humps)
      .then((data) => {
        this.setState(prevState => ({
          posts: prevState.posts.concat(data.data),
          hasMore: data.metadata.hasMore,
          page: params.page,
        }));
      });
  }

  changeSort(sortBy) {
    const params = {
      page: 1,
      post_type_id: this.props.postTypeId,
      sort_by: sortBy,
    };

    getPosts(params)
      .then(humps)
      .then((data) => {
        this.setState({
          posts: data.data,
          hasMore: data.metadata.hasMore,
          sortBy,
          page: 1,
        });
      });
  }

  render() {
    return (
      <div className="table-content">
        <div className="table-content__table">
          <table className="list-table list-table_evetns list-table_responsive">
            <thead className="list-table__head">
              <tr className="list-table__row">
                {[{
                  title: 'Name',
                  name: 'title',
                  sortable: true,
                }, {
                  title: 'Views',
                  name: 'views_count',
                  sortable: false,
                }, {
                  title: 'Comments',
                  name: 'comments_count',
                  sortable: true,
                }, {
                  title: 'Rate',
                  name: 'current_rate',
                  sortable: true,
                }].map(item => (
                  <td
                    key={item.name}
                    role="presentation"
                    className={classNames(
                      'list-table__cell',
                      { 'list-table__cell_sortable': item.sortable },
                    )}
                    onClick={() => this.changeSort(`${this.state.sortBy === `-${item.name}` ? '+' : '-'}${item.name}`)}
                  >
                    <div className="inline inline_small">
                      <div className="inline__item">{item.title}</div>

                      {this.state.sortBy === `-${item.name}` && (
                        <div className="inline__item">
                          <div className="list-table__sort-icon">
                            <IconTableTriangle />
                          </div>
                        </div>
                      )}

                      {this.state.sortBy === `+${item.name}` && (
                        <div className="inline__item">
                          <div className="list-table__sort-icon list-table__sort-icon_flip">
                            <IconTableTriangle />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                ))}
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
                  <td className="list-table__cell" data-title="Views">{(item.postStats && item.postStats.viewsCount) || '—'}</td>
                  <td className="list-table__cell" data-title="Comments">{(item.postStats && item.postStats.commentsCount) || '—'}</td>
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
              onClick={() => this.loadMore()}
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
