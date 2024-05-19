import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user_id} = useSelector(state => state.auth.userId)
  
  useEffect(()=>{
    if(!user_id){
        navigate("/login")
    }
  },[user_id])
  

  return (
    <div>
      <div>Home</div>
     
    </div>
  )
}

export default Home