import { FETCH_LIST_CARGOES_ERROR,
  FETCH_LIST_CARGOES_START,
  FETCH_LIST_CARGOES_SUCCESS } from '../actions/actionTypes'

const initialState = {
  cargoes: [],
  loading: false,
  error: null,
}

export default function listCargoesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST_CARGOES_START:
      return {
        ...state, loading: true,
      }
    case FETCH_LIST_CARGOES_SUCCESS:
      return {
        ...state, loading: false, cargoes: action.cargoesLst,
      }
    case FETCH_LIST_CARGOES_ERROR:
      return {
        ...state, loading: false, error: action.error,
      }
    default:
      break
  }
  return state
}
