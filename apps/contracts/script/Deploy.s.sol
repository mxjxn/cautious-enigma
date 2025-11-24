// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/GameNFT.sol";
import "../src/GameRewards.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy contracts
        GameNFT gameNFT = new GameNFT();
        GameRewards gameRewards = new GameRewards();

        console.log("GameNFT deployed at:", address(gameNFT));
        console.log("GameRewards deployed at:", address(gameRewards));

        vm.stopBroadcast();
    }
}
