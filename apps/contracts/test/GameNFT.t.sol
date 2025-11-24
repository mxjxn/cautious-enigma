// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../src/GameNFT.sol";

contract GameNFTTest is Test {
    GameNFT public gameNFT;
    address public player = address(0x1);

    function setUp() public {
        gameNFT = new GameNFT();
    }

    function testMintAchievement() public {
        uint256 achievementId = 1;
        gameNFT.mintAchievement(player, achievementId);
        assertEq(gameNFT.achievements(player), achievementId);
    }
}
