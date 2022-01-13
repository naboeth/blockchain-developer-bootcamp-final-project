// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IoT.sol"; //https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d

contract Transport is Ownable {
    /// @notice Register driver
    //truck driver, can receive ether
    address public driverId;

    struct Driver {
        string name;
        State state;
        address _driverId; //to distinguish from global variable and avoid shadowing
    }

    event LogWaiting(string state);
    event LogArrived(string state);
    event LogDeparted(string state);
    event Registered(address _driverId, string message);

    ///state of Truck Driver
    enum State {
        waiting,
        departed,
        arrived
    }

    //contract which can receive ether must at least have a fallback or receive function
    //external = contract can only be called from outside and not inside functions within the contract
    //fallback() external payable;

    ///table address to Driver
    ///saves all drivers ever registered
    mapping(address => Driver) public drivers;

    ///driverId will be injected via MetaMask
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

    //no argument as driverId is a global variable
    //driverId included cuz when other address calls
    //gets Current driver who makes the call
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

    function sendPayment(address payable _driverId) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        //(bool sent, bytes memory data) = _driverId.call{value: msg.value}("");
        (bool sent, bytes memory data) = _driverId.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    constructor() onlyOwner {}
}
