import {FC, useEffect, useState} from 'react'
import {useStore} from "@shared/hooks"
import {EditableCell, EditableNumber} from '@shared/ui'
import {
    Box,
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import {DisciplineContentData, ObjectHours} from '../../model/DisciplineContentPageTypes.ts'
import {showErrorMessage, showSuccessMessage} from "@shared/lib"
import {axiosBase} from '@shared/api'
import {JsonChangeValue} from "@entities/json-value"

interface StudyLoad {
    id: string;
    name: string;
}

export const DisciplineContentPage: FC = () => {
    const initialData = useStore.getState().jsonData.content as DisciplineContentData | undefined
    const dataHours: StudyLoad[] = useStore.getState().jsonData.study_load
    const maxHours: ObjectHours = dataHours.reduce((acc, item) => {
        const hours = parseFloat(item.id)

        switch (item.name) {
            case 'СРС':
                acc.independent_work += hours
                break
            case 'Практические':
                acc.seminars += hours
                acc.lect_and_sems += hours
                break
            case 'Лекции':
                acc.lectures += hours
                acc.lect_and_sems += hours
                break
            default:
                break
        }

        acc.all += hours

        return acc
    }, {
        all: 0,
        lectures: 0,
        seminars: 0,
        lect_and_sems: 0,
        independent_work: 0
    })
    const initialDataLength = initialData ? Object.keys(initialData).length : 0
    const {updateJsonData} = useStore()
    const [data, setData] = useState<DisciplineContentData | undefined>(initialData)
    const [nextId, setNextId] = useState<number>(initialDataLength)
    const [summ, setSumm] = useState<ObjectHours>({
        all: 0,
        lectures: 0,
        seminars: 0,
        lect_and_sems: 0,
        independent_work: 0
    })

    useEffect(() => {
        const summHours = () => {
            let all = 0
            let lectures = 0
            let seminars = 0
            let lect_and_sems = 0
            let independent_work = 0

            if (data) {
                Object.keys(data).forEach((key) => {
                    const row = data[key]
                    all += Number(row.lectures) + Number(row.seminars) + Number(row.independent_work)
                    lectures += Number(row.lectures)
                    seminars += Number(row.seminars)
                    lect_and_sems += Number(row.lectures) + Number(row.seminars)
                    independent_work += Number(row.independent_work)
                })

                setSumm({
                    all: all,
                    lectures: lectures,
                    seminars: seminars,
                    lect_and_sems: lect_and_sems,
                    independent_work: independent_work
                })
            }
        }

        summHours()
    }, [data])

    const handleAddRow = () => {
        setNextId(nextId + 1)
        const newData = {...data, [nextId]: {theme: '', lectures: '', seminars: '', independent_work: ''}}
        setData(newData)
    }

    const handleValueChange = (id: number, key: string, value: string | number) => {
        if (!data) return

        const newData = {
            ...data,
            [id]: {
                ...data[id],
                [key]: value,
            },
        }
        setData(newData)
    }

    function compareObjects(object1: ObjectHours, object2: ObjectHours) {
        const keys = Object.keys(object1) as (keyof ObjectHours)[]

        if (keys.length !== Object.keys(object2).length) return false

        for (const key of keys) {
            if (Number(object1[key]) !== Number(object2[key])) return false
        }

        return true
    }

    const saveData = async () => {
        if (!data) return
        if (!compareObjects(summ, maxHours)) {
            showErrorMessage("Ошибка заполнения данных. Данные по часам не совпадают")
            return
        }
        const id = useStore.getState().jsonData.id

        const filteredData = Object.entries(data).reduce((acc: DisciplineContentData, [key, value]) => {
            if (value.theme || value.lectures || value.seminars || value.independent_work) {
                acc[key] = value
            }
            return acc
        }, {})

        try {
            await axiosBase.put(`update-json-value/${id}`, {
                fieldToUpdate: "content",
                value: filteredData
            })

            updateJsonData("content", filteredData)
            setData(filteredData)
            showSuccessMessage("Данные успешно сохранены")
        } catch (error) {
            showErrorMessage("Ошибка сохранения данных")
            console.error(error)
        }
    }

    const validateHours = (hours: number, maxHours: number) => {
        if (Number(hours) !== Number(maxHours)) return "red"
        return "green"
    }

    // if (!data) return <Loader />

    return (
        <Box>
            <Box component='h2'>Содержание дисциплины</Box>
            <TableContainer component={Paper} sx={{my: 2}}>
                <Table sx={{minWidth: 650}} aria-label="simple table" size="small" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width="180px">Наименование разделов и тем дисциплины</TableCell>
                            <TableCell align="center" width="70px">Всего (академ. часы)</TableCell>
                            <TableCell align="center" width="70px">Лекции</TableCell>
                            <TableCell align="center" width="120px">Практические (семинарские) занятия</TableCell>
                            <TableCell align="center" width="100px">Всего часов контактной работы</TableCell>
                            <TableCell align="center" width="140px">Самостоятельная работа обучающегося</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && Object.keys(data).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <EditableCell
                                        value={data[row].theme}
                                        onValueChange={(value: string) => handleValueChange(index, 'theme', value)}
                                    />
                                </TableCell>
                                <TableCell style={{alignContent: 'center', textAlign: 'center'}}>
                                    {data[row].lectures + data[row].seminars + data[row].independent_work}
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].lectures}
                                        onValueChange={(value: number) => handleValueChange(index, 'lectures', value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].seminars}
                                        onValueChange={(value: number) => handleValueChange(index, 'seminars', value)}
                                    />
                                </TableCell>
                                <TableCell style={{alignContent: 'center', textAlign: 'center'}}>
                                    {data[row].lectures + data[row].seminars}
                                </TableCell>
                                <TableCell>
                                    <EditableNumber
                                        value={data[row].independent_work}
                                        onValueChange={(value: number) => handleValueChange(index, 'independent_work', value)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>Итого за семестр / курс</TableCell>
                            <TableCell sx={{color: validateHours(summ.all, maxHours.all)}}>
                                {summ.all} / {maxHours.all}
                            </TableCell>
                            <TableCell sx={{color: validateHours(summ.lectures, maxHours.lectures)}}>
                                {summ.lectures} / {maxHours.lectures}
                            </TableCell>
                            <TableCell sx={{color: validateHours(summ.seminars, maxHours.seminars)}}>
                                {summ.seminars} / {maxHours.seminars}
                            </TableCell>
                            <TableCell sx={{color: validateHours(summ.lect_and_sems, maxHours.lect_and_sems)}}>
                                {summ.lect_and_sems} / {maxHours.lect_and_sems}
                            </TableCell>
                            <TableCell sx={{color: validateHours(summ.independent_work, maxHours.independent_work)}}>
                                {summ.independent_work} / {maxHours.independent_work}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                <Button onClick={handleAddRow}>Добавить строку</Button>
                <Button onClick={saveData}>Сохранить изменения</Button>
            </ButtonGroup>

            <Box component='h2' sx={{py: 2}}>Содержание дисциплины </Box>
            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ul': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <JsonChangeValue elementName='content_more_text'/>
            </Box>
            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& p': {
                    p: 1
                }
            }}>
                <JsonChangeValue elementName='content_template_more_text'/>
            </Box>
        </Box>
    )
}