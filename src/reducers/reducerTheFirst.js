export default (state = {}, action) => {
  switch (action.type) {
    case 'actionTheFirst':
      return {
        result: action.payload
      }
    default:
      return state
  }
}