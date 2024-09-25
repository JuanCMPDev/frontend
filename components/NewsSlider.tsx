import { newsItems } from '@/utils/dummyData'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const NewsSlider = () => {

  const [currentNews, setCurrentNews] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextNews = () => setCurrentNews((prev) => (prev + 1) % newsItems.length)
  const prevNews = () => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)

  return (
    <div className="bg-gray-800 p-4 relative h-64">
    <div className="absolute inset-0">
      <img 
        src={newsItems[currentNews].image} 
        alt="News" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className='h-24 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-md'>
          <CardContent className='p-0 px-4'>
            <p className="text-2xl text-center px-4">{newsItems[currentNews].text}</p>
          </CardContent>
        </Card>
      </div>
    </div>
    <Button variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2" onClick={prevNews}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={nextNews}>
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
  )
}

export default NewsSlider