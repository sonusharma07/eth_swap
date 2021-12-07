import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Token from '../abis/Token.json';
import EthSwap from '../abis/EthSwap.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      balance: '0',
      tokenContract: null,
      tokenBalance: '0',
      ethSwapContract: null,

    }
  }
  async componentWillMount() {
    await this.initWeb3()
    await this.initBlockchainData()
  }
  initBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const balance = await web3.eth.getBalance(accounts[0]);
    this.setState({ account: accounts[0], balance: balance });

    const web3NetworkId = await web3.eth.net.getId()
    const tokenData = Token.networks[web3NetworkId];
    if (tokenData) {
      const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address);
      const tokenBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
      this.setState({ tokenContract: tokenContract , tokenBalance: tokenBalance.toString() });
      console.log(tokenBalance.toString());
    } else {
      window.alert('Token contract not deployed to detected network.');
    }

    
    const ethSwapData = EthSwap.networks[web3NetworkId];
    if (ethSwapData) {
      const ethSwapContract = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      this.setState({ ethSwapContract: ethSwapContract });
    } else {
      window.alert('Token contract not deployed to detected network.');
    }
  }
  initWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                Hello workd!
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
