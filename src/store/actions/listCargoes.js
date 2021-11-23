import axiosUrl from '../../axios/axios_url'
import { FETCH_LIST_CARGOES_ERROR,
  FETCH_LIST_CARGOES_START,
  FETCH_LIST_CARGOES_SUCCESS } from './actionTypes'

export function fetchListCargoesStart() {
  return {
    type: FETCH_LIST_CARGOES_START,
  }
}

export function fetchListCargoesSuccess(cargoesLst) {
  return {
    type: FETCH_LIST_CARGOES_SUCCESS,
    cargoesLst,
  }
}

export function fetchListCargoesError(e) {
  return {
    type: FETCH_LIST_CARGOES_ERROR,
    error: e,
  }
}
export function actCreatorFetchListCargoes() {
  return async (dispatch) => {
    dispatch(fetchListCargoesStart())
    try {
      const response = await axiosUrl.get('/cargoes')

      const cargoesLst = []

      Object.keys(response.data).forEach((key, index) => {
        cargoesLst.push({
          id: key,
          name: `Тест №${index + 1}`,
        })
      })

      dispatch(fetchListCargoesSuccess(cargoesLst))
    } catch (e) {
      dispatch(fetchListCargoesError(e))
    }
  }
}
