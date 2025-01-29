import {FC} from 'react'
import {JsonChangeValue} from '@entities/json-value'
import {Box} from '@mui/material'

export const DisciplineSupportPage: FC = () => {
    return (
        <Box>
            <Box component='h2' sx={{pb: 2}}>Перечень учебно-методического обеспечения по дисциплине </Box>
            <JsonChangeValue elementName='methodological_support_template'/>
        </Box>
    )
}