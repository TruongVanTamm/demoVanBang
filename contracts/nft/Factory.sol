pragma solidity ^0.8.4;

import "./Model.sol";
import "../interface/IFactory.sol";
import "./Collection.sol";

contract Factory is IFactory, Model {
    function createCollection(
        string memory _name,
        string memory _sysbol,
        string memory _collectionCID
    ) external virtual override returns (address newCollection) {
        require(
            bytes(_name).length > 0 &&
                bytes(_sysbol).length > 0 &&
                bytes(_collectionCID).length > 0,
            "Invalid collection"
        );

        Collection _newCollection = new Collection(_name, _sysbol);

        return address(_newCollection);
    }
}
