import {useState} from 'react'
import {useStore} from "@shared/hooks"
import {Box, Button} from '@mui/material'
import {axiosBase} from '@shared/api'
import {showErrorMessage} from "@shared/lib"
import {PdfReader} from "@shared/ui"

export function TestPdf() {
    const [fileName, setFileName] = useState<Blob | MediaSource | undefined>(undefined)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const TestPdf = async () => {
        setDisableButton(true)
        const id = useStore.getState().jsonData.id

        const params = {
            id: id
        }

        try {
            const response = await axiosBase.get("generate-pdf", {responseType: 'blob', params})
            setFileName(response.data)
        } catch (error) {
            showErrorMessage("Ошибка при загрузке PDF файла. Не все поля шаблона заполнены")
            console.error(error)
        }
        // setDisableButton(false);
    }

    return (
        <Box>
            <Button
                onClick={() => TestPdf()}
                variant="outlined"
                size="small"
                disabled={disableButton}
            >Сформировать PDF файл</Button>
            {fileName && <PdfReader file={fileName}/>}
        </Box>
    )
}