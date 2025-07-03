import styled from 'styled-components';

const TopBarComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 15%;
  background-color: rgba(47, 59, 45, 0.56);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it stays on top of other content */
`;

export default TopBarComponent;