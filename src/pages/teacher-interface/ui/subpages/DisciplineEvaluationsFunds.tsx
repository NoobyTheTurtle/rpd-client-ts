import {FC} from 'react'
import {JsonChangeValue} from '@entities/json-value'
import {Box} from '@mui/material'

export const DisciplineEvaluationsFunds: FC = () => {
    return (
        <Box>
            <Box component='h2' sx={{pb: 2}}>Фонды оценочных средств по дисциплине</Box>
            <JsonChangeValue elementName='assessment_tools_template'/>
        </Box>
    )
}