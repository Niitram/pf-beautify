import { DataGrid } from '@mui/x-data-grid'
import styles from './AppointmentsTableAdmin.module.css'
import { useEffect, useState } from 'react'
import { getAllAppointments } from '../../request/appointments'

export default function AppointmentsTable(){

    const [appointments,setAppointments] = useState([])

    useEffect(()=>{
        getAllAppointments()
        .then(({data})=>setAppointments(data))
    },[])
    
    console.log(appointments)

    const rows = appointments.map((row)=>{
        return{
            id:row.id,
            col1:row.id,
            col2:row.date,
            col3:row.hour,
            col4:row.paid?'not yet':row.paid,
            col5:row.Service && row.Service.name,
            col6:row.Client && row.Client.fullName,
            col7:row.Profesional && row.Profesional.fullname,
        }
    })

    const columns = [
        {field:'col1',headerName:'id',width:100},
        {field:'col2',headerName:'date',width:100},
        {field:'col3',headerName:'hour',width:100},
        {field:'col4',headerName:'paid',width:100},
        {field:'col5',headerName:'service',width:300},
        {field:'col6',headerName:'Client',width:250},
        {field:'col7',headerName:'Professional',width:240}
    ]

    console.log(rows)

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