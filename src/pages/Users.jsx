import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import UserCard from '../components/UserCard';
import LayoutBase from '../components/Layout/LayoutBase';
import api from '../api';
import { getUserUrl, getUserName } from '../utils/user';
import IconTableTriangle from '../components/Icons/TableTriangle';
import SearchInput from '../components/SearchInput';
import { getFileUrl } from '../utils/upload';
import loader from '../utils/loader';
import urls from '../utils/urls';

const { getPagingLink } = urls;

const textItemRender = (current, type, element) => {
  if (type === 'prev') {
    return <a>Prev</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return element;
};

const UsersPage = (props) => {
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });
  const [search, setSearch] = useState('');
  const urlParams = new URLSearchParams(props.location.search);
  const page = urlParams.get('page') || 1;
  const sortBy = urlParams.get('sortBy') || '-current_rate';
  const perPage = urlParams.get('perPage') || 20;

  const onChangePage = (current) => {
    props.history.push(getPagingLink({ page: current, sortBy, perPage }));
    window.scrollTo(0, 'top');
  };

  const getData = async (params) => {
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
    // getData({ page, perPage, sortBy, query });
  }, [search]);

  useEffect(() => {
    getData({ page, perPage, sortBy });
  }, [props.location.search]);

  const { data: users } = usersData;
  const { hasMore, totalAmount } = usersData.metadata;

  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <div className="content__title content__title_narrow content__title_searched">
            <h1 className="title">People</h1>
            <SearchInput {...{ setSearch, search }} />
          </div>
          {users && users.length > 0 &&
            <div className="table-content table-content_big-bottom">
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
                          <Link to={getPagingLink({ sortBy: `${sortBy === `-${item.name}` ? '' : '-'}${item.name}`, page, perPage })}>
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
                      <Link to={getPagingLink({ perPage: +perPage + 20, page, sortBy })}>Show More</Link>
                    </div>
                  </div>
                )}
                <Pagination
                  className="table-content__pagination"
                  showTitle={false}
                  total={totalAmount}
                  pageSize={+perPage}
                  itemRender={textItemRender}
                  current={+page}
                  onChange={onChangePage}
                />
              </div>
            </div>
          }
        </div>
      </div>
    </LayoutBase>
  );
};

export default UsersPage;
