import React from 'react'
import "./MutualFund.css"
import { Search } from 'lucide-react';

const MutualFund = ({schemeCodes}) => {

   const filteredCodes = [];
   schemeCodes.forEach((item) => {
    if(!filteredCodes.includes(item.value) && item.value.includes("Mutual Fund")){
        filteredCodes.push(item.value)
    }
   })


//    filteredCodes && (
//     filteredCodes.forEach((item) => {
//         console.log(item)
//     })
//    )

    //  filteredCodes && (
    //     console.log(filteredCodes)
    //  )


    function changeBackground(e){
        e.target.style.backgroundColor = "#3446EC";
        e.target.style.color = "#fff"

    }


    function removeFocus(){
        e.target.style.backgroundColor = "#edf1f6";
        e.target.stylle.color = "#000"
    }

  return (
    <div id="mututal-funds-container">
         
    <h3>Mutual Funds</h3>
    <br />
    <h4>Select Mutual Fund House</h4>
    <div id='mutual-fund-house-container'>
     
    {
       filteredCodes && ( filteredCodes.map((item)=>{

           return <div onMouseDown onMouseUp style={{
             display:"flex",
        flexDirection:"column",
        flexWrap:"wrap",
        maxWidth:"200px",
        minWidth:"200px",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
         marginRight:"10px",
         marginBottom:"5px",
         border:"0",
         backgroundColor:"#edf1f6",
         color:"#000",
         padding: "10px 15px",
         borderRadius: "20px",
         fontWeight: "600"

           }} className='mutual-fund-house-name'>
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
           {item}</div>
        
        })
    )
      }
    </div>
    <div id="mutual-funds-filters">
      <button className="filter all-funds-filter">All Funds</button>
      <button className="filter equity-filter">Equity</button>
      <button className="filter debt-filter">Debt</button>
      <button className="filter hybrid-filter">Hybrid</button>
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
            <div className='company-name'>
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
        </div>
  </div>

  </div>
  )
}

export default MutualFund