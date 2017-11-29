import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import PropTypes from 'prop-types';

import { tokenPurchase } from '../../utils/tokenPurchase';

import { getTransactionsByAccount } from '../../utils/getTransactionsByAccount';


import { getTokenInfo } from '../../middleware/tokenInfo';



class BuyTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyTokenPlaceholder: 'Enter amount of Tokens',
      eth: 0
    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateTokenInfo: PropTypes.func.isRequired
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    const info = await getTokenInfo();
    updateTokenInfo(info);
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    const result = await getTransactionsByAccount();
    updateTransactions(result);
  }

  async buyToken() {
    const { eth } = this.state;
    this.setState({ buyTokenPlaceholder: 'Await response....' });
    await tokenPurchase(eth)
      .then(async (result) => {
        console.log('tokenPurchase', result);
        this.setState({ buyTokenPlaceholder: 'Congratulations!' });
        await this.getTransactions();
        await this.getMainInfo();
      });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h5>Enter Amount of WEI</h5>
              <Input
                value={this.state.eth}
                placeholder={this.state.buyTokenPlaceholder}
                onChange={e => this.setState({ eth: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="success" onClick={() => this.buyToken()} >Buy Tokens</Button>
                </Col>
              </Row>
            </CardBlock>
        </Card>
      </div>
    );
  }
}

export default BuyTokens;
