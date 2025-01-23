"use client";

import DialogWrapper from "@/components/Common/DialogWrapper";
import { FaPlus } from "react-icons/fa6";
import CreditField from "./CreditField";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const creditTypes = [ 
  "annuel",
  "familial",
  "santé",
  "études",
  "maternité",
  "paternité",
] as const;

const initialCreditValues: { [key: string]: number } = {
  annuel: 0,
  familial: 0,
  santé: 0,
  études: 0,
  maternité: 0,
  paternité: 0,
};

type Props = {
  email: string;
  name: string;
};

const AddCredits = ({ email, name }: Props) => {
  const [creditValues, setCreditValues] = useState(initialCreditValues);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const handleCreditChange = (type: string, value: number) => {
    setCreditValues((prevValues) => ({ ...prevValues, [type]: value }));
  };

  async function SubmitCredits(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const year = new Date().getFullYear().toString();

      const formattedValues = {
        ...creditValues,
        year,
        email,
        name,
      };

      const res = await fetch("/api/balance", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Crédits ajoutés avec succès", { duration: 4000 });
        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();

        toast.error(`Une erreur s'est produite : ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      toast.error("Une erreur inattendue s'est produite");
    }
  }

  return (
    <DialogWrapper
      title="Ajouter des Crédits"
      descr="Les crédits que vous êtes sur le point d'ajouter concernent uniquement cette année !"
      icon={FaPlus}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <form onSubmit={SubmitCredits}>
        {creditTypes.map((type) => (
          <div key={type} className="my-3">
            {["Crédit"].map((suffix) => (
              <CreditField
                key={type + suffix}
                name={`${type}${suffix}`}
                label={`${
                  type.charAt(0).toUpperCase() + type.slice(1)
                } ${suffix}`}
                onChange={(value) => handleCreditChange(type, value)}
              />
            ))}
          </div>
        ))}
        <Button type="submit">Soumettre</Button>
      </form>
    </DialogWrapper>
  );
};

export default AddCredits;
