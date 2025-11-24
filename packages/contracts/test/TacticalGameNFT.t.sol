// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import {TacticalGameNFT} from "../src/TacticalGameNFT.sol";

contract TacticalGameNFTTest is Test {
    TacticalGameNFT public nft;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        nft = new TacticalGameNFT();
    }

    function test_Mint() public {
        uint256 tokenId = nft.mint(user1);
        
        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), user1);
        assertEq(nft.balanceOf(user1), 1);
        assertEq(nft.totalSupply(), 1);
    }

    function test_MintMultiple() public {
        nft.mint(user1);
        nft.mint(user2);
        nft.mint(user1);
        
        assertEq(nft.balanceOf(user1), 2);
        assertEq(nft.balanceOf(user2), 1);
        assertEq(nft.totalSupply(), 3);
    }

    function test_RevertMintToZeroAddress() public {
        vm.expectRevert("Cannot mint to zero address");
        nft.mint(address(0));
    }
}
