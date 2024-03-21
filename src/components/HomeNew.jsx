import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import About from "./About";
import { Link, useNavigate } from "react-router-dom";
import authcontext from "../context/authorization/Authcontext";
import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";

const HomeNew = (props) => {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [userDetails, setUserDetails] = useState({});
  const [menu, setMenu] = useState(false)

  const getUserDetails = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUserDetails(json);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handlescrolltoabout = (event) => {
    event.preventDefault();
    const element = document.querySelector(".about-container");
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Container>
        <Navbar>
          <Logo src="/images/logo.jpg" alt="logo" />
          <Navmenu>
            <ul>
              <li>
                <Menu href="/">HOME</Menu>
              </li>
              <li>
                <Menu href="/" onClick={handlescrolltoabout}>
                  ABOUT
                </Menu>
              </li>
              <li>
                <Menu href="/">SERVICES</Menu>
              </li>
              <li>
                <Menu href="/">CHATBOT</Menu>
              </li>
              {/* <li><Menu href='/'>MY PROFILE</Menu></li> */}
            </ul>
          </Navmenu>
          <div className="user__details">
            <span onClick={() => {
              setMenu(!menu)
            }}>
              {userDetails?.name}
              <BiChevronDown color="#fff" style={{
                marginLeft: '0.2rem',
                paddingTop: '0.2rem'
              }}/>
            </span>
            {menu === true && <div className="menu">
              <span>My profile</span>
              {!localStorage.getItem("token") ? (
                <form>
                  <Link to="/login">
                    <Login1>LOGIN</Login1>
                  </Link>
                </form>
              ) : (
                <Login1 onClick={handlelogout}>Logout</Login1>
              )}
            </div>}
          </div>
          {/* {!localStorage.getItem("token") ? (
            <form>
              <Link to="/login">
                <Login1>LOGIN</Login1>
              </Link>
            </form>
          ) : (
            <Login1 onClick={handlelogout}>LOGOUT</Login1>
          )} */}
          {/* <Dropdown autoclose>
            <Dropdown.Toggle>
              <Dropdown.Header>{userDetails?.name}</Dropdown.Header>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {
                navigate('/')
              }}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item>
                {!localStorage.getItem("token") ? (
                  <form>
                    <Link to="/login">
                      <Login1>LOGIN</Login1>
                    </Link>
                  </form>
                ) : (
                  <Login1 onClick={handlelogout}>LOGOUT</Login1>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Navbar>
        <Maincontent>
          <p>
            AI-POWERED
            <br /> <span>LEGAL ASSISTANT</span>
          </p>
          <div></div>
          <span className="details">GET SOLUTIONS FOT ALL YOUR LEGAL ISSUES HERE</span>
        </Maincontent>
      </Container>
      <About />
    </>
  );
};

const Container = styled.div`
background-image: url(https://images.pexels.com/photos/1292843/pexels-photo-1292843.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1);
background-position: bottom;
background-repeat: no-repeat;
height: 100vh;
width: 100%;
background-size: cover;
background-color: rgb(52 52 52 / 64%);
background-blend-mode: overlay;

}
`;

const Navbar = styled.nav`
  display: flex;
  height: 55px;
  width: 100%;
  justify-content: space-between;
`;

const Logo = styled.img`
  max-height: 60px;
  height: 46px;
  width: 50px;
  position: absolute;
  left: 14px;
  top: 10px;
  border-radius: 50%;
`;

const Navmenu = styled.div`
  ul {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;
    position: absolute;
  }

  li {
    list-style: none;
    padding: 0px 21px;
    // font-weight: bold;
    letter-spacing: 2.8px;
    line-height: 2.5;
  }
`;

const Menu = styled.a`
  position: relative;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: white;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  // &:hover {
  //   // color: black;
  // }

  &:hover:before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Login1 = styled.button`
    // position: absolute;
    // top: 14px;
    // right: 50px;
    // height: 50px;
    // width: 100px;
    // font-size: 18px;
    // font-weight: bold;
    // letter-spacing: 1.8px;
    // border: 2px solid black;
    // border-radius: 9px;
    // background-color : #f9f9f9;
    // color : #000;
    color: #797979;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    background: none;
    border: none;
    padding: 0;
    
    // &:hover{
    //   border : 1px solid white;
    //   background-color: black;
    //   color: white;
    //   cursor : pointer;
    // }

    // @media only screen and (max-width : 995px){
    //   display : none;
    // }
    // if(Login1.)
`;

const Maincontent = styled.section`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
  margin-left: 65px;
  flex-direction: column;

  div {
    width: 54rem;
    background: orange;
    height: 0.3rem;
    margin-bottom: 0.9rem;
  }

  .details {
    color: white;
    font-size: 1.8rem;
  }

  p {
    font-size: 5rem;
    color: #efe5e4;
    letter-spacing: 3.08px;
    overflow: hidden;
    margin-top: 13rem;
    line-height: 5rem;
    margin-bottom: 0.9rem;

    @media only screen and (min-width: 1000px) and (max-width: 1400px) {
      font-size: 75px;
    }
    @media only screen and (min-width: 675px) and (max-width: 1000px) {
      font-size: 60px;
    }
    @media only screen and (max-width: 675px) {
      font-size: 40px;
    }
  }
`;
export default HomeNew;
