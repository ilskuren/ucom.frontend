import React, { PureComponent } from 'react';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';
import LayoutBase from '../components/Layout/LayoutBase';
import api from '../api';
import { getUserUrl, getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';

class EventsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    api.getUsers()
      .then((users) => {
        this.setState({ users });
      });
  }

  render() {
    return (
      <LayoutBase>
        <div className="content">
          <div className="content__inner">
            <div className="content__title content__title_narrow">
              <h1 className="title">People</h1>
            </div>

            <div className="table-content">
              <div className="table-content__table">
                <table className="list-table list-table_indexed list-table_users list-table_responsive">
                  <thead className="list-table__head">
                    <tr className="list-table__row">
                      <td className="list-table__cell list-table__cell_index">#</td>
                      <td className="list-table__cell list-table__cell_name">Name</td>
                      <td className="list-table__cell">Views</td>
                      <td className="list-table__cell">Comments</td>
                      <td className="list-table__cell">Rate</td>
                    </tr>
                  </thead>
                  <tbody className="list-table__body">
                    {this.state.users.map((item, index) => (
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
                        <td className="list-table__cell" data-title="Views">{item.views || '—'}</td>
                        <td className="list-table__cell" data-title="Comments">{item.commentsCount || '—'}</td>
                        <td className="list-table__cell" data-title="Rate">
                          <span className="title title_xsmall title_light">{(+item.currentRate).toLocaleString()}°</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default EventsPage;
