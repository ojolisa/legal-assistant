import React from "react";
import styled from "styled-components";

const Services = () => {
  return (
    <ServicesSection className="service-section">
      <SectionHeader>Our Services</SectionHeader>
      <ServiceList>
        <ServiceItem>
          <ServiceIcon className="icon1" />
          <ServiceTitle>Relevant Article Generation</ServiceTitle>
          <ServiceDescription>
            Analysis of the constitution to generate relevant articles.
          </ServiceDescription>
        </ServiceItem>
        <ServiceItem>
          <ServiceIcon className="icon2" />
          <ServiceTitle>Legal Case Summaries</ServiceTitle>
          <ServiceDescription>
            Analysis of a number of legal cases to provide with relevant legal cases.
          </ServiceDescription>
        </ServiceItem>
        <ServiceItem>
          <ServiceIcon className="icon3" />
          <ServiceTitle>Document Interpretation</ServiceTitle>
          
          <ServiceDescription>
            Generation of a list of relevant documents and their explanations.
          </ServiceDescription>
        </ServiceItem>
      </ServiceList>
    </ServicesSection>
  );
};

const ServicesSection = styled.section`
  text-align: center;
  padding: 50px 0;
  background-color: #f4f4f4;
`;

const SectionHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const ServiceList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ServiceItem = styled.li`
  flex: 1;
  padding: 20px;
  margin: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: black;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover:before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #007bff;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 10px;
  line-height: 50px;
  color: #fff;
  font-size: 1.5rem;
  transition: background-color 0.3s ease;

  &.icon1 {
    background-color: #007bff;
  }

  &.icon2 {
    background-color: #e91e63;
  }

  &.icon3 {
    background-color: #4caf50;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
`;

export default Services;
