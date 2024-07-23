import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const [appliedOppurtunites,setAppliedOppurtunities] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3000/auth/verify").then((res)=>{
           if(!res.data.status){
            navigate("/login")
           } else {
            fetchAppliedOppurtunities()
           }
        })
    },[navigate])
    const fetchAppliedOppurtunities =async()=>{
        try {
            const response = await axios.get("http://localhost:3000/auth/applied-oppurtunities")
            setAppliedOppurtunities(response.data)
        } catch (error) {
            
        }
    }
    const handleLogout=()=>{
        axios.get("http://localhost:3000/auth/logout")
        .then((res)=>{
            if(res.data.status){
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <h2 className="applied-opportunities-title">Applied Opportunities</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div>
                {appliedOppurtunites.map((oppurtunity, index) => (
                    <div key={index} className="opportunity-card">
                        <h1>{oppurtunity.profile_name}</h1>
                        <p><strong>Company: </strong> {oppurtunity.company_name}</p>
                        <p><strong>Stipend: </strong> {oppurtunity.stipend}</p>
                        <p><strong>Duration: </strong> {oppurtunity.duration}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
