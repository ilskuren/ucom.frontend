import Validator from './../utils/validator';
import { getRulesByPostTypeId } from '../utils/posts';

const getInitialState = () => ({
  data: {
    post_type_id: 1,
    organization_id: null,
    title: '',
    leading_text: '',
    description: '',
    main_image_filename: '',
    action_button_title: '',
    action_button_url: '',
    action_duration_in_days: '',
    post_users_team: [],
  },
  errors: {},
  isValid: false,
});

const post = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_POST': {
      return getInitialState();
    }

    case 'SET_POST_DATA': {
      const data = Object.assign({}, state.data, action.payload);
      const validation = new Validator(data, getRulesByPostTypeId(data.post_type_id));

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_POST': {
      const validation = new Validator(state.data, getRulesByPostTypeId(state.data.post_type_id));

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_POST_FIELD': {
      const validation = new Validator(state.data, getRulesByPostTypeId(state.data.post_type_id));

      validation.passes();

      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          [action.payload]: validation.errors.get(action.payload),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default post;
