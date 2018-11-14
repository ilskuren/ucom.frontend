import { bindActionCreators } from 'redux';
import { KEY_ESCAPE } from 'keycode-js';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Textarea from '../Textarea';
import Button from '../Button';
import IconEdit from '../Icons/Edit';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { updateUser } from '../../actions/users';

const PLACEHOLDER = 'What’s Ur Passion…';

class UserStatus extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVisibility: true,
    };
  }

  render() {
    const user = getUserById(this.props.users, this.props.userId);

    if (!user) {
      return null;
    }

    if (!user.moodMessage && +this.props.user.id !== +user.id) {
      return null;
    }

    return (
      <div className="status">
        {this.props.user.id !== +user.id ? (
          <div className="status__message">
            {user.moodMessage || 'What’s Ur @Passion…'}
          </div>
        ) : (
          <div className="status__message status__message_editable">
            {user.moodMessage || PLACEHOLDER}

            <span className="status__message-edit-icon">
              <IconEdit />
            </span>
          </div>
        )}

        {this.state.formVisibility &&
          <div className="status__form">
            <textarea rows="2" className="status__textarea" placeholder={PLACEHOLDER} />

            <div className="status__actions">
              <Button text="Save" size="small" theme="transparent" />
              <div className="status__counter">0/130</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

// class UserStatus extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       formVisible: false,
//       moodMessage: '',
//     };
//   }

//   changeMoodMessage(moodMessage) {
//     this.setState({ moodMessage });
//   }

//   showForm(moodMessage) {
//     this.setState({
//       moodMessage,
//       formVisible: true,
//     });
//   }

//   hideForm() {
//     this.setState({ formVisible: false });
//   }

//   closeIfEsc(e) {
//     if (e.keyCode === KEY_ESCAPE) {
//       this.hideForm();
//     }
//   }

//   saveMoodMessage(e) {
//     e.preventDefault();
//     this.props.updateUser({ moodMessage: this.state.moodMessage });
//     this.hideForm();
//   }

//   render() {
//     const user = getUserById(this.props.users, this.props.userId);

//     if (!user) {
//       return null;
//     }

//     return (
//       <div className={classNames('status', { status_open: this.state.formVisible })}>
//         {this.state.formVisible ? (
//           <form className="status__form" onSubmit={e => this.saveMoodMessage(e)} autoComplete="off">
//             <Textarea
//               autoFocus
//               rows={2}
//               name="status"
//               className="textarea_border_none"
//               placeholder="Change status"
//               value={this.state.moodMessage}
//               onChange={moodMessage => this.changeMoodMessage(moodMessage)}
//               onKeyUp={e => this.closeIfEsc(e)}
//             />

//             <div className="status__control">
//               <div className="status__button">
//                 <Button text="Cancel" size="small" theme="light" onClick={() => this.hideForm()} />
//               </div>
//               <div className="status__button">
//                 <Button text="Save" type="submit" size="small" theme="red" isDisabled={this.state.moodMessage === (user.moodMessage || '')} />
//               </div>
//             </div>
//           </form>
//         ) : (
//           <div className="status__text">
//             <span className="inline">
//               <span className="inline__item">
//                 {user.moodMessage || 'My status or message'}
//               </span>

//               {+this.props.user.id === +user.id && (
//                 <span className="inline__item">
//                   <span className="edit edit_xsmall" role="presentation" onClick={() => this.showForm(user.moodMessage)} />
//                 </span>
//               )}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    updateUser,
  }, dispatch),
)(UserStatus);
