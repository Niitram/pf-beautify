import { DataGrid } from '@mui/x-data-grid'
import styles from './ProfessionalsTable.module.css'
import { useEffect, useState } from 'react'
import { getAllProfessionals } from '../../request/professionals'

export default function ProfessionalsTable(){

    const [professionals,setProfessionals] = useState([])

    useEffect(()=>{
        getAllProfessionals().then(({data})=>setProfessionals(data))
        console.log(professionals)
    },[])

    const rows = professionals.map((row)=>{
        console.log(row)
        return{
            id:row.id,
            col1:row.id,
            col2:row.fullname,
            col3:row.direction,
            col4:row.service,
            col5:row.mail,
        }
    })

    const columns = [
        {field:'col1',headerName:'id',width:100},
        {field:'col2',headerName:'full name',width:300},
        {field:'col3',headerName:'address',width:200},
        {field:'col4',headerName:'services',width:200},
        {field:'col5',headerName:'mail',width:200},
        
    ]

    return(
        <div className={styles.container}>
            <DataGrid 
                columns={columns}
                rows={rows}
                checkboxSelection={true}    
            />
        </div>
    )
}