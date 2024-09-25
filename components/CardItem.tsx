import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import MeasurementButtons from './MeasurementButtons'
import { QRDialog } from './QRDialog'

interface CardItemProps {
  item: {
    title: string
    value: string
    image: string
    qrCode: string
    measurements: {
      temperature?: number
      humidity?: number
      rain?: number
      sunlight?: number
      hydration?: number
    }
  }
  index: number
  activeSection: 'lotes' | 'plantas'
}

const CardItem = ({ item, index, activeSection }: CardItemProps) => {
  const [measurements, setMeasurements] = useState(item.measurements)
  const [activeButton, setActiveButton] = useState<{
    cardIndex: number | null
    buttonType: string | null
  }>({
    cardIndex: null,
    buttonType: null
  })

  const handleButtonClick = (cardIndex: number, buttonType: string | null) => {
    setActiveButton({ cardIndex, buttonType })
  }

  const handleMeasurementChange = (type: string, value: number) => {
    setMeasurements(prev => ({ ...prev, [type]: value }))
    // Aquí podrías enviar los cambios al backend si es necesario
  }

  return (
    <Card key={index} className="relative bg-dark-500 border-gray-700 max-w-[300px] flex flex-col items-center">
      <QRDialog title={item.title} qrCode={item.qrCode} />
      
      <CardContent className="p-4 flex flex-col items-center">
        <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-40 object-fill mb-4 rounded" />
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-2xl font-bold mb-4">{item.value}</p>

        <MeasurementButtons
          index={index}
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
          activeSection={activeSection}
          measurements={measurements}
          onMeasurementChange={handleMeasurementChange}
        />
      </CardContent>
    </Card>
  )
}

export default CardItem