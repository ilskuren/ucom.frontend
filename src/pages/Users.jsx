import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UserCard from '../components/UserCard';
import LayoutBase from '../components/Layout/LayoutBase';
import api from '../api';
import { getUserUrl, getUserName } from '../utils/user';
import IconTableTriangle from '../components/Icons/TableTriangle';
import { getFileUrl } from '../utils/upload';
import loader from '../utils/loader';

const UsersPage = () => {
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });

  const history = createBrowserHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page') || 1;
  const sortBy = urlParams.get('sortBy') || '-current_rate';
  const perPage = urlParams.get('perPage') || 20;
  const setPaging = async (params) => {
    loader.start();

    try {
      const data = await api.getUsers(params);
      setUsersData(data);
    } catch (e) {
      console.error(e);
    }

    loader.done();
  };

  useEffect(() => {
    console.log(history);
    setPaging({ page, perPage, sortBy });
  }, [history.location.search]);


  const {
    data: users,
  } = usersData;
  const { hasMore } = usersData.metadata;
  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <div className="content__title content__title_narrow">
            <h1 className="title">People</h1>
          </div>
          {// users && users.length > 0 &&
          1 &&
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
                          onClick={() => this.setPaging({ sortBy: `${sortBy === `-${item.name}` ? '' : '-'}${item.name}` })}
                        >
                          <div className="list-table__title">
                            {item.title}

                            {sortBy === `-${item.name}` && (
                              <div className="list-table__sort-icon">
                                <IconTableTriangle />
                              </div>
                            )}

                            {sortBy === `${item.name}` && (
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
                    {users.map((item, index) => (
                      <tr className="list-table__row" key={item.id}>
                        <td className="list-table__cell list-table__cell_index">{index + 1}</td>
                        <td className="list-table__cell list-table__cell_name" data-title="Name">
                          <UserCard
                            profileLink={getUserUrl(item.id)}
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
              {(+page - 1) ?
                <div className="table-content__showmore">
                  <Link className="auth__link" to={`/users?page=${+page - 1}`}>Prev</Link>
                </div> : null
              }

              {hasMore &&
                <div className="table-content__showmore">
                  <Link className="auth__link" to={`/users?page=${+page + 1}`}>Next</Link>
                </div>
              }

              {hasMore && (
                <div className="table-content__showmore">
                  <button
                    className="button-clean button-clean_link"
                    onClick={() => this.setPaging({ perPage: perPage + 20 })}
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
};

export default UsersPage;
