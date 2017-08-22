import TopNav from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  const newState = TopNav.router.getStateForAction(action, state)
  return newState || state
}
