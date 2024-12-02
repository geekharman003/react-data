import React, { useEffect, useState } from 'react'
import "./MutualFund.css"
import { ExternalLink } from 'lucide-react';
import { Search } from 'lucide-react';

const MutualFund = ({schemeCodes,schemeNames}) => {

    const [btnStyling,setBtnStyling] = useState({});
    const [isClickedLoadMore,setIsClickedLoadMore] = useState(false);

    const selectedValues = {
        companyName:"",
        category:""
    };

   const filteredCodes = [];
   schemeCodes.forEach((item) => {
    if(!filteredCodes.includes(item.value) && item.value.includes("Mutual Fund")){
        filteredCodes.push(item.value)
    }
   })

   const filteredSchemeNames= [];

   useEffect(()=>{
    setBtnStyling({
        padding: "10px 15px",
        border:"0",
        borderRadius: "10px",
        backgroundColor:"#edf1f6",
    })
   },[])


   function handleEnter(e){
        e.target.style.backgroundColor = "#d9d9d9"
   }

    function handleLeave(e){
        e.target.style.backgroundColor = "#edf1f6"
        e.target.style.color = "#000";
   }

   function handleLoadMoreBtn(e){
    e.target.style.backgroundColor = "#3446EC";
    e.target.style.color = "#fff";
    setIsClickedLoadMore((prev) => !prev);
   }

   

   function handleClickOnFundHouse(e){
    selectedValues.companyName = e.target.textContent;
    console.log(selectedValues.companyName)
   }

   function handleClickOnFilters(e){
    selectedValues.category = e.target.textContent;
    schemeNames.forEach((item)=>{
        if(item.includes(selectedValues.companyName.split(" ")[0]) && item.includes(selectedValues.category.split(" ")[0])){
            console.log(item)
           filteredSchemeNames.push(item);
        }
    })
   }

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
            return <div onClick={handleClickOnFundHouse} style={{
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
                borderColor: "rgba(0,0,255,0.04)",
                borderRadius: "20px",
                fontWeight: "600"
            }} className='mutual-fund-house-name'>
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
            <div style={{}}>
            {item}
            <ExternalLink size={"13px"} color='grey' style={{marginLeft:"10px"}} />
            </div>      
            </div>
            

        }
        else if(index===4){
            return <div style={{
                textAlign:"center",
                width:"100%",}}>
                 
            <button style={btnStyling} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={handleLoadMoreBtn} id='load-more-btn'>
                {isClickedLoadMore?"Hide":"Show More"}
            </button>
            </div>
        }
        else{
           return <div  style={{
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
         borderColor: "rgba(0,0,255,0.04)",
         borderRadius: "20px",
         fontWeight: "600"

           }} className='mutual-fund-house-name'>
           
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
            <div>
           {item}
           <ExternalLink size={"13px"} color='grey' style={{marginLeft:"10px"}} />
           </div>
           
           </div>
        }
        
        })
    )
      }
    </div>
    <div id="mutual-funds-filters">

 
      <button onClick={handleClickOnFilters} className="filter all-funds-filter">All Funds</button>
      <button onClick={handleClickOnFilters} className="filter equity-filter">Equity</button>
      <button onClick={handleClickOnFilters} className="filter debt-filter">Debt</button>
      <button onClick={handleClickOnFilters} className="filter hybrid-filter">Hybrid</button>
    <hr />
    </div>
   <div id="applied-filters-container">
    <div>
      <input id="mutual-fund-search" type="text" placeholder='Type "Axis Small Cap Fund" ' />
    </div>
  </div>

  <div id='all-filters-container'>
    <div id='left-side-filter'>Scheme Name</div>
    <div id="right-side-filters">
        <div>1Y</div>
    </div>
  </div>
  <div id='mutual-fund-data-container'>
        <div className="company-data">

        {
        filteredSchemeNames && (
            filteredSchemeNames.map((scheme)=>{
             <div className='company-name'>
                <h4>{scheme}</h4>
            </div>
            })
        )
    }
    </div>
 
            {/* <div className='company-name'>
                <h4>Axis Bank Small Cap Mutual Fund</h4>
            </div>
            <div className='returns'>
                <div>20%</div>
            </div>
        </div>
        <div className="company-data">
            <div className='company-name'>
                <h4>HDFC Mid-Cap Opportunities Direct Plan-Growth</h4>
            </div>
            <div className='returns'>
                <div>20%</div>
            </div>
        </div>
        <div className="company-data">
            <div className='company-name'>
                <h4>Motilal Oswal Midcap Fund Direct-Growth</h4>
            </div>
            <div className='returns'>
                <div>20%</div>
            </div>
        </div>
        <div className="company-data">
            <div className='company-name'>
                <h4>Invesco India Mid Cap Fund Direct-Growth</h4>
            </div>
            <div className='returns'>
                <div>20%</div>
            </div>
        </div> */}
  </div>

  </div>
  )
}

export default MutualFund