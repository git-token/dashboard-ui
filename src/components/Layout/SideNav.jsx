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

  renderButtons() {
    const { dashboard: { sidenav: { options } } } = this.props

    return options.map((option, i) => {
      return (
        <Button key={i} bsStyle={'info'} bsSize={'lg'}>{option}</Button>
      )
    })
  }

  render() {
    return (
      <div>
        <ButtonGroup vertical>
          {this.renderButtons()}
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
