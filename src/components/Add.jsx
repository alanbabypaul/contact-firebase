import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Form } from 'react-bootstrap';
import { useDispatch ,useSelector} from 'react-redux';
import Typography from '@mui/material/Typography';
import { Phone } from '@mui/icons-material';
import { contactList, contactListActions } from './store/Contact';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxshadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
    p: 4,
  };





function Add() {
 
 
 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    
    const existingContactKey =useSelector(state=>state.contact.key);

// state
    const [userData,setUserData] = useState({
      img:"",
      name:"",
      email:"",  
      number:""

   
    })

useEffect(()=>{
const fetchExistingContact = async()=>{
  const res = await fetch(`https://contact-app-5600c-default-rtdb.europe-west1.firebasedatabase.app/contact-list/${existingContactKey}.json`);
  const existingContact = await res.json();
  setUserData({
    name: existingContact?.name || "",
    email:existingContact?.email|| "",
    img:existingContact?.img|| "",
    number:existingContact?.number || "",
  })
}
fetchExistingContact();
},[existingContactKey]);

  //  submit handler
  const submitHandler = (e)=>{
    e.preventDefault();
    
    if(existingContactKey){
      dispatch(contactListActions.updateContact({
        key:existingContactKey,
        name: userData.name,
        email : userData.email,
        number:userData.number,
        img : userData.img
      }));
    } else{
  dispatch(contactListActions.addContact(userData));
}

    setUserData({
      name:"",
      number:"",
      img:"",
      email:"",

    })
  }
// input handler
const inputHandler =(e)=>{
  const {name,value} = e.target;

setUserData((preValue)=>{
  return {
...preValue,
[name]:value

  }
})
}
// 





  return (
    <>
    
    <div className='add align-items-center justify-content-center d-flex mt-5'>

    <div>
  <Button variant="contained"   onClick={handleOpen} >Add Contact</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
           <h3 className='fw-2'> Add Details</h3>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>


            <Form onSubmit={submitHandler} >

            <Form.Group className="mb-3" >
        <Form.Label>Enter image Url</Form.Label>
        <Form.Control type="text" placeholder="enter img url" name='img' value={userData.img} onChange={inputHandler} />
      </Form.Group>
    
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={userData.email} onChange={inputHandler} required />
       
      </Form.Group>

      

      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="enter name" name='name' value={userData.name} onChange={inputHandler}  required/>
      </Form.Group>

      
      <Form.Group className="mb-3" >
        <Form.Label>Number</Form.Label>
        <Form.Control type="text" placeholder="enter number " name='number' value={userData.number} onChange={inputHandler} required 
        />
      </Form.Group>
      
      <Button variant="contained" type="submit" onClick={handleClose} >
        Submit
      </Button>
    </Form>



            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
    


    </div>
    
    
    
    
    
    
    
    
    </>
  )
}

export default Add