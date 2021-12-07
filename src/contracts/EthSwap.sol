// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Token.sol";
contract  EthSwap {
    string public name = "Eth Swap";
    Token public token;
    uint rate = 100;
    event TokenPurchaged(
        address account,
        address token,
        uint amount,
        uint rate
    );
    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );
    constructor(Token _token) {
        token = _token;
    }
    function buyTokens() public payable {
        uint numberOfToken = msg.value * rate;
        require(token.balanceOf(address(this)) >= numberOfToken);
        token.transfer(msg.sender, numberOfToken);
        emit TokenPurchaged(msg.sender,address(token),msg.value,rate);
    }
     function sellTokens(uint _numberOfTokens) public payable{
        uint ethAmount = _numberOfTokens / rate;
        token.transferFrom(msg.sender,address(this), _numberOfTokens);
        payable(msg.sender).transfer(ethAmount);
        emit TokenSold(msg.sender,address(token),msg.value,rate);
    }
}