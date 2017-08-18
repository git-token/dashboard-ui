import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'


class PastAuctionsComponent extends Component {
  constructor(opts) {
    super(opts)
  }


  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { countdown, nextAuction } } } = this.props

    return (
      <div >
        <Row>
          <Col sm={12}>
              <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <h1>Auction History</h1>
              </div>
          </Col>
        </Row>
        <br/>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const PastAuctions = connect(mapStoreToProps)(PastAuctionsComponent)

export default PastAuctions
