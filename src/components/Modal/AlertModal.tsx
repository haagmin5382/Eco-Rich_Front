import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: 'absolute';
  text-align: center;
  left: '50vw';
`;
function AlertModal() {
  return <ModalContainer>모달</ModalContainer>;
}

export default AlertModal;
