import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo src="/images/logo.jpg" alt=""></FooterLogo>
        <FooterLinks>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
      <FooterSocialIcons>
        <SocialIcon href="#" className="facebook">
          <i className="fa-brands fa-meta"></i>
        </SocialIcon>
        <SocialIcon href="#" className="twitter">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
        <SocialIcon href="#" className="instagram">
          <i className="fab fa-instagram"></i>
        </SocialIcon>
        <SocialIcon href="#" className="linkedin">
          <i className="fab fa-linkedin-in"></i>
        </SocialIcon>
      </FooterSocialIcons>
      <FooterCopyright>&copy; 2023 Legalify</FooterCopyright>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 30px 0;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FooterLogo = styled.img`
  height: 46px;
  width: 50px;
  max-height: 60px;
  border-radius: 50%;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const FooterSocialIcons = styled.div`
  font-size: 2rem;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

const SocialIcon = styled.a`
  font-family: "FontAwesome";
`;

const FooterCopyright = styled.div`
  font-size: 1rem;
  margin-top : 17px
`;


export default Footer;
