const { assert } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to withdraw and fund", async () => {
              const fundTxResponse = await fundMe.fund({ value: sendValue })
              await fundTxResponse.wait(1)
              const withdrawTxResponse = await fundMe.withdraw()
              await withdrawTxResponse.wait(1)

              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
