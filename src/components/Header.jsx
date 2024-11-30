import React from "react";
import { Shield,TrendingUp,DollarSign } from 'lucide-react';
import "./Header.css"

function Header(){
    return (
        <div id="header"> 
        <h1 style={{fontSize:"4rem"}}>Smart Investing Made Simple</h1>
        <p>Discover top-performing mutual funds curated by industry experts</p>
        <div id="features-icons">
           <div className="icon icon-one">
            <Shield size={"35px"} />
            Secure Investments
           </div>
           <div className="icon icon-one">
            <TrendingUp size={"35px"}/>
            High Returns
           </div>
           <div className="icon icon-one">
            <DollarSign size={"35px"}/>
            Low Fees
           </div>
        </div>
        </div>
    )
}

export default Header;