import React, { PureComponent } from 'react';
import classNames from 'classnames';
import UserCard from '../components/UserCard';
import LayoutBase from '../components/Layout/LayoutBase';
import api from '../api';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';
import IconTableTriangle from '../components/Icons/TableTriangle';
import { getFileUrl } from '../utils/upload';
import loader from '../utils/loader';

class EventsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      hasMore: true,
      sortBy: '-current_rate',
      users: [],
    };
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const params = {
      page: this.state.page + 1,
      sort_by: this.state.sortBy,
      per_page: 20,
    };

    loader.start();

    try {
      const data = await api.getUsers(params);
      this.setState(prevState => ({
        users: [...prevState.users, ...data],
        page: params.page,
      }));
    } catch (e) {
      console.error(e);
    }

    loader.done();
  }

  changeSort = async (sortBy) => {
    const params = {
      page: 1,
      sort_by: sortBy,
      per_page: 20,
    };

    loader.start();

    try {
      const data = await api.getUsers(params);
      this.setState({
        users: data,
        sortBy,
        page: 1,
      });
    } catch (e) {
      console.error(e);
    }

    loader.done();
  }

  render() {
    return (
      <LayoutBase>
        <div className="content">
          <div className="content__inner">
            <div className="content__title content__title_narrow">
              <h1 className="title">People</h1>
            </div>

            {this.state.users && this.state.users.length > 0 &&
              <div className="table-content">
                <div className="table-content__table">
                  <table className="list-table list-table_indexed list-table_users list-table_responsive">
                    <thead className="list-table__head">
                      <tr className="list-table__row">
                        <td className="list-table__cell list-table__cell_index">#</td>
                        {[{
                          title: 'Name',
                          name: 'account_name',
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
                            onClick={() => this.changeSort(`${this.state.sortBy === `-${item.name}` ? '' : '-'}${item.name}`)}
                          >
                            <div className="list-table__title">
                              {item.title}

                              {this.state.sortBy === `-${item.name}` && (
                                <div className="list-table__sort-icon">
                                  <IconTableTriangle />
                                </div>
                              )}

                              {this.state.sortBy === `${item.name}` && (
                                <div className="list-table__sort-icon list-table__sort-icon_flip">
                                  <IconTableTriangle />
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="list-table__body">
                      {this.state.users.map((item, index) => (
                        <tr className="list-table__row" key={item.id}>
                          <td className="list-table__cell list-table__cell_index">{index + 1}</td>
                          <td className="list-table__cell list-table__cell_name" data-title="Name">
                            <UserCard
                              profileLink={urls.getUserUrl(item.id)}
                              avatarUrl={getFileUrl(item.avatarFilename)}
                              userName={getUserName(item)}
                              accountName={item.accountName}
                              sign="@"
                            />
                          </td>
                          <td className="list-table__cell" data-title="Rate">
                            <span className="title title_xsmall title_light">{(+item.currentRate).toLocaleString()}°</span>
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
            }
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default EventsPage;
