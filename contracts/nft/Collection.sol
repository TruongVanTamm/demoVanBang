// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Collection is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    AccessControl
{
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;
    using Address for address;

    string public constant CollectionBaseURI =
        "https://gateway.pinata.cloud/ipfs/";

    Counters.Counter private _tokenIdCounter;

    string public collectionCID;

    address private _contractHub;

    event NFTCreated(address owner, uint256 tokenID, string tokenCID);

    event CollectionRoyaltyRateChanged(
        uint256 previousRoyaltyRate,
        uint256 newRoyaltyRate
    );

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address owner, string memory tokenCID)
        public
        virtual
        returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, tokenCID);
        _tokenIdCounter.increment();
        return tokenId;
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        // get the number of token being hold by _owner
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // If _owner has no balance return an empty array
            return new uint256[](0);
        } else {
            // Query _owner's tokens by index and add them to the token array
            uint256[] memory tokenList = new uint256[](tokenCount);
            for (uint256 i = 0; i < tokenCount; i++) {
                tokenList[i] = tokenOfOwnerByIndex(_owner, i);
            }

            return tokenList;
        }
    }

    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked(_baseURI(), collectionCID));
    }

    function _baseURI() internal pure override returns (string memory) {
        return CollectionBaseURI;
    }

    /** The following functions are overrides required by Solidity. */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function updateCollectionCID(string memory newCID)
        public
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (bytes(newCID).length > 0) {
            collectionCID = newCID;
        }
    }
}
