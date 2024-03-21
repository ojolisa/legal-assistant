import React from "react";
import styled from "styled-components";

function About() {
  return (
    <AboutContainer className="about-container">
      <AboutTextCard>
      <Subcontainer>
        <h2>About Us</h2>
        <p>
        Our AI assistant is designed to be your virtual legal companion, capable of providing reliable and up-to-date legal information specific to your unique circumstances. We leverage cutting-edge natural language processing and machine learning technologies to ensure that our responses are accurate, relevant, and easy to comprehend.
        </p>
        <LearnMoreButton>Learn More</LearnMoreButton>
      </Subcontainer>
      </AboutTextCard>
      <AboutImageCard>
        <img src="/images/About-image.jpg" alt="About Us" />
      </AboutImageCard>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
position: relative;
display: flex;
width: 90%;
height: auto;
padding-top: 47px;
left: 75px;
margin-bottom : 45px;

`;

const AboutTextCard = styled.div`
  background-color: #eceeb0;
  padding: 30px;
  border-radius: 10px;
  z-index: 2;
  flex: 1;
  text-align: left;
  transition: transform 0.3s ease;
  height: 80vh;
  margin-top: 43px;
  position: relative;
  left: 110px;
  border: 30px solid #d09b3a;
  border-style: ridge;
  padding: 192px 70px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Subcontainer = styled.div`

`;

const AboutImageCard = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    height: 90vh
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const LearnMoreButton = styled.button`
background-color: #ca65dc;
color: #fff;
padding: 10px 20px;
border: none;
border-radius: 5px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
    background-color: #b511dc;
  }
`;

export default About;
