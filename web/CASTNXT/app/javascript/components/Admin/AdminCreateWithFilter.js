import React, {useState, useEffect} from "react"
import AdminCreateStack from "./AdminCreateStack";
import AdminUserTable from "./AdminUserTable";

const AdminCreateWithFilter = (props) =>{

    const [rowData, setRowData] = useState(null);
    const [showRowData, setShowRowData] = useState(false);

    const onRowClick = (rowData, _event, _details) => {
        console.log(rowData);
        const slideData = {};
        slideData[`${rowData.row.uniqId}`] = {
            talentName: rowData.row.talentName,
            formData: {...rowData.row}, 
            curated: false
        };
        console.log(slideData);
        delete(slideData[`${rowData.row.uniqId}`].formData.id);
        delete(slideData[`${rowData.row.uniqId}`].formData.uniqId);
        delete(slideData[`${rowData.row.uniqId}`].formData.talentName);
        setRowData(slideData);
        setShowRowData(true);
    }
    
    return (
        <>
            <AdminUserTable properties={props.properties} handleRowClick={onRowClick}/>
            {
                showRowData ? <AdminCreateStack properties={props.properties} rowData = {rowData}/> : null 
            } 
        </>
    )

}

export default AdminCreateWithFilter;