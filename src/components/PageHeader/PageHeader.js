import React,{useState} from 'react'
import {PageHeadeContainer} from "./PageHeader.style"
import Searchbar from "../Searchbar/Searchbar"

const PageHeader = ({title,search,setSearch}) => {
    
  return (
    <>
    <PageHeadeContainer>
        <h1>{title}</h1>
        <Searchbar search={search} setSearch={setSearch}/>
    </PageHeadeContainer>
    </>
  )
}

export default PageHeader