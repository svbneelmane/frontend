export default (state = {}, action) => {
  switch (action.type) {
    case 'getEvents':
      return {
        result: action.events
      }
    default:
      return state
  }
}