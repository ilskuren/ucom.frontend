import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Pagination from 'rc-pagination';
// import 'rc-pagination/assets/index.css';
import UserCard from '../components/UserCard';
import LayoutBase from '../components/Layout/LayoutBase';
import api from '../api';
import { getUserUrl, getUserName } from '../utils/user';
import IconTableTriangle from '../components/Icons/TableTriangle';
import { getFileUrl } from '../utils/upload';
import loader from '../utils/loader';

const textItemRender = (current, type, element) => {
  if (type === 'prev') {
    return 'Prev';
  }
  if (type === 'next') {
    return 'Next';
  }
  return element;
};

const UsersPage = (props) => {
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });

  const history = createBrowserHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page') || 1;
  const sortBy = urlParams.get('sortBy') || '-current_rate';
  const perPage = urlParams.get('perPage') || 20;

  const getLink = params => (`/users?page=${params.page || page}&sortBy=${params.sortBy || sortBy}&perPage=${params.perPage || perPage}`);

  const onChangePage = (current) => {
    props.history.push(getLink({ page: current }));
  };

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
    setPaging({ page, perPage, sortBy });
  }, [history.location.search]);


  const {
    data: users,
  } = usersData;
  const { hasMore, totalAmount } = usersData.metadata;
  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <div className="content__title content__title_narrow">
            <h1 className="title">People</h1>
          </div>
          {users && users.length > 0 &&
            <div className="table-content_big-bottom">
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
                        >
                          <Link to={getLink({ sortBy: `${sortBy === `-${item.name}` ? '' : '-'}${item.name}` })}>
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
                          </Link>
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
              <div className="table-content__navbar">
                {hasMore && (
                  <div className="table-content__showmore">
                    <div className="button-clean button-clean_link">
                      <Link to={getLink({ perPage: +perPage + 20 })}>Show More</Link>
                    </div>
                  </div>
                )}
                <Pagination className="table-content__pagination" showTitle={false} total={totalAmount} pageSize={+perPage} itemRender={textItemRender} current={+page} onChange={onChangePage} />

              </div>
            </div>
          }
        </div>
      </div>
    </LayoutBase>
  );
};

export default UsersPage;
