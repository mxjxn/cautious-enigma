// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {TacticalGameNFT} from "../src/TacticalGameNFT.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        TacticalGameNFT nft = new TacticalGameNFT();
        console.log("TacticalGameNFT deployed at:", address(nft));

        vm.stopBroadcast();
    }
}
