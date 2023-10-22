// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MeteoriteNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    //Public mint state
    bool public mintActive = false;

    string uri;

    constructor()
        ERC721("MyToken", "MTK")
        Ownable(msg.sender)
    {}

    //----SET VARIABLES----//

    /**
    * @dev Sets public mint state.
    */
    function setMintState(bool val) external onlyOwner {
        mintActive = val;
    }

    /**
    * @dev Sets URI.
    */
    function setUri(string memory _uri) external onlyOwner {
        uri = _uri;
    }

    //-----END-----//

    function safeMint() public {
        require(
            mintActive,
            "Minting paused"
        );

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    //-----OVERRIDE FUNCTIONS-----//

    function _baseURI() internal view virtual override returns (string memory) {
        return uri;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? baseURI : "";
    }

    //-----END-----//
}