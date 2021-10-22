import { useState, useEffect } from "react";
import { encodeSVGtoURL } from "../utils/generator";
import example from "../datasources/example";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 36px;
  color: white;
  border-left: 0.5px solid rgb(80, 80, 80);
  border-right: 0.5px solid rgb(80, 80, 80);
  position: relative;

  & p {
    font-size: 1.4rem;
    margin: 0;
  }
`;
const HeaderPicture = styled.img`
  width: 100%;
  height: 200px;
  background: black;
`;
const ProfilePicture = styled.img`
  width: 145px;
  border-radius: 50%;
  border: 5px solid rgb(40, 40, 40);
  transform: translateX(16px);
  margin-top: calc(-145px / 2);
`;
const FollowButton = styled.div`
  background: white;
  display: inline-block;
  color: rgb(40, 40, 40);
  font-family: sans-serif;
  font-weight: 600;
  border-radius: 5rem;
  padding: 7px 16px;
  font-size: 16px;
  position: absolute;
  cursor: pointer;

  right: 16px;
  margin-top: 12px;
`;

const Example = () => {
  const [image, setImage] = useState(encodeSVGtoURL(example[0]));

  useEffect(() => {
    setInterval(() => {
      const index = Math.floor(Math.random() * example.length);
      setImage(encodeSVGtoURL(example[index]));
    }, 2000);
  }, []);

  return (
    <Container>
      <HeaderPicture src={image} />
      <ProfilePicture src="https://www.larvalabs.com/cryptopunks/cryptopunk4557.png" />
      <FollowButton>Follow</FollowButton>
    </Container>
  );
};

export default Example;
