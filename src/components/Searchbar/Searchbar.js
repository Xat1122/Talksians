import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {SearchContainer} from "./Searchbar.style"
const Searchbar = ({setSearch,search=""}) => {
  return (
    <SearchContainer>
        <input placeholder='Search ' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <SearchIcon/>
    </SearchContainer>
  )
}

export default Searchbar