import { getCurrentUser } from "../session";
export const dynamic = 'force-dynamic';

export async function getAllLeaveDays() {
  const loggedInUser = await getCurrentUser();
  
  // Vérification si l'utilisateur est connecté
  if (!loggedInUser) {
    return [];
  }
  
  const { email, role } = loggedInUser;

  // Si l'utilisateur est un ADMIN, récupérer tous les jours de congé
// Si l'utilisateur est un ADMIN, récupérer tous les jours de congé
if (role === "ADMIN") {
  try {
    const leaves = await prisma.leave.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return [...leaves]; // Retourner tous les jours de congé
  } catch (error: unknown) {
    console.error("Error fetching all leave days:", error);

    // Utilisation du type assertion pour dire à TypeScript que error est de type Error
    if (error instanceof Error) {
      return {
        error: true,
        message: "An error occurred while fetching the leave days.",
        details: error.message, // Accéder au message de l'erreur
      };
    } else {
      // Si l'erreur n'est pas une instance d'Error, retourner un message générique
      return {
        error: true,
        message: "An unknown error occurred while fetching the leave days.",
      };
    }
  }
}

  // Si l'utilisateur est un MODERATOR, récupérer les jours de congé des utilisateurs qu'il gère
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
        console.log("hhhhhhhhhhhh", managedEmails)

      if (managedEmails.length > 0) {
        // Récupérer les jours de congé pour les utilisateurs gérés
        const leaves = await prisma.leave.findMany({
          where: {
            userEmail: { in: managedEmails }, // Récupérer les jours de congé pour ces emails
          },
          orderBy: [{ createdAt: "desc" }], // Trier par date de création de manière décroissante
        });
        return leaves.length > 0 ? leaves : []; // Retourner les jours de congé ou un tableau vide si aucun jour de congé
      }
     
      return []; // Si aucun utilisateur géré, retourner un tableau vide
    } catch (error) {
      console.error("Error fetching managed users' leave days:", error);
      throw new Error("Error fetching managed users' leave days");
    }
  }

  // Si l'utilisateur n'est ni un ADMIN ni un MODERATOR, retourner un tableau vide
  return [];
}


  export async function getUserLeaveDays() {
    const loggedInUser = await getCurrentUser();
    if (!loggedInUser) {
      return [];
    }
    try {
      const userEmail = loggedInUser.email as string;
      const leaves = await prisma.leave.findMany({
        where: {
          userEmail,
        },
        orderBy: [{ createdAt: "desc" }],
      });
  
      return [...leaves];
    } catch (error) {
      console.error("Error fetching user leave days:", error);
      throw new Error("Error fetching user leave days");
    }
  }

