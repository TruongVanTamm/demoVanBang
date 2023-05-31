// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Model.sol";
import "../interface/ICollection.sol";

contract Manager is Model {
    struct DataDip {
        uint256 tokenId;
        address collection;
        string studenId;
        string dipId;
        string nftCID;
    }

    mapping(string => DataDip) public listDataDipFlStudenId;
    mapping(string => DataDip) public listDataDipFlDipId;
    mapping(uint256 => DataDip) public listDataDipFlTokenId;
    event CreateNFTEvent(
        uint256 tokenId,
        address collection,
        string studenId,
        string dipId,
        string nftCID
    );

    function createNFT(
        address collection,
        string memory studenId,
        string memory dipId,
        string memory nftCID
    ) external onlyAdmin {
        require(bytes(nftCID).length > 0, "nftCID > 0");

        uint256 tokenId = ICollection(collection).safeMint(msg.sender, nftCID);

        listDataDipFlDipId[dipId] = DataDip({
            tokenId: tokenId,
            collection: collection,
            studenId: studenId,
            dipId: dipId,
            nftCID: nftCID
        });

        listDataDipFlStudenId[studenId] = DataDip({
            tokenId: tokenId,
            collection: collection,
            studenId: studenId,
            dipId: dipId,
            nftCID: nftCID
        });

        listDataDipFlTokenId[tokenId] = DataDip({
            tokenId: tokenId,
            collection: collection,
            studenId: studenId,
            dipId: dipId,
            nftCID: nftCID
        });

        emit CreateNFTEvent(tokenId, collection, studenId, dipId, nftCID);
    }

    function removeNFT(uint256 tokenId) external onlyAdmin {
        DataDip storage data = listDataDipFlTokenId[tokenId];
        string memory studenId = data.studenId;
        string memory dipId = data.dipId;

        delete listDataDipFlDipId[dipId];
        delete listDataDipFlStudenId[studenId];
        delete listDataDipFlTokenId[tokenId];
    }

    function searchWithStudentId(string memory studenId)
        external
        view
        returns (uint256)
    {
        return listDataDipFlStudenId[studenId].tokenId;
    }

    function searchWithDipId(string memory dipId)
        external
        view
        returns (uint256)
    {
        return listDataDipFlDipId[dipId].tokenId;
    }
}
