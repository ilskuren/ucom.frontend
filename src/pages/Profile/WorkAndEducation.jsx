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
      loading: false,
    };
  }

  componentDidMount() {
    if (this.state.users_jobs.length === 0) {
      this.addEmptyJobItem();
    }
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

  save() {
    const token = getToken();

    const data = {
      first_currency: this.state.first_currency,
      first_currency_year: this.state.first_currency_year,
      users_jobs: this.state.users_jobs,
    };

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
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
                <div className="work-form">
                  {this.state.users_jobs.map((item, index) => (
                    <div className="work-form__item" key={index}>
                      <div className="work-form__field">
                        <TextInput
                          label="Work place"
                          value={item.title}
                          onChange={(title) => { this.changeJobItem(index, { title }); }}
                        />
                      </div>
                      <div className="work-form__field">
                        <TextInput
                          label="Position"
                          value={item.position}
                          onChange={(position) => { this.changeJobItem(index, { position }); }}
                        />
                      </div>
                      <div className="work-form__field">
                        <DateInput
                          label="Started date"
                          value={item.start_date}
                          onChange={(start_date) => { this.changeJobItem(index, { start_date }); }}
                        />
                      </div>
                      <div className="work-form__field">
                        <DateInput
                          label="Ended date"
                          value={item.end_date}
                          onChange={(end_date) => { this.changeJobItem(index, { end_date }); }}
                        />
                      </div>
                      <div className="work-form__field">
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

                  <div className="work-form__action">
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
                <div className="profile__block">
                  <TextInput label="Education" />
                </div>
                <div className="profile__block">
                  <TextInput label="Spec" />
                </div>
                <div className="profile__block">
                  <TextInput label="Level" />
                </div>
                <div className="profile__block">
                  <DateInput label="Started date" />
                </div>
                <div className="profile__block">
                  <DateInput label="Ended date" />
                </div>
                <div className="profile__block">
                  <span className="profile__text">Stud here now?</span>
                  <Button text="add another" size="small" theme="transparent" />
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
