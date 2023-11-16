import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Row,Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { contactListActions } from './components/store/Contact';



import Add from './components/Add';
import { Link } from 'react-router-dom';

function List() {

  const [contacts , setContacts] = useState([]);

useEffect(()=>{
const fetchContacts = async () =>{
  const res = await fetch("https://contact-app-5600c-default-rtdb.europe-west1.firebasedatabase.app/contact-list.json")
  const  data = await res.json();
  console.log(data)
  const contactsData =[];
  for(const key in data){
    contactsData.push({
      key:key,
      name:data[key].name,
      email:data[key].email,
      img:data[key].img,
      number:data[key].number
    })
  }
 
  setContacts(contactsData)

 
}

fetchContacts();

},[contacts]);

// disptach
const dispatch = useDispatch();

// delete
const deleteContactHandler =(key) =>{
dispatch(contactListActions.deleteContact(key))

}


// update

const updateContactHandler = (key)=>{
 
  dispatch(contactListActions.SetExistingContactKey(key))
  
 
}

  return (
    <div className='m-5'>

    

    {
       
      contacts.map((contact)=>{
        return(
        
      
      <div key={contact.key} className="d-flex flex-row"  >
            
            <div className="card mx-auto m-5"   >
            
            
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={contact.img} />
            <Card.Body>
              <Card.Title>{contact.name}</Card.Title>
              <Card.Text>
                <span className='text-success' style={{fontSize:'20px', fontWeight:'200px'}}>Email: {contact.email}</span>
               <br />
                <span className='text-info' style={{fontSize:'20px'}}> Number: {contact.number} </span>
    
    <div className='d-flex'>
  
          <button  className='btn '><i class="fa-solid fa-trash fa-beat fa-2x text-danger" onClick={()=>{deleteContactHandler(contact.key)}}></i></button>
          <button className='btn '>
               <i class="fa-regular fa-pen-to-square fa-beat fa-2x text-success"   onClick={() =>{updateContactHandler(contact.key)}} ></i> </button> 
         
            </div>
  
   {/* icon */}  

  
  
              </Card.Text>
             
            </Card.Body>
          </Card>
         
     
     
 

         
        </div>
        
      </div>
        )
      })
    
      

      }
    
   

   
   {/*   
        
          <ProjectCard />
       
      */}




 



    
    
    </div>
  )
}

export default List