# 🗿 CryptoMural



<img src="./example.gif" width="100%" style="border-radius: 20px;"/>



CryptoMural is an NFT generative art for your Twitter header using Flow Field pathfinding algorithm on Zilliqa blockchain.

[Try it yourself](https://cryptomural.web.app/) |  [Report a bug, request a feature or provide a feedback](https://github.com/chunza2542/cryptomural/issues)

## Demo Video

[![Demo Video](https://yt-embed.herokuapp.com/embed?v=TYfHlT0xnaE)](https://www.youtube.com/watch?v=TYfHlT0xnaE "Demo Video")

## How it works

### Minting

In this project, when user generate thier token, Javascript on browser will generate svg string base on Flow Field pathfinding algorithm then upload it to IPFS. After that, the IPFS url will be use for mint the token via contract on Zilliqa chain. As soon as the transaction complete, the image will be show on the interface. 

<img src="./mint.png" width="500px"/>

### Gallery exhibition (My Collection Page)

In this section, we use `@zilliqa-js/zilliqa` module to retrieve the contract state. We filter all token url with user's address from ZillPay wallet and then show it on screen.

## Roadmap

- [x] Develop the MVP
- [x] Launch on Zilliqa Testnet (+ gather feedback)
- [ ] Add more shapes and colors
- [ ] Create the community on Twitter
- [ ] Launch on Zilliqa Mainnet
- [ ] Launch a community project
  - E.g. art collaboration contest, CryptoMural giveaway 
- [ ] Develop and launch more features
  - E.g. login with Twitter and change the header directly on our site, our own marketplace, etc..
- [ ] Scale our project to other chains

---

Crafted with 🧡 by [@chunza2542](https://twitter.com/chunza2542) and [@tauhoo_ice](https://twitter.com/tauhoo_ice)
