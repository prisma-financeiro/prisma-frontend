import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;    
  justify-content: center;
  align-items: center;
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

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {  
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;

    > div {
      margin-bottom: 2rem;
    }
  }
`;
