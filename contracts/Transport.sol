// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Automatic payment execution for truck drivers
/// @author Thuy Tien Nguyen Thi
/// @notice You can use this contract for only the most basic simulation

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Transport is Ownable {
    address public driverId;

    struct Driver {
        string name;
        State state;
        address _driverId; //to distinguish from global variable and avoid shadowing
    }

    ///@notice Event Logs for different states of driver
    event LogWaiting(string state);
    event LogArrived(string state);
    event LogDeparted(string state);

    event Registered(address _driverId, string message);

    enum State {
        waiting,
        departed,
        arrived
    }

    mapping(address => Driver) public drivers;

    constructor() onlyOwner {}

    ///@notice When driver registers, their state is set to waiting
    function setDriver(string memory _name) public returns (bool) {
        driverId = msg.sender;
        drivers[driverId] = Driver({
            name: _name,
            state: State.waiting,
            _driverId: driverId
        });
        emit Registered(driverId, "Driver registered");
        emit LogWaiting("Waiting");
        return true;
    }

    ///@notice gets current driver who makes the call
    function getDriver()
        public
        view
        returns (
            string memory name,
            uint256 state,
            address _driverId
        )
    {
        name = drivers[driverId].name;
        state = uint256(drivers[driverId].state);
        _driverId = driverId;
        return (name, state, _driverId);
    }

    function changeStateDeparted() public onlyOwner {
        drivers[driverId].state = State.departed;
        emit LogDeparted("Departed");
    }

    function changeStateArrived() public onlyOwner {
        drivers[driverId].state = State.arrived;
        emit LogArrived("Arrived");
    }

    ///@notice send Payment to driver
    ///@notice function not used in contract as the contract itself received the funds,
    ///@notice which was intended for the driver account
    function sendPayment(address payable _driverId) public payable {
        (bool sent, bytes memory data) = _driverId.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}
