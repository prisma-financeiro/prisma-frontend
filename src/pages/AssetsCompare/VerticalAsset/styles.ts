import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem;
  `}
`;

export const FieldGroup = styled.div`
  ${({ theme }) => css`
    margin-top: 0.5rem;
    width: 100%;
  `}
`;

export const DataField = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 4rem;
    margin-top: 0.5rem;
    background: ${theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :nth-child(odd) {
      background: ${theme.colors.color4};
    }

    > span {
      font-size: ${theme.fontSizes.small};
      position: absolute;
      left: 1rem;
    }

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      width: 15rem;
      height: 4rem;
      font-size: ${theme.fontSizes.small};
    }
  `}
`;

export const EmptyBlock = styled.div`
  ${({ theme }) => css`
      width: 19rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.xlarge};

      @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
        width: 15rem;
        height: 4rem;
        font-size: ${theme.fontSizes.small};
      }
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span {
      margin-top: 1rem;
      min-height: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: ${theme.fontSizes.small};
      width: 100%;
      text-align: center;
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.darkGrey};
      /* border-radius: ${theme.radio.small}; */
    }
  `}  
`;

export const RankingPlace = styled.div<{ranking?: number}>`
  ${({ theme, ranking }) => css`
    width: 1rem;
    height: 1rem;
    background-color: ${getColorByRanking(ranking)};
    color: ${theme.colors.background};
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const getColorByRanking = (ranking?: number) => {
  if (!ranking) {
    return 'transparent';
  }
  switch (ranking) {
    case 1:
      return '#FAD700';
    case 2: 
      return '#aaa9ad';
    case 3: 
      return '#c06f32';
    default:
      return 'transparent';
  }
}