import { useEffect, useState } from 'react'
import styles from './ServicesTable.module.css'
import { DataGrid } from '@mui/x-data-grid'
import { getServices } from '../../request/services'

export default function ServicesTable() {
    const [services, setServices] = useState([])

    useEffect(() => {
        getServices()
            .then(({ data }) => setServices(data))
    }, [])

    const rows = services.map((row) => {
        return {
            id: row.id,
            col1: row.id,
            col2: row.name,
            col3: row.duration,
            col4: row.professional
        }
    })

    const columns = [
        {
            field: 'col1',
            headerName: 'id',
            width: 100
        },
        {
            field: 'col2',
            headerName: 'name',
            width: 250
        },
        {
            field: 'col3',
            headerName: 'duration',
            width: 100
        },
        {
            field: 'col4',
            headerName: 'professional name',
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.dataGridContainer}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                   
                />
            </div>
        </div>
    )
}
