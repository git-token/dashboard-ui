import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'
import {
  NextAuction,
  CurrentAuction,
  PastAuctions
} from './index'

import { currentAuction, nextAuction } from '../../actions/DashboardActions'


class TokenAuctionComponent extends Component {
  constructor(opts) {
    super(opts)
  }


  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { countdown, nextAuction, currentAuction } } } = this.props

    if (!currentAuction.auctionRound && nextAuction.auctionRound) {
      return (
        <NextAuction />
      )
    } else if (currentAuction.auctionRound) {
      return (
        <CurrentAuction />
      )
    } else {
      return (
        <PastAuctions />
      );
    }
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const TokenAuction = connect(mapStoreToProps)(TokenAuctionComponent)

export default TokenAuction
