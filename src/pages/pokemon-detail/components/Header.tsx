/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Pokeball from "../../../assets/images/pokeball-color.png";

const HeaderWrapper = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
`;

const BackButton = styled(Link)`
  font-size: 1.25rem;
`;

const PokemonLogo = styled.img`
  width: 50%;
  min-width: 100px;
  max-width: 150px;
`;

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <HeaderWrapper>
      <BackButton to="/">Back</BackButton>
      <div
        css={css`
          flex: 1;
        `}
      >
        <PokemonLogo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          alt="pokemon logo"
        />
      </div>
      <img src={Pokeball} alt="" height="40px" />
    </HeaderWrapper>
  );
};

export default Header;
