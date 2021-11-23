/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '../../components/Generic/Search'
import TripList from '../../components/Generic/TripList'
import { getHeaders, HOST_URL } from '../../settings'

export const Board = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const url = `${HOST_URL}api/orders/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        setOrders(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <main role="main" className="container">
      <div
        className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm"
      >
        <img className="mr-3" src="logo.png" alt="" width="48" height="48" />
        <div className="lh-100">
          <h6 className="mb-0 text-black-50 lh-100">Haulage</h6>
          <small className="mb-0 text-black-50">Since 2020</small>
        </div>
      </div>
      <Search />
      <TripList
        name="Заявки на поездку"
        obj={{
          orders,
        }}
      />
    </main>
  )
}

export default Board
