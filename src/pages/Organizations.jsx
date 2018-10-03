import React, { PureComponent } from 'react';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';
import api from '../api';
import { getOrganizationUrl } from '../utils/organization';
import { getFileUrl } from '../utils/upload';

class EventsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      organizations: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    api.getOrganizations()
      .then((data) => {
        this.setState({ organizations: data.data });
      });
  }

  render() {
    return (
      <div className="content">
        <div className="content__inner">
          <div className="content__title content__title_narrow">
            <h1 className="title">Organizations</h1>
          </div>

          <div className="table-content">
            <div className="table-content__table">
              <table className="list-table list-table_indexed list-table_organizations list-table_responsive">
                <thead className="list-table__head">
                  <tr className="list-table__row">
                    <td className="list-table__cell list-table__cell_index">#</td>
                    <td className="list-table__cell list-table__cell_name">Name</td>
                    <td className="list-table__cell">Rate</td>
                  </tr>
                </thead>
                <tbody className="list-table__body">
                  {this.state.organizations.map((item, index) => (
                    <tr className="list-table__row" key={item.id}>
                      <td className="list-table__cell list-table__cell_index">{index + 1}</td>
                      <td className="list-table__cell list-table__cell_name" data-title="Name">
                        <UserCard
                          profileLink={getOrganizationUrl(item.id)}
                          avatarUrl={getFileUrl(item.avatarFilename)}
                          userName={item.title}
                          accountName={item.nickname}
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
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default EventsPage;
