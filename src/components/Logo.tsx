import styled from 'styled-components';
import IMG from '../icon-512x512.png'

const Image = styled.img`
    object-fit: cover;
    width: 50vw;
    height: 50vw;
    @media(min-width: 600px){
        height: 50vh;
        width: 50vh;
    }
`
const Overlay = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

function Logo() {
    return (
        <Overlay>
            <Image src={IMG} />
        </Overlay>
    )
}



export default Logo
