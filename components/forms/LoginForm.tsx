"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { AuthService } from "./../../services/auth.services";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
}

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Debes ingresar un correo electrónico válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña no debe tener más de 20 caracteres" })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/\d/, { message: "Debe contener al menos un número" })
    .regex(/[\W_]/, { message: "Debe contener al menos un símbolo" }),
});

export function LoginForm() {
  const [isLoading, setisLoading] = useState(false);
  const authService = new AuthService();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("entra");

    setisLoading(true);

    try {
      const response = await authService.loginUser({
        email: values.email,
        password: values.password,
      });

      console.log(response);

      const token = response.access_token;

      localStorage.setItem("token", token);

      console.log("Inicio de sesión exitoso:", response);
      router.push("/registro");
    } catch (error: any) {
      console.error("Error en el inicio de sesión:", error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Inicio de sesión</h1>
          <p className="text-dark-700">Bienvenido de vuelta 👋</p>
        </section>

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

        <SubmitButton isLoading={isLoading}>Iniciar &nbsp; sesión</SubmitButton>
      </form>
    </Form>
  );
}

export default LoginForm;
