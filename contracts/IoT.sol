// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.7;

//will be deployed by iot account
contract Iot {
    //can only take value 1 or 0
    int8 public on;
    address public owner;

    event turnOn(int8 state);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setLed(int8 newOn) public payable onlyOwner {
        on = newOn;
        emit turnOn(on);
    }

    function readLed() public view returns (int8) {
        return on;
    }
}
