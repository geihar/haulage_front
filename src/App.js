/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Layout from './hoc/Layout/Layout'
import Home from './containers/Home/Home'
import Cargo from './containers/Profile/Components/Cargo/cargo'
import PublicProfile from './containers/Profile/Components/PublicProfile/PublicProfile'
import Transport from './containers/Profile/Components/Transport/Transport'
import Company from './containers/Profile/Components/Company/Company'
import UserActivation from './containers/Authorization/Register/UserActivation'
import PassResetConfirm from './containers/Authorization/Login/PassResetConfirm'
import Payment from './containers/Profile/Components/Payment/Pay'
import Subscription from './containers/Profile/Components/Subscription/Subscription'
import Proposal from './containers/Profile/Components/Proposal/Proposal'
import PassSec from './containers/Profile/Components/Pass&Sec/Pass&Sec'
import Help from './containers/Profile/Components/Help/Help'
import PaymentMethod from './containers/PaymentMethod/PaymentMethod'
import CompanyDetail from './containers/Profile/Components/Company/CompanyDetail'
import TransportDetail from './containers/Profile/Components/Transport/TransportDetail'
import Chat from './containers/Chat/Chat'
import Advertising from './containers/Profile/Components/Advertising/Advertising'
import AdvDetail from './containers/Profile/Components/Advertising/AdvDetail'
import AddProposal from './containers/Profile/Components/Proposal/AddProposal'
import ProposalDetail from './containers/Profile/Components/Proposal/ProposalDetail'
import ChatContainer from './containers/Chat/ChatContainer'

function App(props) {
  // const  currentProfile  = CurrentProfileId()
  const { isAuthorized } = props

  return (
    <Layout>

      <Switch>
        [
        <Route path="/" component={Home} exact />
        <Route path="/pass-reset" component={Home} />
        <Route path="/password/reset/confirm/:uid/:token" component={PassResetConfirm} />
        <Route path="/activate/:uid/:token" component={UserActivation} />
        {/* { isAuthorized */}
        {/*  ? ( */}
        {/*    <> */}
        <Route path="/payment-method" component={PaymentMethod} />
        <Route path="/profile" component={PublicProfile} />
        <Route path="/public" component={PublicProfile} />
        <Route path="/pay" component={Payment} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/proposal" component={Proposal} exact />
        <Route path="/proposal/:id" component={ProposalDetail} exact />
        <Route path="/proposal/add/:id" component={AddProposal} />
        <Route path="/pass&sec" component={PassSec} />
        <Route path="/help" component={Help} />
        <Route exact path="/chat" component={ChatContainer} />
        <Route exact path="/chat/:chatID/" component={Chat} />
        {/* {currentProfile === 'v' */}
        {/*  ? ( */}
        {/*    <> */}
        <Route path="/advertising" component={Advertising} exact />
        <Route path="/advertising/:id" component={AdvDetail} />
        {/*  </> */}
        {/* ) : ( */}
        {/*  <> */}
        <Route path="/transport" component={Transport} exact />
        <Route path="/transport/:id" component={TransportDetail} />
        <Route path="/company" component={Company} exact />
        <Route path="/company/:id" component={CompanyDetail} />
        <Route path="/cargoes" component={Cargo} />
        {/*      </> */}
        {/*    )} */}
        {/*  </> */}
        {/* ) */}
        {/*: <Redirect to="/" />} */}
        <Route path="*" render={() => (isAuthorized ? <PublicProfile /> : <Redirect to="/" />)} />

      </Switch>
    </Layout>
  )
}
App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized,
  }
}

export default connect(mapStateToProps, null)(App)
