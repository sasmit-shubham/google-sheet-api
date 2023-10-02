import { Button, TextField } from '@mui/material'
import {addRow} from '../http'
import style from "./assignment.module.css"
import React, { useState } from 'react'

const InputForm = ({columnName}) => {
  const [rowValues, setRowsValues] = useState([])
  const handleInputChange = (event,index) => {
    const newRowValues = [...rowValues];
    newRowValues[index] = event.target.value;
    setRowsValues(newRowValues)
  }

  const addRowhandler = async () =>{
    try{
        if(!rowValues) return;
        const {data} = await addRow({rowValues})
    }catch{
        console.log("something went wrong in the addRow");
    }
  }
  const submitHandler = (event) =>{
    event.preventDefault();
    addRowhandler();
    setRowsValues([]);
  }
  return (
    <div className={style.inputCardWrapper}>
        <form onSubmit={submitHandler} className={style.inputCard}>
            {
                columnName.map((name,index)=>(
                    <TextField id="outlined-basic" label={name} variant="outlined" onChange={(event)=>handleInputChange(event,index)} />
                ))   
            }
            <Button variant="contained" type="submit">Add Row</Button>
        </form>
        

    </div>
  )
}

export default InputForm