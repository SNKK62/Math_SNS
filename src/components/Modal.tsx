import styled from 'styled-components';
import LoadingButton from '@mui/lab/LoadingButton';
import {useState} from 'react'

const Whitespace = styled.div`
    position: relative;
    width: 90%;
    margin: auto;
    height: 25vh;
    border-radius: 5px;
    background: white;
    @media(min-width: 600px){
        width: 30vw;
    }
    @media(min-width: 1025px){
        width: 30vw;
    }
`
const Blackspace = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(0,0,0,0.5);
    z-index: 600;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 601;
`
const Buttonspace = styled.div`
    height: 40px;
    position: absolute;
    bottom: 10px;
    width: 90%;
    padding: 10px;
    text-align: right;
    @media(min-width: 600px){
        width: 28vw;
    }
    @media(min-width: 1025px){
        width: 28vw;
    }
`
const Text = styled.div`
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    width: 50%;
`

interface Props {
    delete: () => void
    close: () => void
}

function Modal(props: Props) {
    const [load, setLoad] = useState(false)
    return (
        <Blackspace onClick={() => { if (!load) { props.close() } } }>
            <Whitespace onClick={e => {e.stopPropagation()}}>
                <Text>削除しますか？</Text>
                <Buttonspace>
                    <LoadingButton loading={false} variant='text' onClick={() => { if (!load) { props.close() } }}>キャンセル</LoadingButton>
                    <LoadingButton loading={load} variant='text' onClick={() => { setLoad(true); props.delete();}} sx={{color: 'red'}}>削除する</LoadingButton>
                </Buttonspace>
            </Whitespace>
        </Blackspace>
    )
}


export default Modal
