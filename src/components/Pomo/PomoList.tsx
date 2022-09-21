import React from 'react';
import { GiTomato } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import styled from 'styled-components';

const PomoContainer = styled.div`
  text-align: center;
`;
const PomoNum = styled.div`
  font-weight: bold;
`;
function PomoList() {
  const pomo = useSelector((state: reduxState) => state.pomo.value.pomoNum);

  return (
    <PomoContainer>
      <GiTomato color="tomato" size="50" />
      <PomoNum>{pomo.length}</PomoNum>
    </PomoContainer>
  );
}

export default PomoList;
