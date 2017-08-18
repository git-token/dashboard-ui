import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import {
  Row, Col, FormGroup, FormControl, HelpBlock, ControlLabel,
  Button, Panel
} from 'react-bootstrap'

import { submitAuctionBid } from '../../actions/DashboardActions'

class AuctionBidFormComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {/*<FormControl.Feedback />*/}
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  setForm (evt) {
    const { dispatch, dashboard: { forms: { auctionBid } } } = this.props
    let { id, value } = evt.target

    let tokens = 0;

    if (id == 'exchangeRate' && value > auctionBid['exchangeRateMax'] || value == 0) {
      value = auctionBid['exchangeRateMax']
    } else if (id == 'ether' && value < (1 / auctionBid['exchangeRateMax'])) {
      value = (1 / auctionBid['exchangeRateMax'])
    }

    if (id == 'exchangeRate') {
      tokens = auctionBid['ether'] * value
    } else if (id == 'ether') {
      tokens = auctionBid['exchangeRate'] * value
    }

    tokens > 0 && tokens != auctionBid['tokens'] ?
      dispatch({ type: 'UPDATE_FORM', form: 'auctionBid', id: 'tokens', value: tokens }) :
      null


    dispatch({ type: 'UPDATE_FORM', form: 'auctionBid', id, value })
  }

  submitBid() {
    const { dispatch, dashboard: { data: { currentAuction }, gittoken: { tokenDetails, contributorAddress }, forms: { auctionBid } } } = this.props
    dispatch(submitAuctionBid({
      offerDetails: {
        ...auctionBid,
        bidder: contributorAddress,
        contract: tokenDetails['address'],
        round: currentAuction['auctionRound']
      },
      decimals: tokenDetails['decimals']
    }))
  }

  render() {
    const { dispatch, dashboard: { data: { currentAuction },gittoken: { tokenDetails, contributorAddress }, forms: { auctionBid } } } = this.props
    const { symbol, decimals } = tokenDetails

    return (
      <div>
        <h3>{symbol} Auction Bid</h3>
        <hr/>
        {this.FieldGroup({
          id: 'contract',
          label: 'Ethereum Address of Contract',
          value: tokenDetails['address'],
          type: 'text',
          placeholder: 'Ethereum Address of Contract',
          disabled: true,
          onChange: this.setForm.bind(this)
        })}
        {this.FieldGroup({
          id: 'auctionRound',
          label: `Auction Round for ${symbol}`,
          value: currentAuction['auctionRound'],
          type: 'text',
          placeholder: 'Round Number for Auction',
          disabled: true,
          onChange: this.setForm.bind(this)
        })}
        {this.FieldGroup({
          id: 'bidder',
          label: 'Ethereum Address of Bidder',
          value: contributorAddress,
          type: 'text',
          placeholder: 'Ethereum Address of Bidder',
          disabled: true,
          onChange: this.setForm.bind(this)
        })}
        {this.FieldGroup({
          id: 'tokens',
          label: `Amount of ${symbol} Bid For`,
          value: auctionBid['tokens'].toFixed(decimals),
          type: 'number',
          placeholder: '1000',
          disabled: true,
          onChange: this.setForm.bind(this)
        })}
        {this.FieldGroup({
          id: 'exchangeRate',
          label: `Exchange Rate of ${symbol} / ETH | Bid Floor 1 GTK == ${Number(1 / auctionBid['exchangeRateMax']).toFixed(decimals)} ETH`,
          value: auctionBid['exchangeRate'],
          type: 'number',
          placeholder: '1000',
          help: `
            Exchange Rate: 1 GTK == ${Number(1 / auctionBid['exchangeRate']).toFixed(decimals)} ETH;
            ${auctionBid['exchangeRate']} ${symbol} == 1 ETHER;
          `,
          max: 1000,
          step: 1,
          onChange: this.setForm.bind(this)
        })}
        {this.FieldGroup({
          id: 'ether',
          label: `Amount of Ether`,
          value: auctionBid['ether'],
          type: 'number',
          placeholder: '1',
          min: 0.001,
          step: 0.1,
          onChange: this.setForm.bind(this)
        })}
        <Button bsStyle={'primary'} bsSize={'sm'} onClick={this.submitBid.bind(this)} block>Submit Bid</Button>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const AuctionBidForm = connect(mapStoreToProps)(AuctionBidFormComponent)

export default AuctionBidForm
