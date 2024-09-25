'use client'

import { useState } from 'react'
import SideBar from '@/components/SideBar'
import NewsSlider from '@/components/NewsSlider'
import CardsGrid from '@/components/CardsGrid'

export default function Dashboard() {
  const [userType, setUserType] = useState('administrador')
  const [activeSection, setActiveSection] = useState('lotes')
  

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <SideBar userType={userType} activeSection={activeSection} setActiveSection={setActiveSection}/>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* News Slider */}
        <NewsSlider/>
        {/* Cards Grid */}
        <CardsGrid activeSection={activeSection}/>
      </div>
    </div>
  )
}