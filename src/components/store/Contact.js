import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    key:"",
    contact: {
        name:"",
        img:"",
        number:"",
        email:"",
    }
}




const contactSlice = createSlice({
    name:"contactList",
    initialState,
    reducers: {
        addContact: (state,action) =>{
            const userData = action.payload;
            fetch("https://contact-app-5600c-default-rtdb.europe-west1.firebasedatabase.app/contact-list.json"
            , {

            method:"POST",
            headers:{
                "cOntent-Type":"application/json"
            },
            body: JSON.stringify(userData)
            } ).catch(error =>{
                console.log(error);
            })
         
        
        },
        deleteContact : (state,action) =>{
            const deleteKey =  action.payload;
            fetch(`https://contact-app-5600c-default-rtdb.europe-west1.firebasedatabase.app/contact-list/${deleteKey}.json`,{



            method: "DELETE"

            }).catch(error=>{
                console.log(error);
            })
        },

        SetExistingContactKey: (state,action)=>{

           state.key =action.payload;
        }, 
        updateContact: (state,action)=>{
            const {key,name,email,number,img} = action.payload
            fetch(`https://contact-app-5600c-default-rtdb.europe-west1.firebasedatabase.app/contact-list/${key}.json`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({name,email,img,number})
            }).catch(error =>console.log(error));
            
            state.key =""
        }
      
    }
    

})

export const contactListActions = contactSlice.actions; 

export default contactSlice;