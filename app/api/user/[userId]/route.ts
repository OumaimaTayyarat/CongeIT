import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assurez-vous que prisma est bien configuré

type EditUserBody = {
  phone: string;
  department: string;
  id: string; // ID de l'utilisateur à modifier
  title: string;
  role: Role;
};

export async function PATCH(req: Request) {
  const loggedInUser = await getCurrentUser();
  console.log("Logged-in User Details:", loggedInUser);

  if (!loggedInUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: EditUserBody = await req.json();
    const { phone, department, id, role, title } = body;

    if (loggedInUser.role === "ADMIN") {
      // Les admins peuvent effectuer l'action directement
      await prisma.user.update({
        where: { id },
        data: { phone, department, role, title },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    if (loggedInUser.role === "MODERATOR") {
      console.log(loggedInUser)
      // Vérifiez si le modérateur est emailManager1 ou emailManager2 de l'utilisateur ciblé
      const managedUser = await prisma.user.findFirst({
        where: {
          id,
          OR: [
            { emailManager1: loggedInUser.email }, // Utiliser emailManager1
            { emailManager2: loggedInUser.email }, // Utiliser emailManager2
          ],
        },
      });

      if (!managedUser) {
        return NextResponse.json(
          { error: "You are not permitted to perform this action" },
          { status: 403 }
        );
      }

      // Si l'utilisateur ciblé est géré par le modérateur, effectuez la mise à jour
      await prisma.user.update({
        where: { id },
        data: { phone, department, role, title },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    // Si aucune condition n'est remplie, refusez l'accès
    return NextResponse.json(
      { error: "You are not permitted to perform this action" },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
