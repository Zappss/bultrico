pragma solidity ^0.4.15;

import "./MintableToken.sol";

contract SingleTokenCoin is MintableToken {
  string public constant name = "Butlr Token";
  string public constant symbol = "BTL";
  uint32 public constant decimals = 4;
}