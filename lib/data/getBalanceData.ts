import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function getUserBalances() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return {};
  }
  try {
    const email = loggedInUser.email as string;
    const year = new Date().getFullYear().toString();

    const balances = await prisma.balances.findFirst({
      where: {
        email,
        year,
      },
    });

    return balances;
  } catch (error) {
    console.error("Error fetching user leave days:", error);
    throw new Error("Error fetching user leave days");
  }
}

export async function getAllBalances() {
  const loggedInUser = await getCurrentUser();

  // Vérification si l'utilisateur est connecté
  if (!loggedInUser) {
    return [];
  }

  const { email, role } = loggedInUser;

  // Si l'utilisateur est un ADMIN, récupérer tous les soldes
  if (role === "ADMIN") {
    try {
      const balances = await prisma.balances.findMany({
        orderBy: [{ year: "desc" }],
      });
      return balances;
    } catch (error) {
      console.error("Error fetching all balances:", error);
      throw new Error("Error fetching all balances");
    }
  }

  // Si l'utilisateur est un MODERATOR, récupérer les soldes des utilisateurs qu'il gère
  if (role === "MODERATOR") {
    try {
      // Récupérer les utilisateurs gérés par ce modérateur
      const managedUsers = await prisma.user.findMany({
        where: {
          OR: [
            { emailManager1: email }, // Vérifier si l'email du modérateur correspond à emailManager1
            { emailManager2: email }, // Vérifier si l'email du modérateur correspond à emailManager2
          ],
        },
        select: { email: true }, // Récupérer uniquement les emails des utilisateurs gérés
      });

      // Récupérer les emails des utilisateurs gérés
      const managedEmails = managedUsers
        .map(user => user.email)
        .filter((email): email is string => email !== null); // Filtrer les valeurs null

      if (managedEmails.length > 0) {
        // Récupérer les soldes pour les utilisateurs gérés
        const balances = await prisma.balances.findMany({
          where: {
            email: { in: managedEmails }, // Récupérer les balances pour ces emails
          },
          orderBy: [{ year: "desc" }], // Trier par année de manière décroissante
        });

        return balances.length > 0 ? balances : []; // Retourner les soldes ou un tableau vide si aucun solde
      }

      return []; // Si aucun utilisateur géré, retourner un tableau vide
    } catch (error) {
      console.error("Error fetching managed users' balances:", error);
      throw new Error("Error fetching managed users' balances");
    }
  }

  // Si l'utilisateur n'est ni un ADMIN ni un MODERATOR, retourner un tableau vide
  return [];
}
