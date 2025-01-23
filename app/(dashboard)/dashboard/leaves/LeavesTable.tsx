import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { formatDistance, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Leave, LeaveStatus } from "@prisma/client";
import EditLeave from "./EditLeave";

type leaveProps = {
  leaves: Leave[];
};

const LeavesTable = ({ leaves }: leaveProps) => {
  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead>Modifier</TableHead>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Année</TableHead>
          <TableHead>Demandé le</TableHead>
          <TableHead>Période</TableHead>
          <TableHead>Jours</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Note du demandeur</TableHead>
          <TableHead>Mis à jour le</TableHead>
          <TableHead>Notes mises à jour</TableHead>
          <TableHead className="text-right">Mis à jour par</TableHead>
        </TableRow>

      </TableHeader>
      <TableBody className="whitespace-nowrap">
      {leaves.map((leave) => {
  console.log("Données de leave :", leave);
  return (
    <TableRow key={leave.id}>
      <TableCell className="font-medium">
        {leave.status !== LeaveStatus.APPROUVÉ && (
          <EditLeave
            id={leave.id}
            days={leave.days}
            type={leave.type}
            year={leave.year}
            email={leave.userEmail}
            user={leave.userName}
            startDate={leave.startDate}
          />
        )}
      </TableCell>
      <TableCell className="font-medium">{leave.userName}</TableCell>
      <TableCell className="font-medium">{leave.type}</TableCell>
      <TableCell className="font-medium">{leave.year}</TableCell>
      <TableCell className="font-medium">
        {dayjs(leave.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </TableCell>
      <TableCell className="flex font-medium">
        <span>{dayjs(leave.startDate).format("DD/MM/YYYY")} </span> - {" "}
        <span>{dayjs(leave.endDate).format("DD/MM/YYYY")} </span>{" "}
      </TableCell>
      <TableCell>{leave.days}</TableCell>
      <TableCell className="">
        <Badge className={`
          ${leave.status === LeaveStatus.APPROUVÉ && "bg-green-500"} 
          ${leave.status === LeaveStatus.ATTENTE && "bg-amber-500"} 
          ${leave.status === LeaveStatus.REJETÉ && "bg-red-500"} 
          ${leave.status === LeaveStatus.MODÉRATION && "bg-indigo-500"} 
        `}>
          {leave.status}
        </Badge>
      </TableCell>
      <TableCell>{leave.userNote}</TableCell>
      <TableCell className="">
        {formatDistance(
          subDays(new Date(leave.updatedAt), 0),
          new Date(),
          { addSuffix: true }
        )}
      </TableCell>
      <TableCell className="">{leave.moderatorNote}</TableCell>
      <TableCell className="text-right">{leave.moderator}</TableCell>
    </TableRow>
  );
})}
      </TableBody>
    </Table>
  );
};

export default LeavesTable;
