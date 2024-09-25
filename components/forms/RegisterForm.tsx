"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions, UserTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import { AuthService } from "./../../services/auth.services";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, UserPlus } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "al menos 2 caracteres",
  }),
  lastName: z.string().min(2, {
    message: "al menos 2 caracteres",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña no debe tener más de 20 caracteres" })
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/[\W_]/),
  gender: z.string(),
  job: z.string(),
  roles: z.string(),
});

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const authService = new AuthService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      job: "",
      roles: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = { ...values, roles: [values.roles] };

    setIsLoading(true);
    try {
      await authService.registerUser(user);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const resetForm = () => {
    form.reset();
    setIsRegistered(false);
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-dark-500 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-center">Registro Exitoso</h2>
        <p className="text-center text-white">Tu cuenta ha sido creada correctamente.</p>
        <div className="flex flex-col space-y-4 w-full">
          <Button onClick={() => window.location.href = '/dashboard'} className="w-full shad-primary-btn">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
          </Button>
          <Button onClick={resetForm} className="w-full shad-primary-btn">
            <UserPlus className="mr-2 h-4 w-4" /> Hacer Nuevo Registro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Registro</h1>
          <p className="text-dark-700">completa los siguientes datos</p>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nombre"
            placeholder="Nombres"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastName"
            label="Apellido"
            placeholder="Apellidos"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="job"
            label="Ocupación"
            placeholder="Ocupación"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="roles"
            label="Rol"
            placeholder="Selecciona un rol"
          >
            {UserTypes.map((rol) => (
              <SelectItem key={rol.value} value={rol.value}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{rol.display}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Genero"
          renderSkeleton={(field): React.ReactNode => {
            return (
              <RadioGroup
                className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {GenderOptions.map((option) => (
                  <div key={option} className="radio-group">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            );
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Correo Electronico"
          placeholder="ejemplo@mail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          iconSrc="/assets/icons/password.svg"
          iconAlt="passord-icon-key"
          isPassword={true}
        />

        <SubmitButton isLoading={isLoading}>Crear &nbsp; usuario</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;