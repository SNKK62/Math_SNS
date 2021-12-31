import Make from './Make';

interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string 
    }
}

function Makesolution(props: Props) {
    return (
        <Make type='$Solution$' ifproblem={false} logged_in={props.logged_in}/>  
    )
}

export default Makesolution