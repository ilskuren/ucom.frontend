import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { scroller, Element } from 'react-scroll';
import { bind } from 'decko';
import PropTypes from 'prop-types';

import { selectUserWorkAndEducation, selectUserLoading } from 'utils/selectors/user';
import { validate } from 'utils/validators/pages/profile/workAndEducation';

import { scrollAnimation } from 'utils/constants';

import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import DropZone from '../../components/DropZone';
import Loading from '../../components/Loading';
import TextInputField from '../../components/Field/TextInputField';
import WorkAndEducationFieldArray from '../../components/Field/WorkAndEducationFieldArray';
import * as actions from '../../actions';

const mapDispatch = dispatch =>
  bindActionCreators({
    editUserWorkAndEducation: actions.editUserWorkAndEducation,
    // setLoading: actions.setLoading,
  }, dispatch);

const mapStateToProps = state => ({
  userWorkAndEducation: selectUserWorkAndEducation(state),
  loading: selectUserLoading(state),
});


class ProfileWorkAndEducationPage extends PureComponent {
  componentDidMount() {
    // this.props.setLoading(false);
    const { initialize, userWorkAndEducation } = this.props;
    const { userJobs, userEducations } = userWorkAndEducation;
    const preInitializedUserWorkAndEducation = {
      ...userWorkAndEducation,
      userJobs: userJobs.length === 0 ? [{}] : userJobs,
      userEducations: userEducations.length === 0 ? [{}] : userEducations,
    };
    initialize(preInitializedUserWorkAndEducation);
  }

  componentDidUpdate() {
    const { submitSucceeded, history } = this.props;
    if (submitSucceeded) {
      history.push('/profile/contacts');
    }
  }

  @bind
  handleSubmit(event) {
    const {
      handleSubmit,
      editUserWorkAndEducation,
    } = this.props;
    handleSubmit((profile) => {
      editUserWorkAndEducation(profile);
    })(event);
  }

  render() {
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
            <Loading loading={this.props.loading} className="loading_block" />

            <div className="profile__info-block">
              <Element name="Blockchain">
                <InfoBlock title="Blockchain">
                  <div className="profile__block">
                    <TextInputField
                      label="Your first asset"
                      name="firstCurrency"
                      placeholder="Example Kickcoin"
                    />
                  </div>
                  <div className="profile__block">
                    <TextInputField
                      label="Year of purchase"
                      inputWidth={100}
                      name="firstCurrencyYear"
                    />
                  </div>
                </InfoBlock>
              </Element>
            </div>

            <div className="profile__info-block">
              <Element name="Work">
                <InfoBlock title="Work">
                  <div className="list">
                    <WorkAndEducationFieldArray name="userJobs" componentName="jobs" />
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="Education">
                <InfoBlock title="Education">
                  <div className="list">
                    <WorkAndEducationFieldArray name="userEducations" componentName="educations" />
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
  userWorkAndEducation: PropTypes.shape({
    userJobs: PropTypes.arrayOf(PropTypes.object),
    userEducations: PropTypes.arrayOf(PropTypes.object),
    firstCurrency: PropTypes.string,
    firstCurrencyYear: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  loading: PropTypes.bool,
  // setLoading: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  editUserWorkAndEducation: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'workAndEducation', touchOnChange: true, validate })(ProfileWorkAndEducationPage));
