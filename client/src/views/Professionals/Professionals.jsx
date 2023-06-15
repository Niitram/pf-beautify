import ProfessionalsTable from '../../components/ProfessionalsTable/ProfessionalsTable'
import styles from './Professionals.module.css'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import paleta from '../../assets/images/Paleta'
import { useNavigate } from 'react-router-dom';

export default function Professionals(){

    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <ProfessionalsTable/>
            <div className={styles.aux} onClick={()=>navigate('/dashboardAdmin/newProfessional')}>
                <IconButton
                    className={styles.iconButton}
                >
                    <div></div>
                    <AddIcon className={styles.plus} style={{fill:paleta.background,scale:'400%'}}/>
                </IconButton>
            </div>
        </div>
    )
}