import {FC, useEffect, useMemo, useState} from 'react'
import {Box, Container} from '@mui/material'
import {RpdList} from '@widgets/rpd-list'
import {TeacherRpdListItems} from '../model/teacherInterfaceItems.ts'
import {TestPdf} from '@features/generate-pdf' // Assuming PDF Test view
import {useAuth} from "@entities/auth"
import {useStore} from "@shared/hooks"
import {useNavigate} from 'react-router-dom'
import {UserRole} from "@shared/ability"
import {TeacherInterfaceTemplates} from '@widgets/teacher-interface-templates'
import {
    AimsPage,
    ApprovalPage,
    CoverPage,
    DisciplineContentPage,
    DisciplineEvaluationsFunds,
    DisciplinePlace,
    DisciplineSupportPage,
    PlannedResultsPage,
    ResourceSupportPage,
    ScopeDisciplinePage
} from "./subpages"

const contentMap: Record<string, JSX.Element> = {
    coverPage: <CoverPage/>,
    approvalPage: <ApprovalPage/>,
    aimsPage: <AimsPage/>,
    disciplinePlace: <DisciplinePlace/>,
    disciplinePlannedResults: <PlannedResultsPage/>,
    disciplineScope: <ScopeDisciplinePage/>,
    disciplineContent: <DisciplineContentPage/>,
    disciplineSupport: <DisciplineSupportPage/>,
    disciplineEvaluationsFunds: <DisciplineEvaluationsFunds/>,
    resourceSupport: <ResourceSupportPage/>,
    testPdf: <TestPdf/>
}


export const TeacherInterface: FC = () => {
    const userRole = useAuth.getState().userRole
    const [choice, setChoice] = useState<string>(
        userRole === UserRole.ROP ? 'coverPage' : 'selectTemplate'
    )
    const jsonData = useStore.getState().jsonData
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(jsonData).length === 0) {
            if (userRole === UserRole.ROP) {
                navigate('/manager')
            }
            if (userRole === UserRole.TEACHER && choice !== 'selectTemplate') {
                setChoice('selectTemplate')
            }
        }
    }, [jsonData, userRole, choice, navigate])

    const currentContent = useMemo(() => {
        return contentMap[choice] || null
    }, [choice])

    return (
        <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-between'}}>
            {choice === 'selectTemplate' ? (
                <TeacherInterfaceTemplates setChoise={setChoice}/>
            ) : (
                <>
                    <Box minWidth={400} maxWidth={400} my={4} mr={2}>
                        <Box py={1} sx={{position: 'sticky', top: '20px', backgroundColor: '#fefefe'}}>
                            <RpdList RpdListItems={TeacherRpdListItems} setChoise={setChoice}/>
                        </Box>
                    </Box>

                    <Box my={4} p={2} ml={2} sx={{backgroundColor: '#fefefe', width: '100%'}}>
                        {currentContent}
                    </Box>
                </>
            )}
        </Container>
    )
}