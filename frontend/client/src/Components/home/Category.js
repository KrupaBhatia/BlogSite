
import {Button,Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import { Categories } from '../../Constants/data';
import styled from '@emotion/styled';


const StyledTable =styled(Table)`
border :1px solid rgba(224 , 224 ,224 , 1)`


const StyledButton = styled(Button)`
margin : 20px;
width : 85%;
background :#6495ED;
color: #fff;`
const Category = () => {

    return (
        <>
            <StyledButton variant='contained'>Create Blog</StyledButton>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {
                    Categories.map(category => (
                        <TableRow>
                            <TableCell key={category.id}>
                            {category.type}
                            </TableCell>
                        </TableRow>
                    ))
                   }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Category ; 