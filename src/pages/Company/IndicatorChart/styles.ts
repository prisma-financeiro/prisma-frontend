import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;    
  justify-content: center;  
`;

export const SelectContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;
