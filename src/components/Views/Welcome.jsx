import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'
import {
  Row, Col, ProgressBar
} from 'react-bootstrap'
import { loadWeb3 } from '../../actions/DashboardActions'


class WelcomeComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadWeb3())
    // if (
    //   'serviceWorker' in navigator &&
    //   (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    // ) {
    //   const registration = runtime.register()
    //
    //   registerEvents(registration, {
    //     onInstalled: () => {
    //       console.log('onInstalled')
    //     },
    //     onUpdateReady: () => {
    //       console.log('onUpdateReady')
    //     },
    //
    //     onUpdating: () => {
    //       console.log('onUpdating')
    //     },
    //     onUpdateFailed: () => {
    //       console.log('onUpdateFailed')
    //     },
    //     onUpdated: () => {
    //       console.log('onUpdated')
    //     },
    //   })
    // } else {
    //   console.log('serviceWorker not available')
    // }
  }

  render() {
    const { dispatch, dashboard: { data: { contributionHistory } } } = this.props


    if (contributionHistory.length > 0) {
      return (<Redirect to="/dashboard" />);
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <Row>
            <Col sm={12}>
              <div style={{ marginLeft: "-140px", marginBottom: "-100px"}}>
                <svg height="600px" viewBox="0 0 400 400">
                  <path d="M 250 200 L 350 150 L 350 250 L 250 300 L 150 250 L 150 150 Q 250 100 250 100 L 250 100 L 315 135 "
                    fill="transparent"
                    strokeLinejoin={"round"}
                    stroke="#e95420"
                    strokeWidth="12"
                  />


                  <circle cx="315" cy="135" r="14" fill="#e95420"/>
                  <circle cx="315" cy="135" r="8" fill="white"/>
                  <circle cx="250" cy="200" r="14" fill="#e95420"/>
                  <circle cx="250" cy="200" r="8" fill="white"/>
                </svg>
              </div>
              <h1 style={{ fontSize: "144px" }}>GitToken</h1>
            </Col>
          </Row>
        </div>
      )
    }

  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const Welcome = connect(mapStoreToProps)(WelcomeComponent)

export default Welcome
