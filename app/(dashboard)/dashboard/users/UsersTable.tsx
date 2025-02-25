import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import AddCredits from "./AddCredits";
import EditUser from "./EditUser";


type UserProps = {
  users: User[]
}

const UsersTable = ({ users }: UserProps) => {
  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead>Profil</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Département</TableHead>
          <TableHead>Intitulé du Poste</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead className="">Modifier</TableHead>
          <TableHead className="">Ajouter des Crédits de Congé</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="whitespace-nowrap">
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage src={user.image as string} alt={user.name as string} />
                <AvatarFallback>
                  {" "}
                  {user.name?.charAt(0).toUpperCase()}{" "}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell> <Badge variant="outline"> {user.department}</Badge></TableCell>
            <TableCell className="">
              <Badge variant="secondary"> {user.title}</Badge>{" "}
            </TableCell>
            <TableCell className="">{user.role}</TableCell>
            <TableCell className="text-right">
              <EditUser user={user} />
            </TableCell>
            <TableCell className="text-right">
              <AddCredits email={user.email as string} name={user.name as string} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
