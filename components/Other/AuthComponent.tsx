import Link from "next/link";
import { AuthForm } from "./AuthForm";

const AuthComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Portail SIANA
          </h1>
          <p className="text-sm text-muted-foreground">
            Connectez-vous avec votre email professionnel pour accéder à votre portail
          </p>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          En cliquant sur continuer, vous acceptez les{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Conditions d'utilisation
          </Link>{" "}
          et la{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default AuthComponent;
