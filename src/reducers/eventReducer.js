export default (state = {}, action) => {
  switch (action.type) {
    case 'get':
      return {
        result: action.events
      }
    default:
      return state
  }
}