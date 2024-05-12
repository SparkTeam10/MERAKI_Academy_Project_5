import React,{Suspense} from 'react'
import axios from "axios"
import { useLoaderData,Await, useNavigate } from 'react-router-dom'
export default function Category  ()  {
  const {results}=useLoaderData()
  const navigate = useNavigate();
  return (
    <div>
        <h1>Category</h1>
<Suspense fallback={<p>Loading data...</p>}>
<Await resolve={results} errorElement={<p>Error </p>}>
{(results)=>{
    return(
        <div>
            {results.data.result.map((elem,i)=>{
               return <div key={i}> 
                 <h3>{elem.title}</h3>
                 <p>{elem.description}</p>
                 <img src={elem.img}/>
               </div>
            })}
            {console.log(results.data.result)}
        </div>
    )
}}
</Await>
</Suspense>
<button  onClick={() => {
          navigate("/");
        }}>Home</button>
        <button  onClick={() => {
          navigate(-1);
        }}>Back</button>
    </div>
  )
}
export const allCategory= async()=>{
  const results= axios.get(`http://localhost:5000/category/`);
  return {results}
}
