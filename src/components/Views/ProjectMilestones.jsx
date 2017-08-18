import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'


class ProjectMilestonesComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  list({ milestones }) {
    return milestones.map((milestone, i) => {
      const { createdBy, createdOn, updatedOn, dueOn, description, title, id, state } = milestone
      const timeFrame = new Date(dueOn).getTime() - new Date(createdOn).getTime();
      const timeRemaining = new Date(dueOn).getTime() - new Date().getTime();
      const daysRemaining = timeRemaining / (60 * 60 * 24 * 1000)
      return (
        <tr key={i}>
          <td>{id}</td>
          <td>{state}</td>
          <td><ProgressBar active now={state == 'closed' ? 100 : (1 - (timeRemaining / timeFrame)) * 100}/></td>
          <td>{state == 'closed' ? 100 : ((1 - (timeRemaining / timeFrame)) * 100).toLocaleString()} %</td>
          <td>{createdBy}</td>
          <td>{description}</td>
          <td>{+daysRemaining.toLocaleString() > 0 ? daysRemaining.toLocaleString() : 0} Days</td>
          <td>{new Date(createdOn).toLocaleString()}</td>
          <td>{new Date(dueOn).toLocaleString()}</td>
        </tr>
      )
    })
  }

  render() {
    const { dispatch, dashboard: { data: { milestones } } } = this.props

    // console.log('milestones', milestones)

    return (
      <div style={{ marginTop: "50px"}}>
        <Row>
          <Col sm={12}>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Milestone ID</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th></th>
                  <th>Created By</th>
                  <th>Description</th>
                  <th>Days Until Due Date</th>
                  <th>Created On</th>
                  <th>Expected Due Date</th>
                </tr>
              </thead>
              <tbody>
                { milestones ? this.list({ milestones }) : null }
              </tbody>
            </Table>
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

const ProjectMilestones = connect(mapStoreToProps)(ProjectMilestonesComponent)

export default ProjectMilestones
