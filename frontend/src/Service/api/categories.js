import axios from "axios";
export const allCategory= async()=>{
    const result= axios.get(`http://localhost:5000/category/`);
    return {result}
}