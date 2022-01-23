// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract User {

    uint public age = 20; // state variable

    function setAge(uint _age) public {
        age = _age;
    }
}