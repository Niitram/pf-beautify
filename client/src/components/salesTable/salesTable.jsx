import { useEffect, useState } from 'react'
import styles from './salesTable.module.css'
import { getAllSales } from '../../request/shops'
import { DataGrid } from '@mui/x-data-grid'

export default function SalesTable(){

    const [ventas,setVentas] = useState([])

    useEffect(()=>{
        getAllSales()
        .then(({data})=>{setVentas(data)})
    },[])


    const rows = ventas.map((row)=>{
        const aux = new Date(row.date)
        const year = aux.getFullYear()
        const month = aux.getMonth() + 1
        const day = aux.getDate()
        const hours = aux.getHours()
        const minutes = aux.getMinutes()
        const properDate = `${day}/${month}/${year}`
        const properTime = `${hours}:${minutes}`
        return{
            id:row.id,
            col1:row.id,
            col2:row.clientFullName,
            col3:row.clientEmail,
            col4:row.productName,
            col5:properDate,
            col6:properTime
        }
    })

    const columns = [
        {field:'col1',headerName:'Id',width:100},
        {field:'col2',headerName:'Client',width:250},
        {field:'col3',headerName:'Client email',width:250},
        {field:'col4',headerName:'Product',width:200},
        {field:'col5',headerName:'Date',width:200},
        {field:'col6',headerName:'Time',width:150},
    ]

    return(
        <div className={styles.container}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection={true}
                />
        </div>
    )
}