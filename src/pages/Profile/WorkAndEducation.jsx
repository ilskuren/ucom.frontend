import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { scroller, Element } from 'react-scroll';
import { bind } from 'decko';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import DropZone from '../../components/DropZone';
import DateInput from '../../components/DateInput';
import Loading from '../../components/Loading';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { convertClientUsersEducation, convertClientUsersJobs } from '../../api/convertors';
import { scrollAnimation } from '../../utils/constants';

import { selectUser } from '../../utils/selectors/user';
import * as actions from '../../actions';

const mapDispatch = dispatch =>
  bindActionCreators({
    addUserEducationItem: actions.addUserEducationItem,
    changeUserEducationItem: actions.changeUserEducationItem,
    removeUserEducationItem: actions.removeUserEducationItem,
    addUserJobItem: actions.addUserJobItem,
    changeUserJobItem: actions.changeUserJobItem,
    removeUserJobItem: actions.removeUserJobItem,
    changeUserField: actions.changeUserField,
    validateProfileForm: actions.validateProfileForm,
    clearErrors: actions.clearErrors,
    setUser: actions.setUser,
  }, dispatch);

const mapStateToProps = state => ({
  user: selectUser(state),
});


class ProfileWorkAndEducationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { userJobs, userEducations } = this.props.user;
    if (userJobs.length === 0) {
      this.addUserJobItem();
    }

    if (userEducations.length === 0) {
      this.addUserEducationItem();
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  save() {
    const token = getToken();
    const { user } = this.props;
    const data = {
      first_currency: user.firstCurrency,
      first_currency_year: user.firstCurrencyYear,
      users_jobs: convertClientUsersJobs(user.userJobs),
      users_education: convertClientUsersEducation(user.userEducations),
    };

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
  }

  @bind
  makeChangeUserFieldHandler(field) {
    return value => this.props.changeUserField({ field, value, validationRules: 'workAndEducationRules' });
  }

  @bind
  addUserEducationItem() {
    return this.props.addUserEducationItem();
  }

  @bind
  makeChangeEducationItemHandler(field, index) {
    return value => this.props.changeUserEducationItem({ index, [field]: value });
  }


  @bind
  makeRemoveEducationItemHandler(index) {
    return () => this.props.removeUserEducationItem(index);
  }

  @bind
  addUserJobItem() {
    return this.props.addUserJobItem();
  }

  @bind
  makeChangeJobItemHandler(field, index) {
    return value => this.props.changeUserJobItem({ index, [field]: value });
  }

  @bind
  makeRemoveJobItemHandler(index) {
    return () => this.props.removeUserJobItem(index);
  }

  @bind
  handleSubmit(e) {
    this.props.validateProfileForm('workAndEducationRules');
    const { isValid } = this.props.user;
    e.preventDefault();
    if (isValid) {
      this.save();
    }
  }

  render() {
    const { user } = this.props;
    const { errors } = user;
    const {
      userEducations,
      userJobs,
      firstCurrency,
      firstCurrencyYear,
    } = user;
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[
            { type: 'blockchain', percents: '0', onClick: () => scroller.scrollTo('Blockchain', scrollAnimation) },
            { type: 'work', percents: '0', onClick: () => scroller.scrollTo('Work', scrollAnimation) },
            { type: 'education', percents: '0', onClick: () => scroller.scrollTo('Education', scrollAnimation) },
          ]}
          />
        </div>
        <div className="grid__item">
          <form
            className="person-form"
            onSubmit={this.handleSubmit}
          >
            <Loading loading={this.state.loading} className="loading_block" />

            <div className="profile__info-block">
              <Element name="Blockchain">
                <InfoBlock title="Blockchain">
                  <div className="profile__block">
                    <TextInput
                      label="Your first asset"
                      placeholder="Example Kickcoin"
                      value={firstCurrency}
                      onChange={this.makeChangeUserFieldHandler('firstCurrency')}
                      error={errors.firstCurrency && errors.firstCurrency[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Year of purchase"
                      inputWidth={100}
                      value={firstCurrencyYear}
                      onChange={this.makeChangeUserFieldHandler('firstCurrencyYear')}
                      error={errors.firstCurrencyYear && errors.firstCurrencyYear[0]}
                    />
                  </div>
                </InfoBlock>
              </Element>
            </div>

            <div className="profile__info-block">
              <Element name="Work">
                <InfoBlock title="Work">
                  <div className="list">
                    <div className="list__item" key={0}>
                      <div className="profile__block">
                        <TextInput
                          label="Work place"
                          value={userJobs[0].title}
                          onChange={this.makeChangeJobItemHandler('title', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Position"
                          value={userJobs[0].position}
                          onChange={this.makeChangeJobItemHandler('position', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Started date"
                          value={userJobs[0].startDate}
                          onChange={this.makeChangeJobItemHandler('startDate', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={userJobs[0].endDate}
                          onChange={this.makeChangeJobItemHandler('endDate', 0)}
                        />
                      </div>
                      {Array.isArray(userJobs) && userJobs.length > 1 && (
                        <div className="profile__block">
                          <Button
                            theme="transparent"
                            size="small"
                            onClick={this.makeRemoveJobItemHandler(0)}
                            text="Remove"
                          />
                        </div>
                      )}
                    </div>
                    {Array.isArray(userJobs) && userJobs.slice(1).map((item, index) => (
                      <div className="list__item" key={index + 1}>
                        <div className="profile__block">
                          <TextInput
                            label="Work place"
                            value={item.title}
                            onChange={this.makeChangeJobItemHandler('title', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Position"
                            value={item.position}
                            onChange={this.makeChangeJobItemHandler('position', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Started date"
                            value={item.startDate}
                            onChange={this.makeChangeJobItemHandler('startDate', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Ended date"
                            value={item.endDate}
                            onChange={this.makeChangeJobItemHandler('endDate', index + 1)}
                          />
                        </div>
                        {Array.isArray(userJobs) && (
                          <div className="profile__block">
                            <Button
                              theme="transparent"
                              size="small"
                              onClick={this.makeRemoveJobItemHandler(index + 1)}
                              text="Remove"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="profile__block">
                      <button
                        type="button"
                        className="button button_theme_transparent button_size_small"
                        onClick={this.addUserJobItem}
                      >
                        Add another
                      </button>
                    </div>
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="Education">
                <InfoBlock title="Education">
                  <div className="list">
                    <div className="list__item" key={0}>
                      <div className="profile__block">
                        <TextInput
                          label="Education"
                          value={userEducations[0].title}
                          onChange={this.makeChangeEducationItemHandler('title', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Spec"
                          value={userEducations[0].speciality}
                          onChange={this.makeChangeEducationItemHandler('speciality', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <TextInput
                          label="Level"
                          value={userEducations[0].degree}
                          onChange={this.makeChangeEducationItemHandler('degree', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Started date"
                          value={userEducations[0].startDate}
                          onChange={this.makeChangeEducationItemHandler('startDate', 0)}
                        />
                      </div>
                      <div className="profile__block">
                        <DateInput
                          label="Ended date"
                          value={userEducations[0].endDate}
                          onChange={this.makeChangeEducationItemHandler('endDate', 0)}
                        />
                      </div>
                      {Array.isArray(userEducations) && (
                        <div className="profile__block">
                          <Button
                            theme="transparent"
                            size="small"
                            text="Remove"
                            onClick={this.makeRemoveEducationItemHandler(0)}
                          />
                        </div>
                      )}
                    </div>
                    {userEducations.slice(1).map((item, index) => (
                      <div className="list__item" key={index + 1}>
                        <div className="profile__block">
                          <TextInput
                            label="Education"
                            value={item.title}
                            onChange={this.makeChangeEducationItemHandler('title', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Spec"
                            value={item.speciality}
                            onChange={this.makeChangeEducationItemHandler('speciality', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Level"
                            value={item.degree}
                            onChange={this.makeChangeEducationItemHandler('degree', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Started date"
                            value={item.startDate}
                            onChange={this.makeChangeEducationItemHandler('startDate', index + 1)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Ended date"
                            value={item.endDate}
                            onChange={this.makeChangeEducationItemHandler('endDate', index + 1)}
                          />
                        </div>
                        {userEducations.length !== 1 && (
                          <div className="profile__block">
                            <Button
                              theme="transparent"
                              size="small"
                              text="Remove"
                              onClick={this.makeRemoveEducationItemHandler(index + 1)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="profile__block">
                    <Button
                      theme="transparent"
                      size="small"
                      text="Add another"
                      onClick={this.addUserEducationItem}
                    />
                  </div>

                  <div className="profile__block">
                    <span className="profile__text">Achievements</span>
                    <DropZone text="add or drag file" />
                  </div>
                </InfoBlock>
              </Element>
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

ProfileWorkAndEducationPage.propTypes = {
  userJobs: PropTypes.arrayOf(PropTypes.object),
  userEducations: PropTypes.arrayOf(PropTypes.object),
  changeUserField: PropTypes.func,
  clearErrors: PropTypes.func,
  addUserEducationItem: PropTypes.func,
  changeUserEducationItem: PropTypes.func,
  removeUserEducationItem: PropTypes.func,
  addUserJobItem: PropTypes.func,
  changeUserJobItem: PropTypes.func,
  removeUserJobItem: PropTypes.func,
  validateProfileForm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatch)(ProfileWorkAndEducationPage);
