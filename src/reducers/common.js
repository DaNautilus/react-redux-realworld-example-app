const defaultState = {
  appName: 'conduit',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case 'REDIRECT':
      return { ...state, redirectTo: null };
    case 'LOGOUT':
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    case 'ARTICLE_SUBMITTED':
      return { ...state, redirectTo: `/article/${action.payload.article.slug}` };
    case 'SETTINGS_SAVED':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.payload ? action.payload.user : null
      };
    case 'DELETE_ARTICLE':
      return { ...state, redirectTo: '/' };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    default:
      return state;
  }
};
