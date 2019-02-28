export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return { ...state, articles: action.payload.articles };
    case 'HOME_PAGE_UNLOADED':
      return {};
    default:
      return state;
  }
};
