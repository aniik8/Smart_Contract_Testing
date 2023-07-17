const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
// const { ethers } = require('hardhat');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();

    const [owner, addr] = await ethers.getSigners();
    let withdrawAmount = ethers.parseUnits('1', 'ether');
    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, addr, withdrawAmount};
  }

//   it('should deploy and set the owner correctly', async function () {
//     const { faucet, owner, withdrawAmount} = await loadFixture(deployContractAndSetVariables);

//     expect(await faucet.owner()).to.equal(owner.address);
//   });
//   it('should withdraw the amount from the owner to the sender', async () => {
//     const { faucet, owner, withdrawAmount} = await loadFixture(deployContractAndSetVariables);
//     // const amount = faucet.withdraw(10);
//     expect(await faucet.withdraw(withdrawAmount)).to.be.reverted;
//   });
  it('should be called by the owner only', async () => {
    const {faucet, owner, addr} = await loadFixture(deployContractAndSetVariables);
    expect(faucet.connect(owner).withdrawAll()).to.be.revertedWith("only owner can call");
    
    console.log(owner.address + " " + addr.address);
  });
  });
// });