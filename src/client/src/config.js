import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


// Replace '' with a real account from ganache
let account0 = '0xa472740332026D3C369627Ce3638CC27ef642566'

// Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
let ratingABI =[{"inputs":[{"internalType":"string[]","name":"_moviesList","type":"string[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"moviesList","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"addNewMovie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"getTotalVotes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMovieLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMovieList","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]// Replace ''  with rating address obtained by truffle console
let ratingAddress='0xd08B64860d68788D234d0C5a1C9ed17E229bc963'
// Initialize the rating contract with web3
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const ratingContract=new web3.eth.Contract(ratingABI, ratingAddress)

export {ratingContract, account0};
