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

import * as actions from '../../actions/profile';
import * as selectors from '../../utils/selectors/profile';

const mapDispatch = dispatch =>
  bindActionCreators({
    addEmptyEducationItem: actions.addEmptyEducationItem,
    changeEducationItem: actions.changeEducationItem,
    removeEducationItem: actions.removeEducationItem,
    addEmptyJobItem: actions.addEmptyJobItem,
    changeJobItem: actions.changeJobItem,
    removeJobItem: actions.removeJobItem,
    changeInputValue: actions.changeInputValue,
    validateWorkAndEducation: actions.validateWorkAndEducation,
  }, dispatch);


const mapStateToProps = state => ({
  firstCurrency: selectors.selectFirstCurrency(state),
  firstCurrencyYear: selectors.selectFirstCurrencyYear(state),
  userJobs: selectors.selectUserJobs(state),
  userEducations: selectors.selectUserEducations(state),
  isValid: selectors.selectWorkAndEducationValidity(state),
  errors: selectors.selectWorkAndEducationErrors(state),
});


class ProfileWorkAndEducationPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.userJobs.length === 0) {
      this.addEmptyJobItem();
    }

    if (this.props.userEducations.length === 0) {
      this.addEmptyEducationItem();
    }
  }

  save() {
    const token = getToken();

    const data = {
      firstCurrency: this.props.firstCurrency,
      firstCurrencyYear: this.props.firstCurrencyYear,
      userJobs: this.props.userJobs,
      userEducations: this.props.userEducations,
    };

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
  }

  @bind
  makeChangeInputValueHandler(field) {
    return value => this.props.changeInputValue({ field, value });
  }

  @bind
  addEmptyEducationItem() {
    return this.props.addEmptyEducationItem();
  }

  @bind
  makeChangeEducationItemHandler(field, index) {
    return value => this.props.changeEducationItem({ index, [field]: value });
  }


  @bind
  makeRemoveEducationItemHandler(index) {
    return () => this.props.removeEducationItem(index);
  }

  @bind
  addEmptyJobItem() {
    return this.props.addEmptyJobItem();
  }

  @bind
  makeChangeJobItemHandler(field, index) {
    return value => this.props.changeJobItem({ index, [field]: value });
  }

  @bind
  makeRemoveJobItemHandler(index) {
    return () => this.props.removeJobItem(index);
  }

  @bind
  handleSubmit(e) {
    this.props.validateWorkAndEducation();
    const { isValid } = this.props;
    e.preventDefault();
    if (isValid) {
      this.save();
    }
  }

  render() {
    const { errors, userEducations, userJobs } = this.props;
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[
            { type: 'blockchain', percents: '0', onClick: () => scroller.scrollTo('Blockchain') },
            { type: 'work', percents: '0', onClick: () => scroller.scrollTo('Work') },
            { type: 'education', percents: '0', onClick: () => scroller.scrollTo('Education') },
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
                      value={this.props.firstCurrency}
                      onChange={this.makeChangeInputValueHandler('firstCurrency')}
                      error={errors.firstCurrency && errors.firstCurrency[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Year of purchase"
                      inputWidth={100}
                      value={this.props.firstCurrencyYear}
                      onChange={this.makeChangeInputValueHandler('firstCurrencyYear')}
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
                    {userJobs.map((item, index) => (
                      <div className="list__item" key={index}>
                        <div className="profile__block">
                          <TextInput
                            label="Work place"
                            value={item.title}
                            onChange={this.makeChangeJobItemHandler('title', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Position"
                            value={item.position}
                            onChange={this.makeChangeJobItemHandler('position', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Started date"
                            value={item.startDate}
                            onChange={this.makeChangeJobItemHandler('startDate', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Ended date"
                            value={item.endDate}
                            onChange={this.makeChangeJobItemHandler('endDate', index)}
                          />
                        </div>
                        {this.props.userJobs.length !== 1 && (
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
                    ))}

                    <div className="profile__block">
                      <button
                        type="button"
                        className="button button_theme_transparent button_size_small"
                        onClick={this.addEmptyJobItem}
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
                    {this.props.userEducations.map((item, index) => (
                      <div className="list__item" key={index}>
                        <div className="profile__block">
                          <TextInput
                            label="Education"
                            value={item.title}
                            onChange={this.makeChangeEducationItemHandler('title', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Spec"
                            value={item.speciality}
                            onChange={this.makeChangeEducationItemHandler('speciality', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <TextInput
                            label="Level"
                            value={item.degree}
                            onChange={this.makeChangeEducationItemHandler('degree', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Started date"
                            value={item.startDate}
                            onChange={this.makeChangeEducationItemHandler('startDate', index)}
                          />
                        </div>
                        <div className="profile__block">
                          <DateInput
                            label="Ended date"
                            value={item.endDate}
                            onChange={this.makeChangeEducationItemHandler('endDate', index)}
                          />
                        </div>
                        {userEducations.length !== 1 && (
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
                    ))}
                  </div>

                  <div className="profile__block">
                    <Button
                      theme="transparent"
                      size="small"
                      text="Add another"
                      onClick={this.addEmptyEducationItem}
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
  firstCurrency: PropTypes.string,
  firstCurrencyYear: PropTypes.string,
  changeInputValue: PropTypes.func,
  addEmptyEducationItem: PropTypes.func,
  changeEducationItem: PropTypes.func,
  removeEducationItem: PropTypes.func,
  addEmptyJobItem: PropTypes.func,
  changeJobItem: PropTypes.func,
  removeJobItem: PropTypes.func,
  validateWorkAndEducation: PropTypes.func,
  isValid: PropTypes.bool,
  errors: PropTypes.shape({
    firstCurrency: PropTypes.array,
    firstCurrencyYear: PropTypes.array,
    userJobs: PropTypes.arrayOf(PropTypes.array),
    userEducations: PropTypes.arrayOf(PropTypes.array),
  }),
};


export default connect(mapStateToProps, mapDispatch)(ProfileWorkAndEducationPage);
