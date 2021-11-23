import { ADD_COMPANY, CLOSE_COMPANY_FORM, LOADING_COMPANY } from '../actions/actionTypes'

export const initialState = {
  form: false,
  loading: true,
}

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        form: true,
      }
    case CLOSE_COMPANY_FORM:
      return {
        ...state,
        form: false,
      }
    case LOADING_COMPANY:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
