export default (state = {}, action) => {
  switch (action.type) {
    case 'login':
      return {
        result: action.user
      }
    case 'logout':
      return {}
    default:
      return state
  }
}