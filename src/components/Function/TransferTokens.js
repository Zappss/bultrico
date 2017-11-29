import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { transferTokenToAddress } from '../../utils/transferTokenToAddress';

import { getTransactionsByAccount } from '../../utils/getTransactionsByAccount';


class TransferTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      addressTo: '',
      amount: 0
    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    const result = await getTransactionsByAccount();
    updateTransactions(result);
  }

  async transferToAddress() {
    const {
      addressTo, amount
    } = this.state;
    await transferTokenToAddress(addressTo, amount).then(async (result) => {
      console.log('transferToAddress', result);
      await this.getTransactions();
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h4>Transfer Tokens</h4>
              <Row>
                  <Col md={{ size: '5' }} >
                    <h5>To</h5>
                    <Input
                      value={this.state.addressTo}
                      placeholder="Enter address of Investor"
                      onChange={e => this.setState({ addressTo: e.target.value })}
                      onKeyDown={this.handleSubmit}
                    />
                  </Col>
                  <Col md={{ size: '5' }} >
                    <h5>Amount</h5>
                    <Input
                      value={this.state.amount}
                      placeholder="Enter Amount of Tokens"
                      onChange={e => this.setState({ amount: e.target.value })}
                      onKeyDown={this.handleSubmit}
                    />
                  </Col>
              </Row>
              <br/>
              <Row>
                <Col md={{ size: '4' }}>
                  <Button color="primary" onClick={() => this.transferToAddress()} >Transfer</Button>
                </Col>
              </Row>
          </CardBlock>
        </Card>        
      </div>
    );
  }
}

export default TransferTokens;

