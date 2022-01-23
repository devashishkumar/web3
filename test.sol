// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {

    uint public age = 10; // state variable

    function setAge(uint _age) public {
        age = _age;
    }
}