import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import Typewriter from "./Typewriter";
import { useNavigate } from "react-router-dom";
// import Typewriter from "typewriter-effect";
// import { Typewriter } from 'react-simple-typewriter'

const Chatbot = () => {
  const host = "http://localhost:5000";
  const [userDetails, setUserDetails] = useState({});
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState([1]);
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState([]);
  const [relevantCase, setRelevantCase] = useState([]);
  const [queryGiven, setQueryGiven] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [dummyResponse, setDummyResponse] = useState([]);
  const [dummyQuery, setDummyQuery] = useState([]);
  const [actualQueries, setActualQueries] = useState([]);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [dummyCurrentQuery, setDummyQueryResponse] = useState("")

  const getArticle = async (query, index) => {
    axios
      .post(`${host}/get-response`, {
        query: query,
        systemPrompt:
          "You are a lawyer, with complete knowledege of indian constitution. A user provides you with some input and you inform the user articles from the indian constitution that the input violates or is relevant to the input. Your only response can be an article out of indian constitution.",
        maxTokens: 300,
        minTokens: -1,
      })
      .then((res) => {
        // setArticle(res.data);
        setArticle((article) => [...article, res.data]);
        setDummyResponse((dummyResponse) => [...dummyResponse, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRelevantCase = async (query, index) => {
    axios
      .post(`${host}/get-response`, {
        query: query,
        systemPrompt:
          "You are a lawyer from India, who knows a lot of law cases. The only response you will provide the user is a law case which is relevant to the user's input. Your only output can be two relevant legal cases.",
        maxTokens: 500,
        minTokens: -1,
      })
      .then((res) => {
        // setRelevantCase(res.data);
        setRelevantCase((relevantCase) => [...relevantCase, res.data]);
        setDummyResponse((dummyResponse) => [...dummyResponse, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDocument = async (query, index) => {
    axios
      .post(`${host}/get-response`, {
        query: query,
        systemPrompt:
          "You are a lawyer from india, with knowledge of legal documents required in a situation. Your only response can be a list of legal documents reuired in the situation mentioned in the prompt. You will just provide a list of documents and their explanation and where can I obtain them and no other text.",
        maxTokens: 600,
        minTokens: 1200,
      })
      .then((res) => {
        setDocuments((documents) => [...documents, res.data]);
        setDummyResponse((dummyResponse) => [...dummyResponse, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllChats = async () => {
    const response = await fetch(`${host}/api/auth/get-all-responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userId: localStorage.getItem("loginId"),
      },
    });
    const json = await response.json();
    setChats(json);
  };

  const postQuery = async () => {
    await axios
      .post(`${host}/api/auth/save-chat`, {
        query: dummyCurrentQuery,
        response: article + relevantCase + documents,
        userId: localStorage.getItem("loginId"),
      })
      .then((res) => {
        console.log(res);
        setDummyResponse([]);
        getAllChats()
        setDummyQueryResponse("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      article !== "" &&
      relevantCase !== "" &&
      documents !== "" &&
      dummyResponse.length > 0
    ) {
      postQuery();
      setDummyResponse([]);
    }
  }, [article, relevantCase, documents, dummyResponse]);


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

  const getCurrentChat = async (id) => {
    const response = await fetch(`${host}/api/auth/get-specific-response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        chatId: id,
      },
    });
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    getUserDetails();
    getAllChats();
  }, []);

  const returnText = (index) => {
    if (
      queryGiven === true &&
      article === "" &&
      relevantCase === "" &&
      documents === ""
    ) {
      return "";
    } else {
      let response =
        (article[index] ? article[index] : "") +
        (relevantCase[index] ? relevantCase[index] : "") +
        (documents[index] ? documents[index] : "");
      return response;
    }
  };

  console.log(window.location);

  return (
    <Chatcontainer>
      <Sidemenu>
        <Newchatbtn
          onClick={() => {
            if (window.location.pathname === "/chatbot") {
              window.location.reload();
            } else {
              navigate(`/chatbot`);
            }
          }}
        >
          <span>+</span>
          New Chat
        </Newchatbtn>
        <div className="all__chats">
          {chats?.map((item, index) => {
            return (
              <div
                className="curr__chat"
                onClick={() => {
                  navigate(`/chatbot/${item?._id}`);
                }}
              >
                <span>{item?.query?.substring(0, 27)}...</span>
              </div>
            );
          })}
        </div>
      </Sidemenu>
      <Chatsection>
        {data.map((item, index) => {
          return (
            <ChatLog>
              <Chatquestion>
                <Messagecenter>
                  <ProfileAvatar></ProfileAvatar>
                  <Message>
                    {queryGiven === false
                      ? "Ask your Question?"
                      : actualQueries[index]}
                  </Message>
                </Messagecenter>
              </Chatquestion>
              <Chatresponce>
                <Messagecenter>
                  <AiAvatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={41}
                      height={41}
                      fill="none"
                      className="icon-md"
                    >
                      <text x={-9999} y={-9999}>
                        {"ChatGPT"}
                      </text>
                      <path
                        fill="currentColor"
                        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                      />
                    </svg>
                  </AiAvatar>
                  <Message>
                    {queryGiven === true &&
                      article[index] === undefined &&
                      relevantCase[index] === undefined &&
                      documents[index] === undefined && (
                        <Typewriter
                          text={"Thinking..."}
                          delay={110}
                        />
                      )}
                    {/* {article[index] !== undefined ||
                      relevantCase[index] !== undefined ||
                      documents[index] !== undefined
                      ? actualQueries[index]
                        ? actualQueries[index] + ":"
                        : ""
                      : ""} */}

                    <Typewriter text={returnText(index)} delay={70} />
                  </Message>
                </Messagecenter>
              </Chatresponce>
            </ChatLog>
          );
        })}

        <input
          type="text"
          name="texthoder"
          placeholder="Send Your Message"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value !== "") {
              setDummyQueryResponse(e.target.value)
            }
            let dummyQeries = [...dummyQuery];
            dummyQeries[data.length - 1] = e.target.value;
            setDummyQuery(dummyQeries);
          }}
        />
        {/* <i className="fa-solid fa-microphone"></i> */}
        <i
          className="fa-solid fa-paper-plane"
          onClick={() => {
            setActualQueries((actualQueries) => [...actualQueries, query]);

            let dummyQeries = [...dummyQuery];
            dummyQeries[data.length - 1] = "";
            setDummyQuery(dummyQeries);

            getArticle(query, data.length - 1);
            getRelevantCase(query, data.length - 1);
            getDocument(query, data.length - 1);
            setQueryGiven(true);

            setQuery("");

            if (article[data.length - 1]) {
              setData((data) => [...data, 1]);
            }
          }}
        ></i>
      </Chatsection>
    </Chatcontainer>
  );
};

const Chatcontainer = styled.div`
  background-color: rgba(52, 53, 65);
  height: 100vh;
  width: 100%;
  display: flex;
  color: white;
  text-align: center;
`;

const Sidemenu = styled.aside`
  background-color: rgb(32 33 35);
  width: 330px;
  padding: 10px;
`;

const Newchatbtn = styled.div`
  padding: 12px;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: left;
  font-size: 17px;
  margin-top: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transform: translateY(-5px);
  }

  span {
    padding-right: 11px;
  }
`;

const Chatsection = styled.section`
  width: 100%;
  height: 85vh;
  overflow-y: scroll;

  input {
    position: absolute;
    bottom: 23px;
    background-color: #40414f;
    width: 50%;
    padding: 18px;
    border-radius: 10px;
    color: white;
    outline: none;
    left: 35%;
    font-size: 1.25em;
    border: none;
  }

  i {
    transition: all ease 0.2s;

    &:hover {
      cursor: pointer;
      transform: translateY(-3px);
    }
  }

  .fa-paper-plane {
    position: absolute;
    bottom: 6.4%;
    right: 16%;
    color: #6b6c7b;
  }

  .fa-microphone {
    position: absolute;
    bottom: 9%;
    right: 18%;
    color: #6b6c7b;
  }
`;

const ChatLog = styled.div`
  // text-align : left;
  height: 86vh;
  overflow-y: scroll;
`;

const Chatquestion = styled.div``;

const Messagecenter = styled.div`
  // max-width: 640px;
  margin-left: 20%;
  margin-right: auto;
  display: flex;
  padding: 12px;
  padding-left: 24px;
  padding-right: 24px;
`;

const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
`;

const Message = styled.div`
  padding-left: 30px;
  padding-right: 40px;
  margin-top: 10px;
  width: 45rem;
  text-align: start;
  // animation: typing 2s steps(22), blink .5s step-end infinite alternate;
  // white-space: nowrap;
  // overflow: hidden;

  // @keyframes typing {
  //   from {
  //     width: 0
  //   }
  // }

  // @keyframes blink {
  //   50% {
  //     border-color: transparent
  //   }
  // }
`;

const Chatresponce = styled.div`
  background-color: #444654;
  height: 70vh;
  overflow-y: scroll;
`;

const AiAvatar = styled.div`
  background: #0da37f;
  width: 40px;
  height: 40px;
`;
export default Chatbot;
