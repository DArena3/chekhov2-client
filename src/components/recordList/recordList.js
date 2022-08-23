import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import env from "react-dotenv"
 
const Record = (props) => (
 <tr>
   <td>{props.record.label}</td>
   <td>{props.record.format}</td>
   <td>{props.record.number}</td>
   <td>{props.record.period}</td>
   <td>{props.record.composer}</td>
   <td>{props.record.work}</td>
   <td>{props.record.performers}</td>
   <td>{props.record.time}</td>
   <td>{props.record.notes}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://${env.SERVER_URL}:${env.SERVER_PORT}/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://${env.SERVER_URL}:${env.SERVER_PORT}/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Label</th>
           <th>Format</th>
           <th>Number</th>
           <th>Period</th>
           <th>Composer</th>
           <th>Work</th>
           <th>Performers</th>
           <th>Time</th>
           <th>Notes</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}