const fs = require('fs')
const { Long, bytes, units } = require('@zilliqa-js/util')
const { Zilliqa } = require('@zilliqa-js/zilliqa')
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto')

const config = require('./config.json')
const zilliqa = new Zilliqa(config.network)
const address = getAddressFromPrivateKey(config.privateKey)
const sourceCode = fs.readFileSync(config.src, 'utf8')
const VERSION = bytes.pack(config.chainId, config.msgVersion)
const myGasPrice = units.toQa('1000', units.Units.Li)

zilliqa.wallet.addByPrivateKey(config.privateKey)

console.log(`My account address is: ${address}`)
console.log(`My account bech32 address is: ${toBech32Address(address)}`)

const init = [
  // this parameter is mandatory for all init arrays
  {
    vname: '_scilla_version',
    type: 'Uint32',
    value: '0',
  },
  //   {
  //     vname: 'owner',
  //     type: 'ByStr20',
  //     value: `${address}`,
  //   },
]

const contract = zilliqa.contracts.new(sourceCode, init)

;(async function () {
  try {
    const [deployTx, deployedContract] = await contract.deployWithoutConfirm(
      {
        version: VERSION,
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(10000),
      },
      false
    )

    console.log(deployTx)

    const pendingStatus = await zilliqa.blockchain.getPendingTxn(deployTx.id)
    console.log(`Pending status is: `)
    console.log(pendingStatus.result)

    console.log(`The transaction id is:`, deployTx.id)
    console.log(`Waiting transaction be confirmed`)
    const confirmedTxn = await deployTx.confirm(deployTx.id)

    console.log(`The transaction status is:`)
    console.log(confirmedTxn.receipt)
    if (confirmedTxn.receipt.success === true) {
      console.log(`Contract address is: ${deployedContract.address}`)
    } else {
      console.log('Deploy fail')
    }
  } catch (error) {
    console.log(error)
  }
})()
