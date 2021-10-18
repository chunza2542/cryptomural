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
  return (
    <Container>
      <HeaderPicture src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
      <ProfilePicture src="https://pbs.twimg.com/profile_images/1431786039555682312/e65h-F_W_200x200.jpg" />
      <FollowButton>Follow</FollowButton>
    </Container>
  );
};

export default Example;
