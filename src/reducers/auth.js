export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'UPDATE_FIELD_AUTH':
      return { ...state, [action.key]: action.value };
    case 'LOGIN_PAGE_UNLOADED':
      return {};
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN') {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }

  return state;
};
