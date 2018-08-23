import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import DropZone from '../../components/DropZone';
import DateInput from '../../components/DateInput';
import Loading from '../../components/Loading';
import { setUser } from '../../actions';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';

class ProfileWorkAndEducationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      first_currency: this.props.user.first_currency || '',
      first_currency_year: this.props.user.first_currency_year || '',
      users_jobs: this.props.user.users_jobs || [],
      users_education: this.props.user.users_education || [],
      loading: false,
    };

    console.log(this.props.user);
  }

  componentDidMount() {
    if (this.state.users_jobs.length === 0) {
      this.addEmptyJobItem();
    }

    if (this.state.users_education.length === 0) {
      this.addEmptyEducationItem();
    }
  }

  save() {
    const token = getToken();

    const data = {
      first_currency: this.state.first_currency,
      first_currency_year: this.state.first_currency_year,
      users_jobs: this.state.users_jobs,
      users_education: this.state.users_education,
    };

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
  }

  addEmptyEducationItem() {
    this.setState(prevState => ({
      users_education: prevState.users_education.concat({
        end_date: null,
        start_date: null,
        is_current: false,
        degree: '',
        speciality: '',
        title: '',
      }),
    }));
  }

  changeEducationItem(index, data) {
    this.setState((prevState) => {
      const { users_education } = prevState;

      users_education[index] = Object.assign({}, prevState.users_education[index], data);

      return {
        users_education: [].concat(users_education),
      };
    });
  }

  removeEducationItem(index) {
    this.setState((prevState) => {
      const { users_education } = prevState;

      users_education.splice(index, 1);

      return {
        users_education: [].concat(users_education),
      };
    }, () => {
      if (this.state.users_education.length === 0) {
        this.addEmptyEducationItem();
      }
    });
  }

  addEmptyJobItem() {
    this.setState(prevState => ({
      users_jobs: prevState.users_jobs.concat({
        end_date: null,
        start_date: null,
        is_current: false,
        title: '',
        position: '',
      }),
    }));
  }

  changeJobItem(index, data) {
    this.setState((prevState) => {
      const { users_jobs } = prevState;

      users_jobs[index] = Object.assign({}, prevState.users_jobs[index], data);

      return {
        users_jobs: [].concat(users_jobs),
      };
    });
  }

  removeJobItem(index) {
    this.setState((prevState) => {
      const { users_jobs } = prevState;

      users_jobs.splice(index, 1);

      return {
        users_jobs: [].concat(users_jobs),
      };
    }, () => {
      if (this.state.users_jobs.length === 0) {
        this.addEmptyJobItem();
      }
    });
  }

  render() {
    return (

      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[{ type: 'blockchain', percents: '0' }, { type: 'work', percents: '0' }, { type: 'education', percents: '0' }]}
          />
        </div>
        <div className="grid__item">
          <form
            className="person-form"
            onSubmit={(e) => {
              e.preventDefault();
              this.save();
            }}
          >
            <Loading loading={this.state.loading} className="loading_block" />

            <div className="profile__info-block">
              <InfoBlock title="Blockchain">
                <div className="profile__block">
                  <TextInput
                    label="Your first asset"
                    placeholder="Example Kickcoin"
                    value={this.state.first_currency}
                    onChange={first_currency => this.setState({ first_currency })}
                  />
                </div>

                <div className="profile__block">
                  <TextInput
                    label="Year of purchase"
                    inputWidth={100}
                    value={this.state.first_currency_year}
                    onChange={first_currency_year => this.setState({ first_currency_year })}
                  />
                </div>
              </InfoBlock>
            </div>

            <div className="profile__info-block">
              <InfoBlock title="Work">
                <div className="list">
                  {this.state.users_jobs.map((item, index) => (
                    <div className="list__item" key={index}>
                      <div className="profile__block">
                        <TextInput
                          label="Work place"
                          value={item.title}
                          onChange={(title) => { this.changeJobItem(index, { title }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Position"
                          value={item.position}
                          onChange={(position) => { this.changeJobItem(index, { position }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Started date"
                          value={item.start_date}
                          onChange={(start_date) => { this.changeJobItem(index, { start_date }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={item.end_date}
                          onChange={(end_date) => { this.changeJobItem(index, { end_date }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <button
                          type="button"
                          className="button button_theme_transparent button_size_small"
                          onClick={() => this.removeJobItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="profile__block">
                    <button
                      type="button"
                      className="button button_theme_transparent button_size_small"
                      onClick={() => this.addEmptyJobItem()}
                    >
                      Add another
                    </button>
                  </div>
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Education">
                <div className="list">
                  {this.state.users_education.map((item, index) => (
                    <div className="list__item" key={index}>
                      <div className="profile__block">
                        <TextInput
                          label="Education"
                          value={item.title}
                          onChange={(title) => { this.changeEducationItem(index, { title }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Spec"
                          value={item.speciality}
                          onChange={(speciality) => { this.changeEducationItem(index, { speciality }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Level"
                          value={item.degree}
                          onChange={(degree) => { this.changeEducationItem(index, { degree }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Started date"
                          value={item.start_date}
                          onChange={(start_date) => { this.changeEducationItem(index, { start_date }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={item.end_date}
                          onChange={(end_date) => { this.changeEducationItem(index, { end_date }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <button
                          type="button"
                          className="button button_theme_transparent button_size_small"
                          onClick={() => this.removeEducationItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="profile__block">
                  <button
                    type="button"
                    className="button button_theme_transparent button_size_small"
                    onClick={() => this.addEmptyEducationItem()}
                  >
                    Add another
                  </button>
                </div>

                <div className="profile__block">
                  <span className="profile__text">Achievements</span>
                  <DropZone text="add or drag file" />
                </div>
              </InfoBlock>
              <div className="profile__block">
                <Button text="PROCEED" theme="red" size="big" isStretched />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data)),
  }),
)(ProfileWorkAndEducationPage);
