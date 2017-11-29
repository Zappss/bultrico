import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import PropTypes from 'prop-types';

import { sendTokenToAddress } from '../../utils/sendTokenToAddress';

import { getTransactionsByAccount } from '../../utils/getTransactionsByAccount';
import { getTokenInfo } from '../../middleware/tokenInfo';


class ManualSend extends Component {
  constructor(props) {
    super(props);

    this.state = {

      manualInvestorAddress: '',
      manualInvestorToken: ''
    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateTokenInfo: PropTypes.func.isRequired,
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    const info = await getTokenInfo();
    updateTokenInfo(info);
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    await getTransactionsByAccount().then((result) => {
      updateTransactions(result);
    });
  }

  async sendToAddress() {
    const {
      manualInvestorAddress, manualInvestorToken
    } = this.state;

    await sendTokenToAddress(manualInvestorAddress, manualInvestorToken).then(async (result) => {
      console.log('sendToAddress', result);
      await this.getTransactions();
      await this.getMainInfo();
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h6>Enter Address</h6>
              <Input
                value={this.state.manualInvestorAddress}
                placeholder="Enter Address"
                onChange={e => this.setState({ manualInvestorAddress: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <h6>Enter Amount of Token</h6>
              <Input
                value={this.state.manualInvestorToken}
                placeholder="Enter Amount of Token"
                onChange={e => this.setState({ manualInvestorToken: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="primary" onClick={() => this.sendToAddress()} >Send</Button>
                </Col>
              </Row>
            </CardBlock>
          </Card>
        </div>
    );
  }
}

export default ManualSend;
