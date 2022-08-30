import styled from '@emotion/styled'

export const StyleLineCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2px;
  background: rgb(255, 38, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 38, 0, 1) 0%,
    rgba(9, 9, 121, 0.16010154061624648) 50%,
    rgba(0, 82, 255, 1) 100%
  );
  border-radius: 10px;

  img {
    width: 3rem;
  }
`
