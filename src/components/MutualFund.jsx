import React, { useEffect, useState } from 'react'
import "./MutualFund.css"
import { ExternalLink } from 'lucide-react';
import { Search } from 'lucide-react';

const MutualFund = ({schemeCodes,schemeNames,netAssetValues}) => {

    const [btnStyling,setBtnStyling] = useState({});
    const [isClickedLoadMore,setIsClickedLoadMore] = useState(false);
    const [isClickedOnFundHouse,setIsClickedOnFundHouse] = useState(false);
    const [externalLinkColor,setExternalLinkColor] = useState(false);
    const [selectedFundHouse,setSelectedFundHouse] = useState("");
    const [selectedFilter,setSelectedFilter] = useState("");
    const [selectedValues,setSelectedValues] = useState({
        companyName:"",
        filter:""
    })    //stores the values  selected by user
    const [filteredSchemeNames,setFilteredSchemeNames] = useState([]);
    const [filteredNavValues,setFilteredNavValues] = useState([]);
    const [inputValue,setInputValue] = useState("");

    let arrayForNavFilteredValues = [];



   
   


    //stores the values from scheme name column which include "Mutual Fund" text
   const filteredCodes = [];
   schemeCodes.forEach((item) => {
    if(!filteredCodes.includes(item.value) && item.value.includes("Mutual Fund")){
        filteredCodes.push(item.value)
    }
   })

   //made an array to store the values which maches the filter criteria when click on filters
 

   useEffect(()=>{
    setBtnStyling({
        padding: "10px 15px",
        border:"0",
        borderRadius: "10px",
        backgroundColor:"#edf1f6",
        marginBottom:"5px"
    })
   },[])

//    useEffect(()=>{

//    },[selectedValues])


   function handleEnterOnLoadMore(e){
        e.target.style.backgroundColor = "#d9d9d9"
   }

    function handleLeaveOnLoadMore(e){
        e.target.style.backgroundColor = "#edf1f6"
        e.target.style.color = "#000";
   }

   function handleClickOnLoadMoreBtn(e){
    e.target.style.backgroundColor = "#3446EC";
    e.target.style.color = "#fff";
    setIsClickedLoadMore((prev) => !prev);
   }

   function handleClickOnFundHouse(e){
    console.log(e.target.textContent)
    setIsClickedOnFundHouse((prev) => !prev)
    // e.target.style.backgroundColor = isClickedOnFundHouse?"#3446EC":"#fff";
    // e.target.style.color = isClickedOnFundHouse?"#fff":"#000";
    setExternalLinkColor((prev)=>!prev)
    setSelectedValues({ 
        companyName: e.target.textContent
    })
 
   }

   function handleMouseEnterOnFundHouse(e){
    e.target.style.border = "2px solid blue";
    e.target.style.transform = "translateY(5px)"
   }

   function handleMouseLeaveOnFundHouse(e){
    e.target.style.border = "1px solid rgba(0,0,255,0.1)";
    e.target.style.transform = "translateY(0)"
   }

   function handleClickOnFilters(e){
    setSelectedValues((prev)=>({
        ...prev,
        filter:e.target.textContent
    }))
   }


   function handleClickOnShowDetails(e){
   
    console.log(selectedValues)

    if(selectedValues.companyName && selectedValues.filter){
        
    
   
    const newFilteredSchemeNames = schemeNames.filter((item,index) => 
    {
        // arrayForNavFilteredValues = []
        if(selectedValues.filter==="All Funds"){
            if(item.includes(selectedValues.companyName.split(" ")[0]) &&
            (!item.includes("Direct") && !item.includes("DIRECT"))){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"]);

            return item
        }
    }
        else{
           if(item.includes(selectedValues.companyName.split(" ")[0]) &&
            item.includes(selectedValues.filter.split(" ")[0]) && 
            !item.includes("Direct") && !item.includes("DIRECT")){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"]);
            return item;
        }
        }
    });
    setFilteredSchemeNames(newFilteredSchemeNames)
}
    else{
        alert("Select all Values")
    }

    
    setFilteredNavValues(arrayForNavFilteredValues);
   }

   function handleChangeOnInput(e){
    setFilteredSchemeNames(filteredSchemeNames.filter((scheme)=>{
        if(scheme.toLowerCase().includes(e.target.value)){
            return scheme;
        }
    }))
 
    
   }

//    useEffect(()=>{
//     setSelectedValues({
//         companyName:selectedFundHouse,
//         filter:selectedFilter
//     })
//     console.log(selectedValues)
//    },[selectedFundHouse,selectedFilter])

//    filteredCodes && (
//     filteredCodes.forEach((item) => {
//         console.log(item)
//     })
//    )

    //  filteredCodes && (
    //     console.log(filteredCodes)
    //  )


    // function handleBtnStyling(){
    //     setBtnStyling({
    //         padding: "10px 15px",
    //         border:"0",
    //         borderRadius: "10px",
    //         backgroundColor:"#edf1f6",
    //     })
    // }

    // function changeBackground(e){
    //     e.target.style.backgroundColor = "#3446EC";
    //     e.target.style.color = "#fff"

    // }


    // function removeFocus(){
    //     e.target.style.backgroundColor = "#edf1f6";
    //     e.target.stylle.color = "#000"
    // }

  return (
    <div id="mututal-funds-container">
         
    <h3>Mutual Funds</h3>
    <br />
    <h4>Select Mutual Fund House</h4>
    <div id='mutual-fund-house-container'>
     
    {
       filteredCodes && ( filteredCodes.map((item,index)=>{
        if(index<=3){
            return <div onMouseEnter={handleMouseEnterOnFundHouse} onMouseLeave={handleMouseLeaveOnFundHouse} onClick={handleClickOnFundHouse} style={{
                display:"flex",
                flexDirection:"column",
                flexWrap:"wrap",
                maxWidth:"200px",
                minWidth:"200px",
                minHeight:"200px",
                maxHeight:"200px",
                alignItems:"center",
                justifyContent:"center",
                textAlign:"center",
                marginRight:"10px",
                marginBottom:"10px",
                backgroundColor:"#fff",
                color:"#000",
                padding: "15px 30px",
                borderWidth:"1px",
                borderStyle:"solid",
                borderColor: "rgba(0,0,255,0.1)",
                borderRadius: "20px",
                fontWeight: "600",
                transition:"all 0.5s"
            }} className='mutual-fund-house-name'>
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
            <div>
            {item}
            <ExternalLink size={"13px"} style={{marginLeft:"10px",color:"inherit"}} />
            </div>      
            </div>
            

        }
        else if(index===4){
            return <div style={{
                textAlign:"center",
                width:"100%",}}>
                 
            <button style={btnStyling} onMouseEnter={handleEnterOnLoadMore} onMouseLeave={handleLeaveOnLoadMore} onClick={handleClickOnLoadMoreBtn} id='load-more-btn'>
                {isClickedLoadMore?"Hide":"Show More"}
            </button>
            </div>
        }
        else{
           return <div onMouseEnter={handleMouseEnterOnFundHouse} onMouseLeave={handleMouseLeaveOnFundHouse} onClick={handleClickOnFundHouse} style={{
          display:isClickedLoadMore?"flex":"none",
         flexDirection:"column",
         flexWrap:"wrap",
         maxWidth:"200px",
         minWidth:"200px",
         minHeight:"200px",
         maxHeight:"200px",
         alignItems:"center",
         justifyContent:"center",
         textAlign:"center",
         marginRight:"10px",
         marginBottom:"10px",
         backgroundColor:"#fff",
         color:"#000",
         padding: "15px 30px",
         borderWidth:"1px",
         borderStyle:"solid",
         borderColor: "rgba(0,0,255,0.1)",
         borderRadius: "20px",
         fontWeight: "600",
         transition:"all 0.5s"
           }} className='mutual-fund-house-name'>
           
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
            <div>
           {item}
           <ExternalLink size={"13px"}  style={{marginLeft:"10px",color:"inherit"}} />
           </div>
           
           </div>
        }
        
        })
    )
      }
    </div>
    <div id="mutual-funds-filters">
        <h4 style={{marginBottom:"5px"}}>Select Type Of Mutual Fund</h4>

 
      <button onClick={handleClickOnFilters} className="filter all-funds-filter">All Funds</button>
      <button onClick={handleClickOnFilters} className="filter equity-filter">Equity</button>
      <button onClick={handleClickOnFilters} className="filter debt-filter">Debt</button>
      <button onClick={handleClickOnFilters} className="filter hybrid-filter">Hybrid</button>
      <button onClick={handleClickOnFilters} className="filter goldtraded-filter">Gold Traded Fund</button>
      <button onClick={handleClickOnFilters} className="filter largecap-filter">Large Cap</button>
      <button onClick={handleClickOnFilters} className="filter midcap-filter">Mid Cap</button>
      <button onClick={handleClickOnFilters} className="filter smallcap-filter">Small Cap</button>
      <button onClick={handleClickOnFilters} className="filter flexicap-filter">Flexi Cap Fund</button>
      <button onClick={handleClickOnFilters} className="filter multicap-filter">Multi Cap Fund Asset Allocation</button>
      <button onClick={handleClickOnFilters} className="filter globalfund-filter">Global Funds</button>
      <button onClick={handleClickOnFilters} className="filter etffund-filter">ETF Funds</button>
      <button onClick={handleClickOnFilters} className="filter balancefund-filter">Balance Funds</button>
      <button onClick={handleClickOnFilters} className="filter hybridfund-filter">Hybrid Funds</button>
      <button onClick={handleClickOnFilters} className="filter valuefund-filter">Value Funds</button>
      <button onClick={handleClickOnFilters} className="filter elssfund-filter">ELSS Funds</button>
      
    <hr />
    </div>

    
   <div id="applied-filters-container">
    <div>
        <button onClick={handleClickOnShowDetails} style={{padding:"10px 15px",border:"0",cursor:"pointer",borderRadius:"10px",marginTop:"5px",backgroundColor:"rgb(237, 241, 246)",marginBottom:"5px"}}>Show Details</button>
      <input id="mutual-fund-search" type="text" placeholder='Type "Axis Small Cap Fund" '
      onChange={handleChangeOnInput}/>
    </div>
  </div>

  <div style={{fontWeight:"bold"}} id='all-filters-container'>
    <div  id='left-side-filter'>Scheme Name
    </div>
    <div id="right-side-filters">
        <div id='oneyear-nav'>Current Nav
      
        </div>
    </div>
  </div>
  <div id='mutual-fund-data-container'>
        {
       filteredSchemeNames.length>0?(
        filteredSchemeNames.map((scheme,index)=>{
           
            return <div key={index} style={{padding: "10px 0px 10px 20px"}} className='company-data'>
            <h4 style={{fontWeight:"500"}}>{scheme}</h4>
            <div id="one-year-return-container">
            <div className='oneyr-return'>
                    {filteredNavValues[index]}
                </div>
            </div>

            </div>
            
          
        })
       ):<p>No Schemes found with selected criteria</p>            
}
   
    </div>
        
  </div>
  )
}

export default MutualFund