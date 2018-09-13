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
import { convertClientUser } from '../../api/convertors';
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
    const { history } = this.props;
    Promise
      .resolve()
      .then(() => {
        const token = getToken();
        const { user } = this.props;
        const data = convertClientUser(user);
        this.setState({ loading: true });
        return patchMyself(data, token);
      })
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      })
      .then(() => history.push('contacts'))
      .catch(err => console.error(err.message));
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
    e.preventDefault();
    Promise.resolve()
      .then(this.props.validateProfileForm('workAndEducationRules'))
      .then(() => {
        const { isValid } = this.props.user;
        if (isValid) {
          this.save();
        }
      })
      .catch(err => console.error(err.message));
  }

  @bind
  renderJobItem(index) {
    const { userJobs } = this.props.user;
    const isExistingNotEmptyArray = Array.isArray(userJobs) && userJobs.length === 0;
    const getValueFor = name => (isExistingNotEmptyArray ? undefined : userJobs[index][name]);
    return (
      <div className="list__item" key={index}>
        <div className="profile__block">
          <TextInput
            label="Work place"
            value={getValueFor('title')}
            onChange={this.makeChangeJobItemHandler('title', index)}
          />
        </div>
        <div className="profile__block">
          <TextInput
            label="Position"
            value={getValueFor('position')}
            onChange={this.makeChangeJobItemHandler('position', index)}
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Started date"
            value={getValueFor('startDate')}
            onChange={this.makeChangeJobItemHandler('startDate', index)}
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Ended date"
            value={getValueFor('endDate')}
            onChange={this.makeChangeJobItemHandler('endDate', index)}
          />
        </div>
        {Array.isArray(userJobs) && userJobs.length > 1 && (
          <div className="profile__block">
            <Button
              theme="transparent"
              size="small"
              onClick={this.makeRemoveJobItemHandler(index)}
              text="Remove"
            />
          </div>
        )}
      </div>
    );
  }

  @bind
  renderEducationItem(index) {
    const { userEducations } = this.props.user;
    const isExistingNotEmptyArray = Array.isArray(userEducations) && userEducations.length === 0;
    const getValueFor = name => (isExistingNotEmptyArray ? undefined : userEducations[index][name]);
    return (
      <div className="list__item" key={index}>
        <div className="profile__block">
          <TextInput
            label="Education"
            value={getValueFor('title')}
            onChange={this.makeChangeEducationItemHandler('title', index)}
          />
        </div>
        <div className="profile__block">
          <TextInput
            label="Spec"
            value={getValueFor('speciality')}
            onChange={this.makeChangeEducationItemHandler('speciality', index)}
          />
        </div>
        <div className="profile__block">
          <TextInput
            label="Level"
            value={getValueFor('degree')}
            onChange={this.makeChangeEducationItemHandler('degree', index)}
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Started date"
            value={getValueFor('startDate')}
            onChange={this.makeChangeEducationItemHandler('startDate', index)}
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Ended date"
            value={getValueFor('endDate')}
            onChange={this.makeChangeEducationItemHandler('endDate', index)}
          />
        </div>
        {Array.isArray(userEducations) && userEducations.length > 1 && (
          <div className="profile__block">
            <Button
              theme="transparent"
              size="small"
              text="Remove"
              onClick={this.makeRemoveEducationItemHandler(index)}
            />
          </div>
        )}
      </div>
    );
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
                    {this.renderJobItem(0)}
                    {Array.isArray(userJobs) && userJobs.slice(1).map((_, index) => this.renderJobItem(index + 1))}
                    <div className="profile__block">
                      <Button
                        type="button"
                        theme="transparent"
                        size="small"
                        onClick={this.addUserJobItem}
                        text="Add another"
                      />
                    </div>
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="Education">
                <InfoBlock title="Education">
                  <div className="list">
                    {this.renderEducationItem(0)}
                    {userEducations.slice(1).map((_, index) => this.renderEducationItem(index + 1))}
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
