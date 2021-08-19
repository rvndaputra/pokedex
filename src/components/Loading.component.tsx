import styled from "@emotion/styled";
import React from "react";
import pikachuRun from "../assets/images/pikachu_run.gif";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  > img {
    margin: 1rem;
    width: 25%;
    max-width: 125px;
  }
`;

interface LoadingProps {}

const Loading = (props: LoadingProps) => {
  return (
    <LoadingWrapper>
      <img src={pikachuRun} alt="" />
      <span>Loading...</span>
    </LoadingWrapper>
  );
};

export default Loading;
