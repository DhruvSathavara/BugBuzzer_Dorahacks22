// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./mintContract.sol";
  contract mintContractParent is Ownable {
    event TokenCreated(address, address);
    event TokenTransfered(address, address, address, uint256);
  uint getNFTCount;
    //mapping(address=>string) tokenNames;
mapping (address => uint256[] ) contractTokenIds;
    address[] tokenContracts;    
    function createToken(string memory name, string memory symbol) public {
        address _address = address(new mintContract(name, symbol)); // Created Token contract.
         //tokenNames[_address] = name;
        emit TokenCreated(msg.sender, _address);
    }
    function bulkMintERC721(
        address mintor,
        address tokenAddress,
        uint256 start,
        uint256 end,
        uint256 price
    ) public {
         uint256 count = 0;
        for (uint256 i = start; i < end; i++) {
          uint256 tokenId =  mintContract(tokenAddress).safeMint(mintor , price);
         
        contractTokenIds[tokenAddress].push(tokenId);
                          count++;
                      // mintContract(tokenAddress).safeMint(mintor , price, tokenNames[tokenAddress]); //for null address issue, we changed safeMint(msg.sender) to mintor
            }
        getNFTCount = count;

   }
   function getCountValue() public view returns(uint256){ 
    return getNFTCount; 
    }
function getAllTokenId(address tokenContractAddress) public view returns (uint[] memory){
    uint[] memory ret = new uint[](getNFTCount);
    for (uint i = 0; i < getNFTCount; i++) {
        ret[i] = contractTokenIds[tokenContractAddress][i];
    } 
    return ret;
}

//  function bulkSetURI(
//         address tokenAddress, 
//         uint256[] memory tokenIds,
//         uint256 start, 
//         uint256 end, 
//         string[] memory uris 
//     ) public {
//         for (uint256 i = start; i < end; i++) {
//           mintContract(tokenAddress).setTokenURI(tokenIds[i] , uris[i]);
//             }
//       }

      function callPurchaseItem(
         uint256 tokenId,
         address tokenAddress
      )public payable{
mintContract(tokenAddress).purchaseItem(tokenId,msg.sender);
      }
// function callURI(
//          address tokenAddress,
//          uint256 tokenId, 
//          string memory tokenURI
//      ) public {
//          mintContract(tokenAddress).setTokenURI( tokenId, tokenURI);
//      }
//  function getAll() public view returns (address[] memory){
//     address[] memory ret = new address[](getNFTCount);
//     for (uint i = 0; i < getNFTCount; i++) {
//         ret[i] = tokenContracts[i];
//     } 
//     return ret;
// }
    function transferToken(
        address from,
        address payable to,
        address token,
        uint256 amount
    ) public {
        mintContract(token).transferTokens(from, to, token, amount);
        emit TokenTransfered(from, to, token, amount);
    }
}