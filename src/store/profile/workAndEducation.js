import Validator from 'validatorjs';

const getInitialState = () => ({
  data: {
    firstCurrency: '',
    firstCurrencyYear: '',
    userJobs: [{
      endDate: null,
      startDate: null,
      isCurrent: false,
      title: '',
      position: '',
    }],
    userEducations: [{
      endDate: null,
      startDate: null,
      isCurrent: false,
      degree: '',
      speciality: '',
      title: '',
    }],
  },
  rules: {
    firstCurrency: 'required|numeric',
    firstCurrencyYear: 'required|numeric',
    userJobs: 'array',
    userEducations: 'array',
  },
  errors: {
    firstCurrency: null,
    firstCurrencyYear: null,
    userJobs: null,
    userEducations: null,
  },
  isValid: false,
});

const workAndEducation = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'PROFILE_WORK-AND-EDUCATION:ADD_EMPTY_EDUCATION_ITEM': {
      return {
        ...state,
        data: {
          ...state.data,
          userEducations: state.data.userEducations.concat({
            endDate: null,
            startDate: null,
            isCurrent: false,
            degree: '',
            speciality: '',
            title: '',
          }),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:ADD_EMPTY_JOB_ITEM': {
      return {
        ...state,
        data: {
          ...state.data,
          userJobs: state.data.userJobs.concat({
            endDate: null,
            startDate: null,
            isCurrent: false,
            title: '',
            position: '',
          }),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:REMOVE_EDUCATION_ITEM': {
      const index = action.payload;

      const returnUserEducations = () => {
        const possibleNewUserEducations = [
          ...state.data.userEducations.slice(0, index),
          ...state.data.userEducations.slice(index + 1),
        ];

        if (possibleNewUserEducations.length !== 0) {
          return possibleNewUserEducations;
        }
        return [
          ...state.data.userEducations.slice(0, index),
          ...state.data.userEducations.slice(index + 1),
        ].concat({
          endDate: null,
          startDate: null,
          isCurrent: false,
          degree: '',
          speciality: '',
          title: '',
        });
      };


      return {
        ...state,
        data: {
          ...state.data,
          userEducations: returnUserEducations(),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:REMOVE_JOB_ITEM': {
      const index = action.payload;

      const returnUserJobs = () => {
        const possibleNewUserJobs = [
          ...state.data.userJobs.slice(0, index),
          ...state.data.userJobs.slice(index + 1),
        ];

        if (possibleNewUserJobs.length !== 0) {
          return possibleNewUserJobs;
        }
        return [
          ...state.data.userJobs.slice(0, index),
          ...state.data.userJobs.slice(index + 1),
        ].concat({
          endDate: null,
          startDate: null,
          isCurrent: false,
          title: '',
          position: '',
        });
      };

      return {
        ...state,
        data: {
          ...state.data,
          userJobs: returnUserJobs(),
        },
      };
    }

    case 'PROFILE:CHANGE_INPUT_VALUE': {
      const { field, value } = action.payload;

      const data = {
        ...state.data,
        [field]: value,
      };

      const validation = new Validator(data, state.rules);

      return {
        ...state,
        data,
        isValid: validation.passes(),
        errors: {
          ...state.errors,
          [field]: validation.errors.get([field]),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:VALIDATE_FORM': {
      const validation = new Validator(state.data, state.rules);
      return {
        ...state,
        isValid: validation.passes(),
        errors: {
          ...validation.errors.all(),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:CHANGE_EDUCATION_ITEM': {
      const { index } = action.payload;
      const { userEducations } = state.data;
      const fieldKey = Object.keys(action.payload).filter(key => key !== 'index')[0];
      const fieldValue = action.payload[fieldKey];
      const value = {
        [fieldKey]: fieldValue,
      };
      const returnUserEducations = () => {
        if (index > userEducations.length) {
          return [...userEducations, value];
        }
        return userEducations.map((userEducation, userEducationIndex) => {
          if (userEducationIndex === index) {
            return {
              ...userEducation,
              ...value,
            };
          }
          return userEducation;
        });
      };

      return {
        ...state,
        data: {
          ...state.data,
          userEducations: returnUserEducations(),
        },
      };
    }

    case 'PROFILE_WORK-AND-EDUCATION:CHANGE_JOB_ITEM': {
      const { index } = action.payload;
      const fieldKey = Object.keys(action.payload).filter(key => key !== 'index')[0];
      const fieldValue = action.payload[fieldKey];
      const value = {
        [fieldKey]: fieldValue,
      };
      const { userJobs } = state.data;

      const returnUserJobs = () => {
        if (index > userJobs.length) {
          return [...userJobs, value];
        }
        return userJobs.map((userJob, userJobIndex) => {
          if (userJobIndex === index) {
            return {
              ...userJob,
              ...value,
            };
          }
          return userJob;
        });
      };
      return {
        ...state,
        data: {
          ...state.data,
          userJobs: returnUserJobs(),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default workAndEducation;
