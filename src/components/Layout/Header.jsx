import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'

class HeaderComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  toggleSideNav() {
    let { dispatch, dashboard: { sideNav } } = this.props
    dispatch({ type: 'UPDATE_DASHBOARD', id: 'sideNav', value: {
      ...sideNav,
      show: true
    } })
  }

  render() {
		const { dashboard: { name, organization, symbol, address } } = this.props

    return (
			<div style={{ height: '100px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Row>
          <Col sm={2}>
            <a href="#" onClick={this.toggleSideNav.bind(this)}>
              <div style={{ marginTop: '-5px', paddingLeft: '25px', paddingRight: '25px'}}>
                <h1 style={{ fontSize: '64px' }}>{name}</h1>
              </div>
            </a>
          </Col>
          <Col sm={10}>
            <marquee style={{ height: '200px' }} direction="right">
              <h4 style={{ marginBottom: '-5px', color: 'white' }}>
                Tokens Issued: <small>{Number(1e6).toLocaleString()} {symbol}</small> |
                Contract Address: <small>{address}</small> |
                GitHub Organization: <small><a href={`https://github.com/${organization}`} target="_blank">{organization}</a></small>
              </h4>
            </marquee>
          </Col>
        </Row>
			</div>
		)
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
