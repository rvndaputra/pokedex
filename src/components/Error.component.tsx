import styled from "@emotion/styled";
import React from "react";
import pikachuBlink from "../assets/images/pikachu_blink.gif";

const ErrorWrapper = styled.div`
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

  > span:first-of-type {
    margin-bottom: 1rem;
  }
`;

interface LoadingProps {
  error?: string;
  title?: boolean;
}

const Error = ({ error, title = true }: LoadingProps) => {
  return (
    <ErrorWrapper>
      <img src={pikachuBlink} alt="" />
      {title && <span>Oops! something went wrong!</span>}
      {error && <span>{error}</span>}
    </ErrorWrapper>
  );
};

export default Error;
