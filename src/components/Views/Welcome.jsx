import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'
import {
  Row, Col, ProgressBar
} from 'react-bootstrap'
import { ConnectToWebSocket, authenticateGitHubUser, loadWeb3 } from '../../actions/DashboardActions'


class WelcomeComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadWeb3())
    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    ) {
      const registration = runtime.register()

      registerEvents(registration, {
        onInstalled: () => {
          console.log('onInstalled')
        },
        onUpdateReady: () => {
          console.log('onUpdateReady')
        },

        onUpdating: () => {
          console.log('onUpdating')
        },
        onUpdateFailed: () => {
          console.log('onUpdateFailed')
        },
        onUpdated: () => {
          console.log('onUpdated')
        },
      })
    } else {
      console.log('serviceWorker not available')
    }
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
              <img src="./src/assets/images/GitTokenLogo.png" />
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              <hr/>
              <ProgressBar active now={100}/>
            </Col>
            <Col sm={4}></Col>
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
