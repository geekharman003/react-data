import React from 'react'
import { Briefcase,ChartPie,Clock5,Shield } from 'lucide-react';
import "./Features.css"

const Features = () => {
  return (
    <div id='features-container'>
        <h2>Why Choose Our Platform</h2>
        <div id='features'>
            <div className='feature feature1'>
                <div className='feature-icon'>
                    <Briefcase color='#2563EB' />
                </div>
                <h3>Expert Management</h3>
                <p>Professional fund managers with proven track records</p>
            </div>
            <div className='feature feature1'>
                <div className='feature-icon'>
                    <ChartPie color='#2563EB' />
                </div>
                <h3>Diversification</h3>
                <p>Spread your risk across multiple investments</p>
            </div>
            <div className='feature feature1'>
                <div className='feature-icon'>
                    <Clock5 color='#2563EB' />
                </div>
                <h3>Flexible Investment</h3>
                <p>Start with as little as $500</p>
            </div>
            <div className='feature feature1'>
                <div className='feature-icon'>
                    <Shield color='#2563EB' />
                </div>
                <h3>Secure Platform</h3>
                <p>Bank-grade security for your investments</p>
            </div>
          
        </div>
    </div>
  )
}

export default Features