// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./comman/ERC721.sol";

contract mintContract is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 public feePercent = 2; //the fee percntage on sales
    address payable public feeAccount;
    mapping(uint256 => MarketItem) public marketItems;

    struct MarketItem {
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );
    event Bought(
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // function safeMint( address to, uint256 price, string memory name) public {

    // uint256 tokenId = _tokenIdCounter.current();
    // _safeMint(to, tokenId);

    // string[6] memory parts;
    // parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: black; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="white" /><text x="10" y="20" class="base">';
    // parts[1] = '</text><text x="10" y="40" class="base">';
    // parts[2] = toString(tokenId);
    // parts[3] = ' #';
    // parts[4] = name;
    // parts[5] = '</text></svg>';
    // string memory output = string(abi.encodePacked(parts[0],parts[1], parts[2], parts[3], parts[4], parts[5]));
    // output = string(abi.encodePacked(output));

    // string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "StoryPad #', toString(tokenId), '", "description": "This is author nft from storypad", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
    // output = string(abi.encodePacked('data:application/json;base64,', json));
    // _setTokenURI(tokenId, output);
    //         _tokenIdCounter.increment(); marketItems[tokenId] = MarketItem(
    // address(this),
    // tokenId,
    // payable(to),
    // payable(address(0)),
    // price,
    // false
    // );
    // emit MarketItemCreated(
    // address(this),
    // tokenId,
    // to,
    // address(0),
    // price
    // );
    // _tokenIdCounter.increment();
    // }

    function safeMint(address to, uint256 price) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        marketItems[tokenId] = MarketItem(
            address(this),
            tokenId,
            payable(to),
            payable(address(0)),
            price,
            false
        );
        _tokenIdCounter.increment();
        emit MarketItemCreated(address(this), tokenId, to, address(0), price);
        return tokenId;
    }

    function transferTokens(
        address from,
        address payable to,
        address token,
        uint256 amount
    ) public {
        if (token != address(0)) {
            IERC721(token).transferFrom(from, to, amount);
        } else {
            require(to.send(amount), "Transfer of ETH to receiver failed");
        }
    }

    function purchaseItem(uint256 tokenId, address to) external payable {
        uint256 _totalPrice = getTotalPrice(tokenId);
        MarketItem memory item = marketItems[tokenId];
        require(
            msg.value >= _totalPrice,
            "not enough matic to cover item price and market fee"
        );
        require(!item.sold, "item already sold");

        item.seller.transfer(item.price);
        item.sold = true;
        IERC721(item.nftContract).transferFrom(item.seller, to, tokenId);
        marketItems[tokenId].owner = payable(to);

        emit Bought(address(this), item.tokenId, item.price, item.seller, to);
    }

    function getTotalPrice(uint256 tokenId) public view returns (uint256) {
        return ((marketItems[tokenId].price * (100 + feePercent)) / 100);
    }
}

//library base64
library Base64 {
    bytes internal constant TABLE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(input, 0x3F))), 0xFF)
                )
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}
