// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MeteoriteToken is ERC20, Ownable {
    constructor()
        ERC20("Meteorite", "MTO")
        Ownable(msg.sender)
    {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount * uint256(10)**decimals());
    }
}