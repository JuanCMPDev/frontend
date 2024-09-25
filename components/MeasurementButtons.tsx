import React, { useState } from 'react'
import { Button } from './ui/button'
import { Thermometer, Droplet, CloudRain, Sun } from 'lucide-react'
import { MeasurementModal } from './MeasurementModal'

interface MeasurementButtonsProps {
  index: number
  activeButton: {
    cardIndex: number | null
    buttonType: string | null
  }
  handleButtonClick: (index: number, buttonType: string | null) => void
  activeSection: 'lotes' | 'plantas'
  measurements: {
    temperature?: number
    humidity?: number
    rain?: number
    sunlight?: number
    hydration?: number
  }
  onMeasurementChange: (type: string, value: number) => void
}

const MeasurementButtons = ({
  index,
  activeButton,
  handleButtonClick,
  activeSection,
  measurements,
  onMeasurementChange
}: MeasurementButtonsProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentMeasurement, setCurrentMeasurement] = useState<string | null>(null)

  const openModal = (measurementType: string) => {
    setCurrentMeasurement(measurementType)
    setModalOpen(true)
    handleButtonClick(index, measurementType)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentMeasurement(null)
    handleButtonClick(index, null) // Desactiva el botón al cerrar el modal
  }

  const confirmMeasurement = (value: number) => {
    if (currentMeasurement) {
      onMeasurementChange(currentMeasurement, value)
    }
    closeModal() // Cierra el modal y desactiva el botón después de confirmar
  }

  const getMeasurementTitle = (type: string) => {
    switch (type) {
      case 'temperature': return 'Temperatura'
      case 'humidity': return 'Humedad'
      case 'rain': return 'Lluvia'
      case 'sunlight': return 'Luz solar'
      case 'hydration': return 'Hidratación'
      default: return ''
    }
  }

  const isButtonActive = (buttonType: string) => 
    activeButton.cardIndex === index && activeButton.buttonType === buttonType

  return (
    <div className="flex gap-6 mt-4">
      {activeSection === 'plantas' ? (
        <Button
          onClick={() => openModal('hydration')}
          className={`flex items-center justify-center border-white border-2 w-auto p-0 px-2 ${
            isButtonActive('hydration') ? 'bg-green-500' : ''
          }`}
        >
          <Droplet className="h-6 w-6" />
        </Button>
      ) : (
        <>
          <Button
            onClick={() => openModal('temperature')}
            className={`flex items-center justify-center border-white border-2 w-auto p-0 px-2 ${
              isButtonActive('temperature') ? 'bg-green-500' : ''
            }`}
          >
            <Thermometer className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => openModal('humidity')}
            className={`flex items-center justify-center border-white border-2 w-auto p-0 px-2 ${
              isButtonActive('humidity') ? 'bg-green-500' : ''
            }`}
          >
            <Droplet className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => openModal('rain')}
            className={`flex items-center justify-center border-white border-2 w-auto p-0 px-2 ${
              isButtonActive('rain') ? 'bg-green-500' : ''
            }`}
          >
            <CloudRain className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => openModal('sunlight')}
            className={`flex items-center justify-center border-white border-2 w-auto p-0 px-2 ${
              isButtonActive('sunlight') ? 'bg-green-500' : ''
            }`}
          >
            <Sun className="h-6 w-6" />
          </Button>
        </>
      )}
      {currentMeasurement && (
        <MeasurementModal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={confirmMeasurement}
          title={getMeasurementTitle(currentMeasurement)}
          initialValue={measurements[currentMeasurement] || 0}
        />
      )}
    </div>
  )
}

export default MeasurementButtons