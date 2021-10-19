const { BN, Long, bytes, units } = require('@zilliqa-js/util')
const { Zilliqa } = require('@zilliqa-js/zilliqa')
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto')

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com')
const config = require('./config.json')

// These are set by the core protocol, and may vary per-chain.
// You can manually pack the bytes according to chain id and msg version.
// For more information: https://apidocs.zilliqa.com/?shell#getnetworkid

const chainId = config.chainId // chainId of the developer testnet
const msgVersion = config.msgVersion // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion)

// Populate the wallet with an account
const privateKey = config.contractOwnerPK

zilliqa.wallet.addByPrivateKey(privateKey)

const address = getAddressFromPrivateKey(privateKey)
console.log(`My account address is: ${address}`)
console.log(`My account bech32 address is: ${toBech32Address(address)}`)

//IIFE self invoking
;(async function () {
  try {
    // Get Balance
    const balance = await zilliqa.blockchain.getBalance(address)
    // Get Minimum Gas Price from blockchain
    const minGasPrice = await zilliqa.blockchain.getMinimumGasPrice()

    // Account balance (See note 1)
    console.log(`Your account balance is:`)
    console.log(balance.result)
    console.log(`Current Minimum Gas Price: ${minGasPrice.result}`)
    const myGasPrice = units.toQa('1000', units.Units.Li) // Gas Price that will be used by all transactions
    console.log(`My Gas Price ${myGasPrice.toString()}`)
    const isGasSufficient = myGasPrice.gte(new BN(minGasPrice.result)) // Checks if your gas price is less than the minimum gas price
    console.log(`Is the gas price sufficient? ${isGasSufficient}`)

    // Deploy a contract
    console.log(`Deploying a new contract....`)
    const code = `scilla_version 0
    (* HelloWorld contract *)
    import ListUtils
    (***************************************************)
    (*               Associated library                *)
    (***************************************************)
    library HelloWorld
    let not_owner_code = Int32 1
    let set_hello_code = Int32 2
    (***************************************************)
    (*             The contract definition             *)
    (***************************************************)
    contract HelloWorld
    (owner: ByStr20)
    field welcome_msg : String = ""
    transition setHello (msg : String)
      is_owner = builtin eq owner _sender;
      match is_owner with
      | False =>
        e = {_eventname : "setHello()"; code : not_owner_code};
        event e
      | True =>
        welcome_msg := msg;
        e = {_eventname : "setHello()"; code : set_hello_code};
        event e
      end
    end
    transition getHello ()
        r <- welcome_msg;
        e = {_eventname: "getHello()"; msg: r};
        event e
    end`

    const init = [
      // this parameter is mandatory for all init arrays
      {
        vname: '_scilla_version',
        type: 'Uint32',
        value: '0',
      },
      {
        vname: 'owner',
        type: 'ByStr20',
        value: `${address}`,
      },
    ]

    const contract = zilliqa.contracts.new(code, init)

    // Deploy the contract.
    // Also notice here we have a default function parameter named toDs as mentioned above.
    // A contract can be deployed at either the shard or at the DS. Always set this value to false.
    const [deployTx, deployedContract] = await contract.deployWithoutConfirm(
      {
        version: VERSION,
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(10000),
      },
      false
    )

    // check the pending status
    const pendingStatus = await zilliqa.blockchain.getPendingTxn(deployTx.id)
    console.log(`Pending status is: `)
    console.log(pendingStatus.result)

    // process confirm
    console.log(`The transaction id is:`, deployTx.id)
    console.log(`Waiting transaction be confirmed`)
    const confirmedTxn = await deployTx.confirm(deployTx.id)

    console.log(`The transaction status is:`)
    console.log(confirmedTxn.receipt)
    if (confirmedTxn.receipt.success === true) {
      console.log(`Contract address is: ${deployedContract.address}`)
    }
  } catch (err) {
    console.log(err)
  }
})()
