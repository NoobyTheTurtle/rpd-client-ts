import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material"
import ListAltIcon from '@mui/icons-material/ListAlt'
import {FC} from "react"
import type {RpdListItem} from "../model/types.ts"

type RpdListItemProps = RpdListItem & {
    setChoise: (choise: string) => void
}

const RpdListItem: FC<RpdListItemProps> = ({id, text, setChoise}) => {
    return (
        <ListItem disableGutters sx={{p: 0}}>
            <ListItemIcon sx={{pl: 3}}>
                <ListAltIcon/>
            </ListItemIcon>
            <ListItemButton onClick={() => setChoise(id)} sx={{color: 'black', px: 0}} disabled={id === "approvalPage"}>
                <ListItemText primary={
                    <Typography style={{color: 'black', fontFamily: "Arial", fontSize: "16px"}}>{text}</Typography>
                }/>
            </ListItemButton>
        </ListItem>
    )
}

export default RpdListItem