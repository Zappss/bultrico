import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

import { getTokenInfo } from '../../middleware/tokenInfo';

class ICOInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {

      decimals: 10000

    };
  }

  static propTypes = {
    tokenInfo: PropTypes.object.isRequired,
    updateTokenInfo: PropTypes.func.isRequired
  }

componentWillMount() {
    this.getMainInfo();
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    
    try {
      updateTokenInfo(await getTokenInfo());
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { tokenInfo } = this.props;
    const { decimals } = this.state;

    return (
      <div>
        <h3>Initial Coin Offering Info</h3>
        <hr color="blue" className="my-3" />
        <Table striped bordered>
          <thead>
            <tr>
              <th>Info</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Tokens</td>
              <td>{tokenInfo.totalTokensICO / decimals}</td>
            </tr>
            <tr>
              <td>Sold Tokens</td>
              <td>{tokenInfo.soldTokensICO / decimals}</td>
            </tr>
            <tr>
              <td>Left Tokens</td>
              <td>{tokenInfo.leftTokensICO / decimals}</td>
            </tr>
            <tr>
              <td>Total ETH</td>
              <td>{tokenInfo.totalETHICO / 1000000000000000000}</td>
            </tr>
            <tr>
              <td>Investors Count</td>
              <td>{tokenInfo.investorsCountICO}</td>
            </tr>
            <tr>
              <td>Date Start</td>
              <td>{tokenInfo.dateStartICO}</td>
            </tr>
            <tr>
              <td>Date Finish</td>
              <td>{tokenInfo.dateFinishICO}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ICOInfo;
