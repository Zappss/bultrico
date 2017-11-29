import 'bootstrap/dist/css/bootstrap.css';
import { injectGlobal } from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TransactionActions from '../actions';
import ContractInfo from './Info/ContractInfo';
import MainInfo from './Info/MainInfo';
import ICOInfo from './Info/ICOInfo';
import Transactions from './Info/Transactions';
import BuyTokens from './Function/BuyTokens';
import ManualSend from './Function/ManualSend';
import TransferOwnership from './Function/TransferOwnership';
import TransferTokens from './Function/TransferTokens';

class Crowdsale extends Component {
  render() {
    const {
      transactions,
      contractInfo,
      tokenInfo,
      actions,
      //investorinfo
    } = this.props;

    return (
        <Container>
          <br/>
          <br/>
          <h1>Ethereum BLR Token ICO</h1>
          <hr color="black" className="my-3" />
          <Col>
            

            <Row>
              <Col md={{ size: '5' }}>
                <br/>
                <ICOInfo tokenInfo={tokenInfo}
                  updateTokenInfo={actions.updateTokenInfo}
                  updateICOInfo={actions.updateICOInfo}
                />
                <br/>
              </Col>
            </Row>


            <Row>
              <Col md={{ size: '5' }}>
                <br/>
                <ContractInfo contractInfo={contractInfo} updateICOInfo={actions.updateICOInfo} />
                <br/>
                <br/>
              </Col>
              <Col md={{ size: '5' }}>
                <br/>
                  <MainInfo tokenInfo={tokenInfo} updateTokenInfo={actions.updateTokenInfo} />
                <br/>
                <br/>
              </Col>
            </Row>


            <Row>
              <Col md= {{ size: '3' }}>
                <br/>
                <h3>Manual Token Purchase</h3>
                <br/>
              </Col>
              <Col md={{ size: '5' }}>
                  <BuyTokens
                    updateTransactions={actions.updateTransactions}
                    updateTokenInfo={actions.updateTokenInfo}
                    updateICOInfo={actions.updateICOInfo}
                  />
                <br/>
                <br/>
                <br/>
              </Col>
            </Row>


            <Row>
              <Col md={{ size: '3' }}>
                <br/>
                <br/>
                <br/>
                <h3>Manual Token Send (minting)</h3>
                <hr color="success" className="my-3" />
              </Col>
              <Col md={{ size: '5' }}>
                <ManualSend
                  updateTransactions={actions.updateTransactions}
                  updateTokenInfo={actions.updateTokenInfo}
                  updateICOInfo={actions.updateICOInfo}
                />
                <br/>
              </Col>
            </Row>

            <br/>
            <br/>
            <br/>


            <Row>
              <Col md={{ size: '5' }}>
                <TransferOwnership
                updateTransactions={actions.updateTransactions}
                />
                <br/>
                <br/>
              </Col>
            </Row>


             <Row>
              <Col md={{ size: '5' }}>
                <TransferTokens
                updateTransactions={actions.updateTransactions}
                />
                <br/>
                <br/>
              </Col>
            </Row>


              <br/>
              <br/>
              <Transactions transactions={transactions} updateTransactions={actions.updateTransactions} />
              <br/>
            <br/>
          </Col>
        </Container>
    );
  }
}

Crowdsale.propTypes = {
  transactions: PropTypes.array.isRequired,
  contractInfo: PropTypes.object.isRequired,
  //tokenPurchase: PropTypes.object.isRequired,
  tokenInfo: PropTypes.object.isRequired,
  //investorinfo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  contractInfo: state.contractInfo,
  tokenInfo: state.tokenInfo,
  //investorinfo: state.updateInvestorInfo 
  //tokenPurchase: state.tokenPurchase
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TransactionActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crowdsale);

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    background-color: whitesmoke;
    font-family: 'Roboto', sans-serif;
  }
`;
