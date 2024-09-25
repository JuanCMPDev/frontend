"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { lotesData, seedsData } from "@/utils/dummyData";
import { Check, ArrowLeft, Sprout } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  loteName: z.string().min(2, { message: "El nombre del lote debe tener al menos 2 caracteres" }),
  seedType: z.string().min(1, { message: "Debes seleccionar un tipo de semilla" }),
  quantity: z.number().min(10).max(50),
});

export function PlantRegistrationForm() {
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loteName: "",
      seedType: "",
      quantity: 10,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newLote = {
      title: values.loteName,
      value: `${values.quantity} plantas`,
      image: seedsData.find(seed => seed.name === values.seedType)?.image || "/assets/img/plant.png",
      createdAt: new Date(),
      qrCode: `/assets/qrcodes/${values.loteName.replace(/\s+/g, '').toLowerCase()}.png`,
      humidity: "50%",
      temperature: "22°C",
      hydration: "65%",
      light: "75%",
      measurements: {
        temperature: 22,
        humidity: 50,
        rain: 15,
        sunlight: 75
      }
    };

    lotesData.push(newLote);
    setIsRegistered(true);
  }

  const resetForm = () => {
    form.reset();
    setIsRegistered(false);
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-dark-300 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white">Registro de Lote Exitoso</h2>
        <p className="text-center text-gray-300">El nuevo lote ha sido creado correctamente.</p>
        <div className="flex flex-col space-y-4 w-full">
          <Button onClick={() => window.location.href = '/dashboard'} className="w-full bg-green-500 hover:bg-green-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
          </Button>
          <Button onClick={resetForm} variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
            <Sprout className="mr-2 h-4 w-4" /> Registrar Nuevo Lote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-dark-300 p-8 rounded-lg shadow-md">
        <section className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold text-white">Registro de Nuevo Lote</h1>
          <p className="text-gray-300">Completa los siguientes datos para crear un nuevo lote de plantas</p>
        </section>

        <FormField
          control={form.control}
          name="loteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre del Lote</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Lote A1" {...field} className="bg-dark-400 text-white border-gray-600" />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seedType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo de Semilla</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-dark-400 text-white border-gray-600">
                    <SelectValue placeholder="Selecciona un tipo de semilla" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-dark-400 text-white border-gray-600">
                  {seedsData.map((seed) => (
                    <SelectItem key={seed.id} value={seed.name}>
                      <div className="flex items-center gap-2">
                        <Image src={seed.image} alt={seed.name} width={24} height={24} />
                        <span>{seed.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Cantidad de Plantas</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <SliderPrimitive.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    min={10}
                    max={50}
                    step={10}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  >
                    <SliderPrimitive.Track className="bg-gray-600 relative grow rounded-full h-2">
                      <SliderPrimitive.Range className="absolute bg-green-500 rounded-full h-full" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                      className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                    />
                  </SliderPrimitive.Root>
                  <div className="text-center text-white">{field.value} plantas</div>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button type="submit" onClick={() => {router.push('/dashboard')}} className="w-full bg-green-500 hover:bg-green-600">Crear &nbsp; Lote</Button>
      </form>
    </Form>
  );
}

export default PlantRegistrationForm;