import Make from './Make';

interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
}

function Makeproblem(props: Props) {
    return (
     <Make type='問題' ifproblem={true} logged_in={props.logged_in}/>       
    )
}

export default Makeproblem