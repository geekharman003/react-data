import React, { useEffect, useState,useRef } from 'react'
import "./MutualFund.css"
import { ExternalLink } from 'lucide-react';
import { Search } from 'lucide-react';


const MutualFund = ({schemeCodes,schemeNames,netAssetValues}) => {

    const FundHouseRefs = useRef([]);
    const FiltersRef = useRef(null)
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
    const [isClickedOnFilter,setIsClickedOnFilter] = useState(false)


    //made an array to store filtered nav values
    let arrayForNavFilteredValues = [];


    //stores the values from scheme code column which include "Mutual Fund" text
   const filteredCodes = [];
   schemeCodes.forEach((item) => {
    if(!filteredCodes.includes(item.value) && item.value.includes("Mutual Fund")){
        filteredCodes.push(item.value)
    }
   })
 

   useEffect(()=>{
    setBtnStyling({
        padding: "10px 15px",
        border:"0",
        borderRadius: "10px",
        backgroundColor:"#edf1f6",
        marginBottom:"5px"
    })
   },[])






//load more button

function handleClickOnLoadMoreBtn(e){
    e.target.style.backgroundColor = "#3446EC";
    e.target.style.color = "#fff";
    setIsClickedLoadMore((prev) => !prev);
   }


   function handleEnterOnLoadMore(e){
        e.target.style.backgroundColor = "#d9d9d9"
   }

    function handleLeaveOnLoadMore(e){
        e.target.style.backgroundColor = "#edf1f6"
        e.target.style.color = "#000";
   }


   //fund house
   
   function handleClickOnFundHouse(index,e){

    setIsClickedOnFundHouse((prev) => !prev)
    //   FundHouseRefs.current[index].style.backgroundColor = isClickedOnFundHouse?"#e6ae15":"#fff"
    setExternalLinkColor((prev)=>!prev)
    setSelectedValues({ 
        companyName: e.target.textContent
    })
    let MutualFundPositions = FundHouseRefs.current[index].getBoundingClientRect();
    let filterPositions = FiltersRef.current.getBoundingClientRect();
    console.log(MutualFundPositions.y,filterPositions.y)
    window.scrollBy(0,filterPositions.y-MutualFundPositions.y)
   }

   function handleMouseEnterOnFundHouse(index){
    FundHouseRefs.current[index].style.backgroundColor = "#edf1f6";
    FundHouseRefs.current[index].style.border = "1px solid #245FE5"
     FundHouseRefs.current[index].style.transform = "translateY(5px)"
    //     e.style.border = "1px solid blue";
    //     e.style.transform = "translateY(5px)";
    //   }
   }

   function handleMouseLeaveOnFundHouse(index){
    FundHouseRefs.current[index].style.backgroundColor = "#fff";
    FundHouseRefs.current[index].style.border = "1px solid rgba(0,0,255,0.05)"
    FundHouseRefs.current[index].style.transform = "translateY(0px)"
   }


   //filters

   function handleClickOnFilters(e){
    setIsClickedOnFilter((prev)=>!prev)
    // e.target.style.backgroundColor = isClickedOnFilter?"#245FE5":"#edf1f6"
    // e.target.style.color = isClickedOnFilter?"#fff":"#000"
    setSelectedValues((prev)=>({
        ...prev,
        filter:e.target.textContent
    }))
   }

   function HandleMouseEnterOnFilters(e){
     e.target.style.backgroundColor = "#d9d9d9"
   }


   function HandleMouseLeaveOnFilters(e){
    e.target.style.backgroundColor = "#edf1f6"
    e.target.style.color = "#000";
   }

   function handleClickOnShowDetails(e){
   
    console.log(selectedValues.companyName)

    
        
    
   
    const newFilteredSchemeNames = schemeNames.filter((item,index) => 
    {
        // arrayForNavFilteredValues = []
        if(selectedValues.filter==="All Funds"){
            if(item.includes(selectedValues.companyName.split(" ")[0]) &&
            (!item.includes("Direct") && !item.includes("DIRECT"))){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"]);

            return item;
        }
    }
         else if(selectedValues.filter === "Top Funds of All Categories"){
            if(item.includes("Motilal") && item.includes("ELSS") && item.includes("Growth") && !item.includes("Direct")){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"])
            return item;
        }
        else if(item.includes("JM") && item.includes("ELSS") && item.includes("Growth") && !item.includes("Direct")){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"])
            return item;
        }
        else if(item.includes("SBI") && item.includes("LONG") && item.includes("EQUITY")  && item.includes("GROWTH") && !item.includes("Direct") && !item.includes("DIRECT")){
            arrayForNavFilteredValues.push(netAssetValues[index]["Net Asset Value"])
            return item;
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
    setFilteredNavValues(arrayForNavFilteredValues);
   }

   function HandleMouseEnterOnShowDetails(e){
    e.target.style.backgroundColor = "#d9d9d9"
   }

   function HandleMouseLeaveOnShowDetails(e){
    e.target.style.backgroundColor = "#edf1f6"
    
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
     <div style={{display:filteredCodes.length>0?"none":"flex",flexDirection:"column",alignItems:"center",width:"100%",margin:"10px 0"}}>
        <div id="loader" style={{borderRadius:"50%",width:"50px",height:"50px",borderTop:"2px solid black",animationName:"loading",animationDuration:"1s",animationIterationCount:"infinite",
        animationTimingFunction:"linear"
        }}></div>
        <p style={{marginLeft:"5px"}}>Loading...</p>
     </div>
    {
       filteredCodes && filteredCodes.map((item,index)=>{
        if(index<=3){
            return <div ref={(el)=>{
                FundHouseRefs.current[index] = el;
            }}
                onMouseEnter={()=>{handleMouseEnterOnFundHouse(index)}} 
                onMouseLeave={()=>{
                    handleMouseLeaveOnFundHouse(index)
                }}
                onClick={(e)=>handleClickOnFundHouse(index,e)} key={index} style={{
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
                padding: "5px",
                border:"1px solid rgba(0,0,255,0.05)",
                borderRadius: "20px",
                fontWeight: "600",
                transition:"all 0.5s"
            }} className='mutual-fund-house-name'>
            <div style={{width:"100px"}}>
            <img width={"100%"} src={`src/images/${item.split(" ")[0]}.jpg`}/>
            </div>
            <div className='mutual-fund-name'>
            {item}
            <ExternalLink size={"13px"} style={{marginLeft:"10px",color:"inherit"}} />
            </div>      
            </div>
            

        }
        else if(index===4){
            return <div key={index} style={{
                textAlign:"center",
                width:"100%",}}>
                 
            <button style={btnStyling} onMouseEnter={handleEnterOnLoadMore} onMouseLeave={handleLeaveOnLoadMore} onClick={handleClickOnLoadMoreBtn} id='load-more-btn'>
                {isClickedLoadMore?"Show Less":"Show More"}
            </button>
            </div>
        }
        else if(item.includes("360")){
            return
        }
            
        else{
           return <div ref={(el)=>{
            FundHouseRefs.current[index] = el
        }}
        onMouseEnter={()=>{handleMouseEnterOnFundHouse(index)}}
        onMouseLeave={()=>{handleMouseLeaveOnFundHouse(index)}}
         onClick={(e)=>handleClickOnFundHouse(index,e)} key={index} style={{
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
            <div className='mutual-fund-name'>
           {item}
           <ExternalLink size={"13px"}  style={{marginLeft:"10px",color:"inherit"}} />
           </div>
           </div>
        }
        
        })

      }
    </div>
    <div id="mutual-funds-filters" ref={FiltersRef}>
        <h4 style={{marginBottom:"5px"}}>Select Type Of Mutual Fund</h4>

 
      <button onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters}  onClick={handleClickOnFilters} className="filter all-funds-filter">All Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter equity-filter">Equity</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter debt-filter">Debt</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter hybrid-filter">Hybrid</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter goldtraded-filter">Gold Traded Fund</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter largecap-filter">Large Cap</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter midcap-filter">Mid Cap</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter smallcap-filter">Small Cap</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter flexicap-filter">Flexi Cap Fund</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter multicap-filter">Multi Cap Fund Asset Allocation</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter globalfund-filter">Global Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter etffund-filter">ETF Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter balancefund-filter">Balance Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter hybridfund-filter">Hybrid Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter valuefund-filter">Value Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter elssfund-filter">ELSS Funds</button>
      <button  onMouseEnter={HandleMouseEnterOnFilters} onMouseLeave={HandleMouseLeaveOnFilters} onClick={handleClickOnFilters} className="filter topfund-filter">Top Funds of All Categories</button>  
    <hr />
    <button onMouseEnter={HandleMouseEnterOnShowDetails} onMouseLeave={ HandleMouseLeaveOnShowDetails} onClick={handleClickOnShowDetails} style={{padding:"10px 15px",border:"0",cursor:"pointer",borderRadius:"10px",marginTop:"5px",backgroundColor:"rgb(237, 241, 246)",marginBottom:"5px"}}>Show Details</button>
    </div>

    
    <div style={{fontWeight:"bold",position:"sticky",top:"5px"}} id='all-filters-container'>
    <div  id='left-side-filter' style={{width:"40%"}}>Scheme Name
    </div>
    <div id="right-side-filters">
        <div id='oneyear-nav'>Current Nav
        </div>
        <div>1Y Return</div>
        <div>3Y Return</div>
        <div>5Y Return</div>
    </div>
  </div>
  <div id='mutual-fund-data-container'>
        {
       filteredSchemeNames.length>0?(
        filteredSchemeNames.map((scheme,index)=>{
           
            return <div key={index} className='company-data'>
            <h4 style={{fontWeight:"500",width:"40%"}}>{scheme}</h4>
            <div className='right-side-company-data' style={{display:"flex",gap:"9vw"}}>
            <div id="one-year-return-container">
            <div className='oneyr-return' style={{width:"91px",textAlign:"right"}}>
                    {filteredNavValues[index]}
                </div>
            </div>
            <div>
                <p>22.6</p>
            </div>
            <div>
                <p>3.8</p>
            </div>
            <div>
               <p>10</p>
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