import styled from "styled-components";
import { useState, useEffect } from "react";
import nodeToDataURL from 'html-element-to-image'

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

  const onDownload = (url:string) => async (e:any) => {
    const c = document.createElement("canvas");
    c.setAttribute("width", "3000px")
    c.setAttribute("height", "1000px")
    const ctx:any = c.getContext("2d")

    const i:any = document.createElement("img");
    i.setAttribute("src", url)
    i.setAttribute("width", "3000px")
    i.setAttribute("height", "1000px")

    i.crossOrigin = "anonymous"
    
    i.onload = () => {
      ctx.drawImage(i, 10, 10)

      console.log(c.toDataURL("image/png"));
      c.remove()
      i.remove()
    }

    i.onerror = () => {
      c.remove()
      i.remove()
    }
  }
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
              <span onClick={onDownload(url)} style={{"cursor": "pointer"}}>Download</span>
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
