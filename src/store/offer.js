import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    post_type_id: 1,
    title: null,
    leading_text: null,
    description: null,
    action_button_title: null,
    action_button_url: null,
    action_duration_in_days: null,
    main_image_filename: null,
  },
  rules: {
    title: 'required',
    leading_text: 'required',
    description: 'required',
    action_button_title: 'required',
    action_button_url: 'required|url',
    action_duration_in_days: 'required|numeric',
    main_image_filename: 'required',
  },
  errors: {

  },
  isValid: false,
});

const offer = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_OFFER': {
      return getInitialState();
    }

    case 'SET_OFFER_DATA': {
      const data = Object.assign({}, state.data, action.data);
      const validation = new Validator(data, state.rules);

      return Object.assign({}, state, {
        data,
        isValid: validation.passes(),
      });
    }

    case 'VALIDATE_OFFER': {
      const validation = new Validator(state.data, state.rules);

      validation.passes();

      return Object.assign({}, state, {
        errors: validation.errors.all(),
      });
    }

    case 'VALIDATE_OFFER_FIELD': {
      const validation = new Validator(state.data, state.rules);

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

export default offer;
