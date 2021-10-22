import styled from "styled-components";
import DownloadButton from "../common/DownloadButton";
import { useState, useEffect } from "react";
import CONTRACT from "../constants/Contract";
import Image from "../common/Image";
import TwitterShareButton from "../common/TwitterShareButton";

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
  overflow: hidden;

  & img {
    width: 100%;
  }
  & > div {
    padding: 12px;
    text-align: right;
    & a {
      color: white;
      margin-left: 12px;
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
`;

const MyCollection = () => {
  const [tokenList, setTokenList] = useState<any[]>([])
  const [downloading, setDownloading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const addr = window.zilPay.wallet.defaultAccount.base16
      const contract = window.zilPay.contracts.at(CONTRACT.address)
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
      setDownloading(false)
    })()
  },[])

  return (
    <Container>
      {!downloading && tokenList.length === 0 && <Heading style={{textAlign: "center"}}>Your Collection is Empty.</Heading>}
      {downloading && <Heading style={{textAlign: "center"}}>Downloading... <i style={{fontSize: '16px'}} className="fas fa-circle-notch fa-spin"></i></Heading>}
      {
        tokenList.map(([url, key])=>{
          return <Item key={key}>
            <Image url={url}/>
            <div>
              <a href={`https://viewblock.io/zilliqa/address/${CONTRACT.address}?txsType=nft&specific=${key}&network=testnet`} target="_blank">View on Exploror</a>
              <DownloadButton url={url}></DownloadButton>
              <TwitterShareButton url={url} key={key}/>
              {/* <a href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank">Share on Twitter</a> */}
            </div>
          </Item>
       }
      )
      }
    </Container>
  );
};

export default MyCollection;
