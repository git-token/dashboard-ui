import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Tabs, Tab
} from 'react-bootstrap'

import {
  TokenStatistics
} from '../Views/index'

import {
  TermsOfServiceModal
} from '../Modals/index'

class PageTabsComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  renderTabs() {
    const { dashboard: { views: { options } } } = this.props

    return options.map((option, i) => {
      return (
        <Tab key={i} eventKey={option} title={option}>
          {option} Content Here!
        </Tab>
      )
    })
  }

  selectPage(id) {
    const { dispatch } = this.props
    dispatch({ type: 'UPDATE_VIEWS_DATA', id: 'activeView', value: id })
  }

  render() {
    const { dashboard: { views: { activeView, options } } } = this.props
    return (
      <div>
        <Tabs activeKey={activeView} onSelect={this.selectPage.bind(this)} id="page-tabs">
          <Tab eventKey={"Token Details"} title={"Token Details"}>
            <TokenStatistics />
          </Tab>
          <Tab eventKey={"Token Offering"} title={"Token Offering"}>
            <TermsOfServiceModal />
          </Tab>
          {/*this.renderTabs()*/}
        </Tabs>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const PageTabs = connect(mapStoreToProps)(PageTabsComponent)

export default PageTabs
