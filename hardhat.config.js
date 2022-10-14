require("dotenv").config({ path: "./.env" });

require("@nomiclabs/hardhat-waffle");

require("@nomiclabs/hardhat-etherscan");




const pk_1 = process.env.REACT_APP_PRIVATE_KEY;

const { POLYGONSCAN_API_KEY } = process.env;



console.log(pk_1);

module.exports = {

  solidity: "0.8.4",

  networks: {

    klaytn: {

      url: process.env.KLAYTN_URL || "",

      gasPrice: 250000000000,

      accounts:

      pk_1 !== undefined ? [pk_1] : [],

    },

  },

  etherscan: {

    apiKey: POLYGONSCAN_API_KEY,

}

};