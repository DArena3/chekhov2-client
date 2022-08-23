import React, { useState } from "react";
import { useNavigate } from "react-router";
import env from "react-dotenv"
 
export default function Create() {
 const [form, setForm] = useState({
   label: "",
   format: "",
   number: "",
   period: 0,
   composer: "",
   work: "",
   performers: "",
   time: "",
   notes: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newTrack = { ...form };
 
   await fetch(`http://${env.SERVER_URL}:${env.SERVER_PORT}/record/add`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newTrack),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", position: "", level: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="label">Label</label>
         <input
           type="text"
           className="form-control"
           id="label"
           value={form.label}
           onChange={(e) => updateForm({ label: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="formatOptions"
             id="formatCD"
             value="CD"
             checked={form.format === "CD"}
             onChange={(e) => updateForm({ format: e.target.value })}
           />
           <label htmlFor="formatCD" className="form-check-label">CD</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="formatOptions"
             id="formatLP"
             value="LP"
             checked={form.format === "LP"}
             onChange={(e) => updateForm({ format: e.target.value })}
           />
           <label htmlFor="formatLP" className="form-check-label">LP</label>
         </div>
       </div>
       <div className="form-group">
         <label htmlFor="number">Number</label>
         <input
           type="text"
           className="form-control"
           id="number"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}