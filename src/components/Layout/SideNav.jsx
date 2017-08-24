import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Panel
} from 'react-bootstrap'

class SideNavComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  navItem({ item, key }) {
    return (
      <a href="#" key={key}>
        <div style={{ textAlign: 'right', paddingRight: '15px', paddingTop: '15px', paddingBottom: '15px' }}>
          <p style={{ fontSize: '18px' }}>{item}</p>
        </div>
      </a>
    )
  }

  toggleSideNav() {
    let { dispatch, dashboard: { sideNav } } = this.props
    dispatch({ type: 'UPDATE_DASHBOARD', id: 'sideNav', value: {
      ...sideNav,
      show: false
    } })
  }

  render() {
    const { dashboard: { sideNav: { show, items } } } = this.props

    console.log('show', show)

    if (!show) {
      return null
    } else {
      return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '1200px', width: '300px', position: 'absolute', zIndex: '3' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,1)', height: '100px' }}></div>
          <a href="#" onClick={this.toggleSideNav.bind(this)}>
            <div style={{ textAlign: 'right', paddingRight: '15px', paddingTop: '15px', paddingBottom: '15px' }}>
              <p style={{ fontSize: '18px' }}>Toggle</p>
            </div>
          </a>
          {items.map((item, i) => {
            return (
              this.navItem({ item, key: i })
            )
          })}
          <div style={{ textAlign: 'center'}}>
            <svg height="250px" viewBox="0 0 400 400">
              <path d="M 250 200 L 350 150 L 350 250 L 250 300 L 150 250 L 150 150 Q 250 100 250 100 L 250 100 L 315 135 "
                fill="transparent"
                strokeLinejoin={"round"}
                stroke="#cc5333"
                strokeWidth="12"
              />

              <circle cx="315" cy="135" r="14" fill="#cc5333"/>
              <circle cx="315" cy="135" r="8" fill="#210b49"/>
              <circle cx="250" cy="200" r="14" fill="#cc5333"/>
              <circle cx="250" cy="200" r="8" fill="#210b49"/>
            </svg>
          </div>
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

const SideNav = connect(mapStoreToProps)(SideNavComponent)

export default SideNav
