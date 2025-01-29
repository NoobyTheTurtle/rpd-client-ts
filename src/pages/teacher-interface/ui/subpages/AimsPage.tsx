import {FC} from 'react'
import {JsonChangeValue} from '@entities/json-value'
import {Box} from '@mui/material'

export const AimsPage: FC = () => {

    return (
        <Box>
            <Box component='h2' sx={{pb: 2}}>Цели и задачи освоения дисциплины</Box>
            <JsonChangeValue elementName='goals'/>
        </Box>
    )
}