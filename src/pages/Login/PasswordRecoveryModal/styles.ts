import styled from "styled-components";

export const InputControl = styled.div`
    margin: 1.5rem;
`;

export const ButtonContainer = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  > Button {    
    margin-top: 3rem;
  }

  > Button:last-child {    
    margin-left: 0.8rem;
  }
`;

export const SpinnerContainer = styled.div`    
    height: 100%;
`;