import React from 'react';
import {useState,useEffect} from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import { getsheets } from '../http';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from "./assignment.module.css"
import InputForm from './InputForm';
import { ShimmerTable,ShimmerThumbnail  } from "react-shimmer-effects";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function Assignment() {
  const [rowsvalue,setRowsValue] = useState([]);
  const [syncing,setSyncing] = useState(false);
  useEffect(()=>{
    const fetchRows = async () => {
      const {data} = await getsheets();
      setRowsValue(data);
      console.log(data)
    }
    fetchRows();
  },[])
  const handleSyncButtonClick = async () => {
    if (!syncing) {
      setSyncing(true); // Set syncing to true to prevent multiple syncs

      try {
        // Fetch data and update rowsValue
        const { data } = await getsheets();
        setRowsValue(data);
        console.log(data);
      } catch (error) {
        // Handle any errors here
        console.error('Error syncing data:', error);
      } finally {
        setSyncing(false); // Reset syncing to false after syncing is complete
      }
    }
  };

  return (
    <div>
      <div className={style.navbar}>
        <div className={style.buttonWrapper}>
          <LoadingButton
            onClick={handleSyncButtonClick}
            loading={syncing}
            loadingIndicator="Syncing…"
            variant="contained" 
            size="large"
          >
            <span>Sync Data</span>
          </LoadingButton>
        </div>

      </div>
      <div className={style.assignment}>
      <div className={style.left}>
        {
        rowsvalue[0]?(
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            
            <TableRow>
              {
                rowsvalue[0].map((value)=>(<StyledTableCell>{value}</StyledTableCell>))
              }
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsvalue.slice(1).map((row) => (
              <StyledTableRow>
                {row.map((value)=>(
                  <StyledTableCell>{value}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>
        ):(
          <ShimmerTable row={7} col={5} />
        )
       }
      </div>
      <div className={style.right}>
      <h3>Add Row</h3>

        {
          rowsvalue[0]?<InputForm columnName={rowsvalue[0]}/>:(
            <ShimmerThumbnail height={250} width = {300} rounded />
          )
        }
        
      </div>
    </div>
    </div>
  );
}
