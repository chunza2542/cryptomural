import styled from "styled-components";

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
    & a {
      color: white;
      margin-left: 12px;
      x &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const MyCollection = () => {
  return (
    <Container>
      {/* <Heading>Your Collection is Empty.</Heading> */}
      <Item>
        <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
        <div>
          <a>View on Exploror</a>
          <a>Download</a>
          <a>Share on Twitter</a>
        </div>
      </Item>
      <Item>
        <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
        <div>
          <a>View on Exploror</a>
          <a>Download</a>
          <a>Share on Twitter</a>
        </div>
      </Item>
      <Item>
        <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
        <div>
          <a>View on Exploror</a>
          <a>Download</a>
          <a>Share on Twitter</a>
        </div>
      </Item>
      <Item>
        <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
        <div>
          <a>View on Exploror</a>
          <a>Download</a>
          <a>Share on Twitter</a>
        </div>
      </Item>
      <Item>
        <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
        <div>
          <a>View on Exploror</a>
          <a>Download</a>
          <a>Share on Twitter</a>
        </div>
      </Item>
    </Container>
  );
};

export default MyCollection;
