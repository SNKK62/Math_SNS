import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';


const Box1 = styled(Box)`
  position: relative;
  z-index: 7;
`
interface Props {
    keyword: string
};

function Searchuser(props: Props) {
    const [value, setValue] = useState('one');

    const handlechange = (e?: React.SyntheticEvent, newValue?: string) => {
        if (e && newValue) {
            setValue(newValue);
        };
    };

    return (
        <>
        <Box1 sx={{ width: '100%', bordercColor: 'divider'}}>
            <Box1 sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handlechange}
                        aria-label="search tab">
                    <Tab value='one' label="ユーザー" sx={{width: '50%'}}  />
                    <Tab value='two' label={"問題"+props.keyword} sx={{width: '50%'}} />
                </Tabs>
            </Box1>
        </Box1>
        </>
    )
}

export default Searchuser
