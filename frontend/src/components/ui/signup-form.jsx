"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const BACKEND_URL = "http://localhost:3001"

export function SignupForm({
  className,
  ...props
}) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (!name || !email || !password || password !== confirmPassword) {
      return;
    }

    await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      credentials: "include",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Insira seu email para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="João da Silva" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirme a senha
                    </FieldLabel>
                    <Input id="confirm-password" name="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  A senha deve conter no mínimo 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="bg-[#1a2e1a] hover:bg-[#3d6b3d]">Create Account</Button>
                <FieldDescription className="text-center">
                  Já tem uma conta? <a href="#">Fazer login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com os <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
}