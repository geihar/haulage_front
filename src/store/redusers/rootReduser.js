import { combineReducers } from 'redux'
import authReducer from './auth'

import navReducer from './navbar'
import listCargoesReducer from './listCargoes'
import companyReducer from './company'
import messageReducer from './message'

export default combineReducers({
  auth: authReducer,
  navbar: navReducer,
  listCargoes: listCargoesReducer,
  company: companyReducer,
  message: messageReducer,
})
