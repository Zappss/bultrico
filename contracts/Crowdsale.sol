pragma solidity ^0.4.15;

import "./Ownable.sol";
import "./SingleTokenCoin.sol";


contract Crowdsale is Ownable {
  using SafeMath for uint256;
    
  // The token being sold
  //SingleTokenCoin public token = SingleTokenCoin(0x21425ce239ad792a2afc7be113454f3a0599730a);
  SingleTokenCoin public token;

  // start and end timestamps where investments are allowed (both inclusive)
  uint256 public startTime;
  uint256 public endTime;

  // address where funds are collected
  address private wallet;
  address public crowdsale_contract;

  address[] public investors_number;

  // how many token units a buyer gets per wei
  uint256 private rate;
  uint256 private fract_rate;
  
  uint256 private minPurch;  
  uint256 private price_for_eth;

  // amount of raised money in wei
  uint256 public weiRaised;
  uint256 public hardCap;
  uint256 public allEmission;
  
  uint256 private leftovers;
  
  bool public ico_goes;
    
    mapping (address => uint256) contributors;
    
  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


  function Crowdsale() {
    ico_goes = true;
    crowdsale_contract = this;
    startTime = now;
    endTime = now.add(30 * 1 days);
    wallet = 0xCC209e755111f85B6ef6415790be1DF248Eb8666;    // ethan wallet
    //wallet = 0xda8B23BC965D1281a374C065BFd7Fd3A3dC377C8; 
    //wallet = 0xBf9D72928b9FcD6de2f5bFD5E98E63d6c2C7f7e0;

    price_for_eth = 60000000;       // 1 eth = 3000+(4dec)
    rate = 166666666677777;         // wei per 1 token
    fract_rate = 16666666667;       // wei per 0.0001 token
    
    allEmission = 25000000E4;
    hardCap = 20000000E4;
    minPurch = 10E15;
    
    /*initialize token contract*/
    token = createTokenContract();
    

  }

  // creates the token to be sold.
  // override this method to have crowdsale of a specific mintable token.
  function createTokenContract() internal returns (SingleTokenCoin) {
    return new SingleTokenCoin();
  }

  // fallback function can be used to buy tokens
  function () payable {
    buyTokens(msg.sender);
  }
    
  // low level token purchase function
  function buyTokens(address beneficiary) public payable {
    require(beneficiary != 0x0);
    require(validPurchase());
    require(!hasEnded());
    
    uint256 weiAmount = msg.value;

    // check if the buyer exceeded the funding goal
    token_calc_and_distrib (beneficiary, weiAmount);
}
  
  /*-------------------------------------------
  functino to calculate purchase conditions
  -------------------------------------------*/

  function token_calc_and_distrib (address _beneficiary, uint256 _weiAmount) internal {
      require (!hasEnded());    // needed?????????
      uint256 _tokens;
      uint256 curPruchase = _weiAmount;
      
      if (curPruchase >= 10000000000000000000) {
          _tokens = curPruchase.div(fract_rate).mul(11).div(10);
      } else 
      _tokens = curPruchase.div(fract_rate);
      
      leftovers = hardCap.sub(token.totalSupply());
    
      if (_tokens <= leftovers) {        // check if buyer can solve all our needs
      
            uint256 surrender = _weiAmount.mod(fract_rate);     // calc the surrender
            uint256 clean_weiAmount = _weiAmount.sub(surrender);    // calc how much to receive
            
            if (contributors[_beneficiary] == 0){
                investors_number.push(_beneficiary);
            }
            
            contributors[_beneficiary] = contributors[_beneficiary].add(clean_weiAmount);
            
            _beneficiary.transfer(surrender);       // sending back to msg.sender his surrend
    
            weiRaised = weiRaised.add(curPruchase); // add to the statistic of received funds
            
            token.mint(_beneficiary, _tokens);          // mint tokens to buyer wallet
            
            leftovers = hardCap.sub(token.totalSupply());       //renew leftovers
            
            TokenPurchase(msg.sender, _beneficiary, _weiAmount, _tokens);   // call the event
            
            forwardFunds(clean_weiAmount);      // receiving funds from investor
            
      } else  {
          
          uint256 to_receive = leftovers.mul(fract_rate); //how much to get from investor
          
          surrender = curPruchase.sub(to_receive);       // calc how much eth to send back
          forwardFunds(to_receive);                 // receiving funds 
          
          if (contributors[_beneficiary] == 0){
                investors_number.push(_beneficiary);
          }
          
          contributors[_beneficiary] = contributors[_beneficiary].add(to_receive);
          
          _beneficiary.transfer(surrender);        // sending back the surrender
          
          token.mint (_beneficiary, leftovers);     // mint all leftovers to investor
            
          if (token.balanceOf(_beneficiary) != 0) {
                investors_number.push(_beneficiary);
          }
      }
  }
  
  // send ether to the fund collection wallet
  // override to create custom fund forwarding mechanisms
  function forwardFunds(uint256 _amount_toTransfer) internal {
    wallet.transfer(_amount_toTransfer);
  }
  
  // @return true if the transaction can buy tokens
  function validPurchase() internal returns (bool) {
    bool withinPeriod = now >= startTime && now <= endTime;
    bool nonZeroPurchase = msg.value != 0;
    bool enoughSize = msg.value >= minPurch;
    return withinPeriod && nonZeroPurchase && enoughSize;
  }

  // @return true if crowdsale event has ended
  function hasEnded() public constant returns (bool) {
    bool tokensSold = check_and_change_ico();
    return tokensSold;
  }
  
  function hasEnded_2(uint256 amount) internal returns (bool) {
      bool minting_finished = check_and_change_minting(amount);   // checks if the minting available
      return minting_finished;
  }
  
  function check_and_change_ico () internal returns (bool) {
      if (token.totalSupply() >= hardCap){
          ico_goes = false;
          return true;
      } else 
        return false;
  }
  
  function check_and_change_minting (uint256 amount) internal returns (bool) {
    if (token.totalSupply() == allEmission) {
      token.finishMinting();
      return true;
    } 
        else if (allEmission <= token.totalSupply().add(amount))
            return true;
    else 
        return false;
  }
  
  function mint (address _to, uint256 amount) onlyOwner {
      require(!hasEnded_2(amount));
      token.mint(_to, amount);
  }

  function getLeftToken () public constant returns (uint256 _leftToken) {
    return hardCap.sub(token.totalSupply());
  }

  function getInvestorCount () public constant returns (uint256 _investorCount) {
    return investors_number.length;
  }

  function getInvestorsTokens (address _investor) public constant returns (uint256 _amount) {
    return token.balanceOf(_investor);
  }

  function setTransferOwnership (address _to) public {
    transferOwnership(_to);
  }

 } 