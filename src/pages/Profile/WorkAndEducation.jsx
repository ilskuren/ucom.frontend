import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
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
  firstCurrency: selectors.selectProfileWorkAndEducations(state).data.firstCurrency,
  firstCurrencyYear: selectors.selectProfileWorkAndEducations(state).data.firstCurrencyYear,
  userJobs: selectors.selectProfileWorkAndEducations(state).data.userJobs,
  userEducations: selectors.selectProfileWorkAndEducations(state).data.userEducations,
  errors: selectors.selectProfileWorkAndEducations(state).errors,
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
  makeChangeInputValueHandler(field, value) {
    return this.props.changeInputValue({ field, value });
  }

  @bind
  addEmptyEducationItem() {
    return this.props.addEmptyEducationItem();
  }

  @bind
  changeEducationItem(index, value) {
    return this.props.changeEducationItem({ index, value });
  }

  @bind
  removeEducationItem(index) {
    return this.props.removeEducationItem(index);
  }

  @bind
  addEmptyJobItem() {
    return this.props.addEmptyJobItem();
  }

  @bind
  changeJobItem(index, value) {
    return this.props.changeJobItem({ index, value });
  }

  @bind
  removeJobItem(index) {
    return this.props.removeJobItem(index);
  }

  @bind
  handleSubmit(e) {
    this.props.validateWorkAndEducation();
    const { isValid } = this.props;
    if (!isValid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      this.save();
    }
  }

  render() {
    const { errors } = this.props;
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
            onSubmit={this.handleSubmit}
          >
            <Loading loading={this.state.loading} className="loading_block" />

            <div className="profile__info-block">
              <InfoBlock title="Blockchain">
                <div className="profile__block">
                  <TextInput
                    label="Your first asset"
                    placeholder="Example Kickcoin"
                    value={this.props.firstCurrency}
                    onChange={value => this.makeChangeInputValueHandler('firstCurrency', value)}
                    error={errors.firstCurrency && errors.firstCurrency[0]}
                  />
                </div>

                <div className="profile__block">
                  <TextInput
                    label="Year of purchase"
                    inputWidth={100}
                    value={this.props.firstCurrencyYear}
                    onChange={value => this.makeChangeInputValueHandler('firstCurrencyYear', value)}
                    error={errors.firstCurrencyYear && errors.firstCurrencyYear[0]}

                  />
                </div>
              </InfoBlock>
            </div>

            <div className="profile__info-block">
              <InfoBlock title="Work">
                <div className="list">
                  {this.props.userJobs.map((item, index) => (
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
                      {index !== 0 && (
                        <div className="profile__block">
                          <button
                            type="button"
                            className="button button_theme_transparent button_size_small"
                            onClick={() => this.removeJobItem(index)}
                          >
                            Remove
                          </button>
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
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Education">
                <div className="list">
                  {this.props.userEducations.map((item, index) => (
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
                      {index !== 0 && (
                        <div className="profile__block">
                          <button
                            type="button"
                            className="button button_theme_transparent button_size_small"
                            onClick={() => this.removeEducationItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="profile__block">
                  <button
                    type="button"
                    className="button button_theme_transparent button_size_small"
                    onClick={this.addEmptyEducationItem}
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
