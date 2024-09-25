import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import * as SliderPrimitive from "@radix-ui/react-slider"

interface MeasurementModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (value: number) => void
  title: string
  initialValue: number
}

export function MeasurementModal({ isOpen, onClose, onConfirm, title, initialValue }: MeasurementModalProps) {
  const [value, setValue] = useState(initialValue)

  const handleConfirm = () => {
    onConfirm(value)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-300 boder-green-500">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <SliderPrimitive.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[value]}
            onValueChange={(newValue) => setValue(newValue[0])}
            max={100}
            step={1}
          >
            <SliderPrimitive.Track className="bg-slate-100 relative grow rounded-full h-2">
              <SliderPrimitive.Range className="absolute bg-green-500 rounded-full h-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
              aria-label="Slider"
            />
          </SliderPrimitive.Root>
          <div className="text-center mt-2">{value}%</div>
        </div>
        <DialogFooter>
          <Button className='shad-primary-btn' onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}