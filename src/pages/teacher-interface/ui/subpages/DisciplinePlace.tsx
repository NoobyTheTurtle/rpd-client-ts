import {useStore} from "@shared/hooks"
import {Loader} from '@shared/ui'
import {Box} from '@mui/material'
import {FC} from 'react'
import {CertificationSelector} from "@entities/certification"
import {JsonChangeValue} from "@entities/json-value"

export const DisciplinePlace: FC = () => {
    const data = useStore.getState().jsonData

    const placeWrapper = () => {
        if (data.place === "Обязательная часть") return "обязательной части"
    }

    return (
        <Box>
            <Box component='h2'>Место дисциплины в структуре ОПОП</Box>
            {Object.keys(data).length ?
                <Box sx={{py: 2}}>
                    Дисциплина
                    <Box component='span' sx={{fontWeight: '600'}}> «{data.disciplins_name}» </Box>
                    относится к
                    <Box component='span' sx={{fontWeight: '600'}}> {placeWrapper()} </Box>
                    учебного плана направления
                    <Box component='span' sx={{fontWeight: '600'}}> «{data.direction}» </Box>.
                    Дисциплина преподается в
                    <Box component='span' sx={{fontWeight: '600'}}> {data.semester} </Box>
                    семестре, на
                    <Box component='span' sx={{fontWeight: '600'}}> {Math.ceil(Number(data.semester) / 2)} </Box>
                    курсе
                    <Box sx={{pt: 2}}>
                        форма промежуточной аттестации – <CertificationSelector certification={data.certification}/>
                    </Box>
                </Box> :
                <Loader/>
            }
            <JsonChangeValue elementName='place_more_text'/>
        </Box>
    )
}