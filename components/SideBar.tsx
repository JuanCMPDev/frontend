import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Package, Sprout, UserPlus, Clock, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as SliderPrimitive from "@radix-ui/react-slider"

type TimeUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

const SideBar = ({ userType, activeSection, setActiveSection }: any) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [timeMultiplier, setTimeMultiplier] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [timeDirection, setTimeDirection] = useState<'forward' | 'backward'>('forward')
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('seconds')

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentDate(new Date())

      const timer = setInterval(() => {
        setCurrentDate(prevDate => {
          if (!prevDate) return new Date()
          const newDate = new Date(prevDate)
          const multiplier = timeDirection === 'forward' ? timeMultiplier : -timeMultiplier
          switch (timeUnit) {
            case 'years':
              newDate.setFullYear(newDate.getFullYear() + multiplier)
              break
            case 'months':
              newDate.setMonth(newDate.getMonth() + multiplier)
              break
            case 'days':
              newDate.setDate(newDate.getDate() + multiplier)
              break
            case 'hours':
              newDate.setHours(newDate.getHours() + multiplier)
              break
            case 'minutes':
              newDate.setMinutes(newDate.getMinutes() + multiplier)
              break
            case 'seconds':
              newDate.setSeconds(newDate.getSeconds() + multiplier)
              break
          }
          return newDate
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeMultiplier, timeDirection, timeUnit])

  const handleSliderChange = (value: number[]) => {
    setTimeMultiplier(value[0])
  }

  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0')

  const handleRegister = () => {
    router.push('/registro')
  }

  const toggleAlert = () => {
    setShowAlert(!showAlert)
  }

  return (
    <>
      <div className="w-64 bg-dark-300 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Carlos Núñez</h2>
              <p className="text-sm text-gray-400">{userType === 'administrador' ? 'Administrador' : 'Operador'}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1">
          <ul className="p-2 space-y-2">
            <li>
              <Button
                className={`w-full justify-start ${activeSection === 'lotes' ? 'bg-green-500' : 'ghost'}`}
                onClick={() => setActiveSection('lotes')}
              >
                <Package className="h-5 w-5 mr-2" />
                <span>Lotes</span>
              </Button>
            </li>
            <li>
              <Button
                className={`w-full justify-start ${activeSection === 'plantas' ? 'bg-green-500' : 'ghost'}`}
                onClick={() => setActiveSection('plantas')}
              >
                <Sprout className="h-5 w-5 mr-2" />
                <span>Plantas</span>
              </Button>
            </li>
            {userType === 'administrador' && (
              <>
                <li>
                  <Button variant="ghost" className="w-full justify-start" onClick={()=>{router.push('/registro-planta')}}>
                    <Package className="h-5 w-5 mr-2" />
                    <span>Crear Lote</span>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleRegister}>
                    <UserPlus className="h-5 w-5 mr-2" />
                    <span>Crear Usuario</span>
                  </Button>
                </li>
              </>
            )}
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={toggleAlert}>
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>Simular Alerta</span>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5" />
            <span className="text-sm">
              {currentDate ? (
                <>
                  {currentDate.getFullYear()}-
                  {formatTimeUnit(currentDate.getMonth() + 1)}-
                  {formatTimeUnit(currentDate.getDate())}{" "}
                  {formatTimeUnit(currentDate.getHours())}:
                  {formatTimeUnit(currentDate.getMinutes())}:
                  {formatTimeUnit(currentDate.getSeconds())}
                </>
              ) : (
                "Cargando..."
              )}
            </span>
          </div>
          <div className="space-y-4 my-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="time-direction" className="text-sm">Dirección del tiempo:</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="time-direction"
                  checked={timeDirection === 'forward'}
                  onCheckedChange={(checked) => setTimeDirection(checked ? 'forward' : 'backward')}
                  className="custom-switch"
                />
                {timeDirection === 'forward' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              </div>
            </div>
            <div>
              <Label htmlFor="time-unit" className="text-sm">Unidad de tiempo:</Label>
              <Select value={timeUnit} onValueChange={(value: TimeUnit) => setTimeUnit(value)}>
                <SelectTrigger id="time-unit">
                  <SelectValue placeholder="Selecciona unidad de tiempo" />
                </SelectTrigger>
                <SelectContent className="bg-dark-300">
                  <SelectItem value="years">Años</SelectItem>
                  <SelectItem value="months">Meses</SelectItem>
                  <SelectItem value="days">Días</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="seconds">Segundos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time-multiplier" className="text-sm">Velocidad del tiempo: x{timeMultiplier}</Label>
              <SliderPrimitive.Root
                className="relative flex items-center select-none touch-none w-full h-5 mt-2"
                value={[timeMultiplier]}
                onValueChange={handleSliderChange}
                max={10}
                step={1}
                aria-label="Time multiplier"
              >
                <SliderPrimitive.Track className="bg-slate-100 relative grow rounded-full h-2">
                  <SliderPrimitive.Range className="absolute bg-green-500 rounded-full h-full" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                />
              </SliderPrimitive.Root>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className="bg-red-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Alerta de Hidratación Baja
            </DialogTitle>
            <DialogDescription className="text-white text-lg">
              La planta en el Lote A1 tiene un nivel crítico de hidratación.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={toggleAlert}
              className="bg-white text-red-600 hover:bg-red-100"
            >
              Cerrar Alerta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        /* Estilos agresivos para el Switch */
        .custom-switch {
          width: 42px !important;
          height: 25px !important;
          background-color: #6b7280 !important;
          border-radius: 9999px !important;
          position: relative !important;
          transition: background-color 0.2s !important;
          cursor: pointer !important;
        }

        .custom-switch[data-state="checked"] {
          background-color: #22c55e !important;
        }

        .custom-switch::before {
          content: "" !important;
          position: absolute !important;
          top: 0px !important;
          left: 0px !important;
          width: 21px !important;
          height: 21px !important;
          background-color: white !important;
          border-radius: 50% !important;
          transition: transform 0.2s !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        .custom-switch[data-state="checked"]::before {
          transform: translateX(17px) !important;
        }

        .custom-switch::before {
          z-index: 1 !important;
        }

        .custom-switch > span {
          display: none !important;
        }
      `}</style>
    </>
  )
}

export default SideBar