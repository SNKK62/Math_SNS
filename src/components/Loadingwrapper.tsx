
import styled from 'styled-components';

const Loadingwrapper = styled.div`
    width: 100%;
    height: 90vh;
    position: relative;
    z-index: 200;
    @media (min-width: 600px) {
        box-sizing: border-box;
        width: 60vw;
    }
    @media (min-width: 1025px) {
        box-sizing: border-box;
        width: 45vw;
    }
`

export default Loadingwrapper
