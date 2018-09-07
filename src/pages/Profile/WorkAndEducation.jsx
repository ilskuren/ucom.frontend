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
      firstCurrency: this.props.user.firstCurrency || '',
      firstCurrencyYear: this.props.user.firstCurrencyYear || '',
      usersJobs: this.props.user.usersJobs || [],
      usersEducation: this.props.user.usersEducation || [],
      loading: false,
    };
  }

  componentDidMount() {
    if (this.state.usersJobs.length === 0) {
      this.addEmptyJobItem();
    }

    if (this.state.usersEducation.length === 0) {
      this.addEmptyEducationItem();
    }
  }

  save() {
    const token = getToken();

    const data = {
      firstCurrency: this.state.firstCurrency,
      firstCurrencyYear: this.state.firstCurrencyYear,
      usersJobs: this.state.usersJobs,
      usersEducation: this.state.usersEducation,
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
      usersEducation: prevState.usersEducation.concat({
        endDate: null,
        startDate: null,
        isCurrent: false,
        degree: '',
        speciality: '',
        title: '',
      }),
    }));
  }

  changeEducationItem(index, data) {
    this.setState((prevState) => {
      const { usersEducation } = prevState;

      usersEducation[index] = Object.assign({}, prevState.usersEducation[index], data);

      return {
        usersEducation: [].concat(usersEducation),
      };
    });
  }

  removeEducationItem(index) {
    this.setState((prevState) => {
      const { usersEducation } = prevState;

      usersEducation.splice(index, 1);

      return {
        usersEducation: [].concat(usersEducation),
      };
    }, () => {
      if (this.state.usersEducation.length === 0) {
        this.addEmptyEducationItem();
      }
    });
  }

  addEmptyJobItem() {
    this.setState(prevState => ({
      usersJobs: prevState.usersJobs.concat({
        endDate: null,
        startDate: null,
        isCurrent: false,
        title: '',
        position: '',
      }),
    }));
  }

  changeJobItem(index, data) {
    this.setState((prevState) => {
      const { usersJobs } = prevState;

      usersJobs[index] = Object.assign({}, prevState.usersJobs[index], data);

      return {
        usersJobs: [].concat(usersJobs),
      };
    });
  }

  removeJobItem(index) {
    this.setState((prevState) => {
      const { usersJobs } = prevState;

      usersJobs.splice(index, 1);

      return {
        usersJobs: [].concat(usersJobs),
      };
    }, () => {
      if (this.state.usersJobs.length === 0) {
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
                    value={this.state.firstCurrency}
                    onChange={firstCurrency => this.setState({ firstCurrency })}
                  />
                </div>

                <div className="profile__block">
                  <TextInput
                    label="Year of purchase"
                    inputWidth={100}
                    value={this.state.firstCurrencyYear}
                    onChange={firstCurrencyYear => this.setState({ firstCurrencyYear })}
                  />
                </div>
              </InfoBlock>
            </div>

            <div className="profile__info-block">
              <InfoBlock title="Work">
                <div className="list">
                  {this.state.usersJobs.map((item, index) => (
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
                          value={item.startDate}
                          onChange={(startDate) => { this.changeJobItem(index, { startDate }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={item.endDate}
                          onChange={(endDate) => { this.changeJobItem(index, { endDate }); }}
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
                  {this.state.usersEducation.map((item, index) => (
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
                          value={item.startDate}
                          onChange={(startDate) => { this.changeEducationItem(index, { startDate }); }}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={item.endDate}
                          onChange={(endDate) => { this.changeEducationItem(index, { endDate }); }}
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
                <Button type="submit" text="PROCEED" theme="red" size="big" isStretched />
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
