import {FC, useState} from 'react'
import {MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {useStore} from "@shared/hooks"
import {showErrorMessage, showSuccessMessage} from "@shared/lib"
import {axiosBase} from '@shared/api'

interface SelectorProps {
    certification: string;
}

export const CertificationSelector: FC<SelectorProps> = ({certification}) => {
    const [valueCertification, setValueCertification] = useState<string>(certification)
    const {updateJsonData} = useStore()

    const handleChange = async (event: SelectChangeEvent<string>) => {
        const templateId = useStore.getState().jsonData.id
        const value = event.target.value

        try {
            await axiosBase.put(`update-json-value/${templateId}`, {
                fieldToUpdate: "certification",
                value: value
            })

            showSuccessMessage('Данные успешно сохранены')
            updateJsonData("certification", value)
            setValueCertification(value)
        } catch (error) {
            showErrorMessage('Ошибка сохранения данных')
            console.error(error)
        }
    }

    return (
        <Select
            labelId="certification-select-label"
            id="certification-select"
            value={valueCertification}
            onChange={handleChange}
            size="small"
        >
            <MenuItem value="Зачет">зачет</MenuItem>
            <MenuItem value="Зачет с оценкой">зачет с оценкой</MenuItem>
            <MenuItem value="Экзамен">экзамен</MenuItem>
        </Select>
    )
}