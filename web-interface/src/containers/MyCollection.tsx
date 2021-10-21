import styled from "styled-components";
import DownloadButton from "../common/DownloadButton";
import { useState, useEffect } from "react";

const Container = styled.div`
  margin-top: 36px;
  color: white;

  & p {
    font-size: 1.4rem;
    margin: 0;
  }
`;
const Heading = styled.div`
  color: #aaa;
`;
const Item = styled.div`
  border: 1px solid #ccc;
  border-radius: 7px;
  margin-bottom: 24px;

  & img {
    width: 100%;
  }
  & > div {
    padding: 12px;
    text-align: right;
    & * {
      color: white;
      margin-left: 12px;
      x &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const MyCollection = () => {
  const [tokenList, setTokenList] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const addr = window.zilPay.wallet.defaultAccount.base16
      const contract = window.zilPay.contracts.at("0xed54ee4fc27fcafb038c76c010950d72f3bc2ed1")
      const data = await contract.getState()
      const {token_owners, token_uris} = data
      console.log(data);
      
      const list = []
      for (let [key, url] of Object.entries(token_uris)) {
        const owner = token_owners[key];
        console.log(owner.toUpperCase(), addr,owner === addr);
        if (owner === addr.toLocaleLowerCase()) 
          list.push([url, key])
      }

      console.log(list);
      setTokenList(list)
    })()
  },[])

  return (
    <Container>
      {tokenList.length === 0 && <Heading style={{textAlign: "center"}}>Your Collection is Empty.</Heading>}
      {
        tokenList.map(([url, key])=>{
          const text = encodeURIComponent("Hello, this is my nft - " + url)
          return <Item key={key} id="ice">
            <img src={url}/>
            <div >
              <a href={`https://viewblock.io/zilliqa/address/0xed54ee4fc27fcafb038c76c010950d72f3bc2ed1?txsType=nft&specific=${key}&network=testnet`} target="_blank">View on Exploror</a>
              {/* <span onClick={onDownload(url)} style={{"cursor": "pointer"}}>Download</span> */}
              <DownloadButton url={url}></DownloadButton>
              <a href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank">Share on Twitter</a>
            </div>
          </Item>
       }
      )
      }
    </Container>
  );
};

export default MyCollection;
