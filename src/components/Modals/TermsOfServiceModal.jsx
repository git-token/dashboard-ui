import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Modal, Button
} from 'react-bootstrap'
import {
  checkEthereumAddress
} from '../../actions/DashboardActions'

class TermsOfServiceModalComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  agree() {
    const { dispatch, dashboard: { modals: { tos } } } = this.props;
    dispatch({ type: 'TOGGLE_MODAL', id: 'tos', value: !tos });
    dispatch(checkEthereumAddress())
  }

  render() {
    const { dashboard: { modals: { tos }, gittoken: { tokenDetails } } } = this.props;

    const organizationLink = `https://github.com/${tokenDetails['organization']}`

    return (
      <Modal show={tos} bsSize={'lg'}>
        <Modal.Header>
          <h1>GitToken Terms of Service</h1>
          <p>Effective Date: {new Date().toLocaleString()}</p>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: 400, overflow: 'scroll' }}>
            <h3>Thank You for using GitToken software!</h3>
            <br/>
            <p>
              <a href={organizationLink} target="_blank">{tokenDetails['name']}</a> ("{tokenDetails['symbol']}") uses GitToken products and services ("Services"). These Services are provided as open-source software by contributors at the GitHub organization Uniform Resource Locator ("URL") <a href="https://github.com/git-token" target="_blank">https://github.com/git-token</a>.
            </p>
            <p>In addition to these Terms of Service ("ToS"), there may be other GitToken
              Services with specific ToS. Those ToS extend to this ToS agreement, and this ToS agreement extends to those specific ToS between GitToken and you when you use those Services.
            </p>
            <p>
              GitToken provides these Services in hopes that they will enable organizations, like <a href={organizationLink} target="_blank">{tokenDetails['symbol']}</a>, to better incentivize and reward contributors, automatically manage Ethereum token distributions, and provide new access to funding for software development.
            </p>
            <p>
              By using GitToken Services you are agreeing to these terms.
            </p>
            <p>
              Please read the following ToS carefully before using any GitToken service. </p>
            <p>
              Versions of this ToS can be found <a href="https://github.com/git-token/documentation/blob/master/tos/terms_of_services.md" target="_blank">here</a>.
            </p>
            <br/>
            <h3>Use of GitToken Services</h3>
            <br/>
            <p>
              GitToken provides software for automating Ethereum token issuances, distributions, and offerings that correspond to GitHub contribution events, such as a pull request or milestone being reached.
            </p>
            <p>
              GitToken token offerings may only take place on GitToken provided user interfaces. The purpose of GitToken is to better incentivize and reward contributors, automatically manage Ethereum token distributions, and provide new access to funding for software development.
            </p>
            <br/>
            <h3>GitHub Account Information</h3>
            <br/>
            <p>
              GitToken is not affiliated with GitHub.
            </p>
            <p>
              GitToken Services requests access to your public GitHub information using Open Authorization ("OAuth"). This information is used by
              the GitToken software to verify your identity with the following contract, <a href={`https://etherscan.io/address/${tokenDetails['address']}`} target="_blank">{tokenDetails['address']}</a>, ("Contract") and map token distributions to your Ethereum public address based on your GitHub username.
            </p>
            <p>
              By using GitToken software, your GitHub contributions, username, and email are made public in the Ethereum blockchain. You agree to not impersonate or misrepresent your GitHub identity.
            </p>
            <p>
              If your organization uses private repositories, this may violate your organization's policies as a result of some information being made public.
            </p>
            <p>
              Consult with your organization before using GitToken.
            </p>
            <br />
            <h3>Organizations Using GitToken</h3>
            <br/>
            <p>
              All organizations using GitToken Services retain intellectual property rights over their software.
            </p>
            <p>
              GitToken provides software that enables organizations to issue nominal amounts of Ethereum tokens in exchange for contributions in organizations' GitHub repositories.
            </p>
            <p>
              Organizations may set custom values for token distributions corresponding to GitHub events, or alternatively can use the default values.
            </p>
            <p>
              In cases where the organization may wish to watch only certain repostories or events, they may select those options using the GitHub organization settings webpage on the GitHub official website.
            </p>
            <p>
              If you are using GitToken Services as an agent on behalf of an organization, the organization in which you represent
              thereby accepts these terms.
            </p>
            <p>It will hold harmless and indemnify GitToken and its contributors from any claim, suit or action arising from or
              related to the use of the Services or violation of these ToS, including any liability or expense arising from claims,
              losses, damages, suits, judgments, litigation costs and attorneys’ fees.
            </p>
            <br/>
            <h3>Modifying and Cancellation of Services</h3>
            <br/>
            <p>
              GitToken retains the right to modify and cancel our services. GitToken service changes can be found in the change log for the service release. Any features can be requested by opening an issue on GitToken's GitHub repository pages.
            </p>
            <p>
              GitToken will make public announcements and provide an adequate period of time for you to retrieve any personal data that may be lost or compromised in the event of a service cancellation.
            </p>
            <br/>
            <h3>Regulatory Compliance</h3>
            <br/>
            <p>
              GitToken asserts tokens issued using GitToken Services are not financial securities.
            </p>
            <p>
              GitTokens are reward points issued to GitHub users when contributions are made toward an organizations' GitHub repositories.
            </p>
            <p>
              Any benefit flowing to the contributor or organization is done so in the direct renumeration of tokens given to the contributor in exchange for work rendered.
            </p>
            <p>
              Tokens issued reflect intellectual property contributed to an organization, but do not reflect intellectual property rights, royalties, or guarantees of any future profit or benefit.
            </p>
            <p>
              GitToken does not restrict issued tokens from being interchanged using third party contracts and services. GitToken does not restrict the organization using the software from ascribing additional properties to the token.
            </p>
            <p>
              Any additional ascribed value, monetary or otherwise, is derived from the utility of the token and the features integrated with the token.
            </p>
            <p>
              Any additional features added or integrated into the organization's software that may alter the characteristics of the token are completed at the sole discretion and liability of the organization using the Services.
            </p>
            <p>
              GitToken, and its contributors, will not be held accountable for any claim, damage, implied warranties, or fine for any token resembling a financial security for any reason.
            </p>
            <p>
              In the event that GitToken receives notice pertaining to the determination of GitToken issued tokens resembling financial securities from financial regulation authorities (e.g. Securities & Exchange Commission), GitToken contributors will determine next steps, including ceasing access to parties in affected jurisdictions and applying for exemption where its reasonable to continue operations.
            </p>
            <p>
              GitToken is obligated to comply and aid in the enforcement of all applicable laws. In the event that law enforcement requests help in investigating illegal activity, GitToken will support such investigations.
            </p>
            <br/>
            <h3>Copyright, Services Liabilities & Limitations</h3>
            <br/>
            <p>
              In most cases, GitToken software is provided under the MIT license:
            </p>
            <hr/>
            <p>
              Copyright 2017 GitToken
            </p>
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
            <hr/>
            <p>Extended Limited Liability</p>
            <p>
              WHEN PERMITTED BY LAW, GITTOKEN, AND GITTOKEN CONTRIBUTORS, WILL NOT BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES.
            </p>
            <p>
              TO THE EXTENT PERMITTED BY LAW, GITTOKEN, AND ITS CONTRIBUTORS, WILL NOT BE RESPONSIBLE FOR ANY CLAIM, DAMAGE, IMPLIED WARRANTIES, OR FINE FOR ANY TOKEN RESEMEBLING A FINANCIAL SECURITY FOR ANY REASON.
            </p>
            <p>
              TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF GITTOKEN, AND ITS CONTRIBUTORS, FOR ANY CLAIMS UNDER THESE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO THE AMOUNT YOU PAID US TO USE THE SERVICES (OR, IF WE CHOOSE, TO SUPPLYING YOU THE SERVICES AGAIN).
            </p>
            <p>
              IN ALL CASES, GITTOKEN, AND ITS CONTRIBUTORS, WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE.
            </p>
            <br/>
            <h3>Acceptance of Terms of Services</h3>
            <p>
              By accepting these ToS and using these Services, you agree to:
            </p>
            <ul>
              <li>
                be at least 18 years old (or at least 13 years old with parent consent) and to have full capacity to enter contract under applicable law;
              </li>
              <li>
                only use GitToken Services using accounts associated with your GitHub account and not impersonate or misrepresent your identity;
              </li>
              <li>
                only use GitToken Services with tokens or Ethereum (ETH) legally obtained and owned or authorized to be managed by you;
              </li>
              <li>
                not undertaking or abetting any unlawful activity through use of GitToken Services and comply with all applicable laws;
              </li>
              <li>
                assume liability of all financial risk of using GitToken Services, including complete loss of ETH, tokens, or any digital asset used in GitToken Services;
              </li>
              <li>
                our right to terminate these Services to you for any reason;
              </li>
            </ul>
            <hr/>
          <Button bsSize={'sm'} bsStyle={'info'} onClick={this.agree.bind(this)} block>I HAVE CAREFULLY READ, UNDERSTAND AND AGREE TO THESE TERMS OF SERVICES</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p><small>Please carefully read and scroll down to accept the Terms of Service before continuing using the website. </small></p>
        </Modal.Footer>
      </Modal>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const TermsOfServiceModal = connect(mapStoreToProps)(TermsOfServiceModalComponent)

export default TermsOfServiceModal
