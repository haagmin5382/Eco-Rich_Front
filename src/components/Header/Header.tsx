import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
const HeaderContainer = styled.header`
  text-align: center;
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav />
    </HeaderContainer>
  );
}

export default Header;
