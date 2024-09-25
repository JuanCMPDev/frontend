import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface QRDialogProps {
  title: string
  qrCode: string
}

export function QRDialog({ title, qrCode }: QRDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-2 right-2 border-2 border-white">
          <Image src='/assets/icons/qr.svg' alt='qr-icon' width={24} height={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-300 border-green-500">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p>Identificador unico:</p>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <Image src="/assets/img/qr-example.png" alt="QR Code" width={200} height={200} />
        </div>
      </DialogContent>
    </Dialog>
  )
}