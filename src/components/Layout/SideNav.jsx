import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Button, ButtonGroup
} from 'react-bootstrap'

class SideNavComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  handleSelect(id) {
    console.log('handleSelect::id', id)
  }

  render() {
    return (
      <div>
        <ButtonGroup vertical>
          <Button bsStyle={'primary'}>Update Contract Settings</Button>
          <Button bsStyle={'primary'}>Exchange Tokens</Button>
        </ButtonGroup>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const SideNav = connect(mapStoreToProps)(SideNavComponent)

export default SideNav
