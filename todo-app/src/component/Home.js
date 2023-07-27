import React, { useEffect,useState } from 'react'
  import {Container, Row, Col,InputGroup,FormControl}from 'react-bootstrap';
import { useThemeHook } from '../component/ThemeProvider'
import { BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search'
import ProductCart from '../component/ProductCart';

const Home=()=> {
    const[theme]= useThemeHook()
    const[searchInput,setSearchInput]= useState('')
    const[productData,setproductData]= useState([])

    async function getResponse(){
        const res = await fetch('https://fakestoreapi.com/products')
        .then(res=> res.json());
         setproductData(await res)
    }

    useEffect(()=>{
        getResponse()
     },[])
    return (
         <Container className='py-4'>
        <Row className='justify-content-center'>
        <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
        <h1 className={theme? 'text-light my-5': 'text-black my-5'}>search products</h1>
        <InputGroup className="mb-3">
         <InputGroup.Text className={theme? 'bg-black text-dark-primary':'bg-light text-light-primary'}>
            <BiSearch size="2rem"/>
         </InputGroup.Text>
           <FormControl
             placeholder="search"
             value={searchInput}
             className={theme? 'bg-light-black text-light':'bg-light text-black'}
                 onChange={(e)=> setSearchInput(e.target.value)}
               />
       </InputGroup>
         </Col>
         <SearchFilter
            value={searchInput}
            data={productData}
            renderResults={results=>(
                <Row className='justify-content-center'>
                {results.map((item, i)=>(
                    <ProductCart data={item } key={i}/>
                 ))}
                </Row>
            )}
         />
        </Row> 
        </Container>
     )
}

export default Home
