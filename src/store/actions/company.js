import { ADD_COMPANY, CLOSE_COMPANY_FORM, LOADING_COMPANY } from './actionTypes'

export function addCompany() {
  return {
    type: ADD_COMPANY,
  }
}
export function closeCompanyForm() {
  return {
    type: CLOSE_COMPANY_FORM,
  }
}

export function LoadingCompany() {
  return {
    type: LOADING_COMPANY,
  }
}
