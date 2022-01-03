import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    height: calc(100vh - 64px);
    padding: 0px 0px 0px 0px;
    z-index: 100;
    scrollbar-width: none;

    @media (min-width: 600px) {
        box-sizing: border-box;
        width: 60vw;
    }
    @media (min-width: 1025px) {
        box-sizing: border-box;
        width: 45vw;
    }
`;

export default Wrapper
