"use client";

import { CardWrapper } from "@/components/index";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      headerLabel="Ooops! Something went wrong!"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
function getErrorMessage(error: string) {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "La cuenta de OAuth no está vinculada a ninguna cuenta existente. Por favor, inicia sesión con otro método.";
    case "CredentialsSignin":
      return "Inicio de sesión fallido. Por favor, verifica tus credenciales.";
    case "InvalidCredentials":
      return "Credenciales inválidas. Por favor, verifica tu email y contraseña.";
    default:
      return "Ha ocurrido un error. Por favor, intenta nuevamente.";
  }
}
