import Validator from 'validatorjs';
import { getRulesByPostTypeId } from '../utils/posts';

const getInitialState = () => ({
  data: {
    post_type_id: 1,
    title: '',
    leading_text: '',
    description: '',
    main_image_filename: '',
    action_button_title: '',
    action_button_url: '',
    action_duration_in_days: '',
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
      const data = Object.assign({}, state.data, action.data);
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
          [action.data]: validation.errors.get(action.data),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default post;
