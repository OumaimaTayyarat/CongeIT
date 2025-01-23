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
export const dynamic = "force-dynamic";
type HistoryProps = {
  history: Leave[]
}

const HistoryTable = ({ history }: HistoryProps) => {


  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Date de Demande</TableHead>
          <TableHead>Durée</TableHead>
          <TableHead>Jours</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Dernière Mise à Jour</TableHead>
          <TableHead>Notes de Mise à Jour</TableHead>
          <TableHead className="text-right">Mis à Jour Par</TableHead>
        </TableRow>


      </TableHeader>
      <TableBody className="whitespace-nowrap">
        {history.map((history) => (
          <TableRow key={history.id}>
            <TableCell className="font-medium">{history.type}</TableCell>
            <TableCell className="font-medium">
              {dayjs(history.createdAt).format()}
            </TableCell>
            <TableCell className="flex items-center">
              <span>{dayjs(history.startDate).format("DD/MM/YYYY")} </span> -{" "}
              <span>{dayjs(history.endDate).format("DD/MM/YYYY")} </span>{" "}
            </TableCell>
            <TableCell>{history.days}</TableCell>
            <TableCell className="">
              <Badge className={`
                ${history.status === LeaveStatus.APPROUVÉ && "bg-green-500"} 
                ${history.status === LeaveStatus.ATTENTE && "bg-amber-500"} 
                ${history.status === LeaveStatus.REJETÉ && "bg-red-500"} 
                ${history.status === LeaveStatus.MODÉRATION && "bg-indigo-500"} 
                `  }> {history.status}</Badge>{" "}
            </TableCell>
            <TableCell className="">
              {formatDistance(
                subDays(new Date(history.createdAt), 0),
                new Date(),
                { addSuffix: true }
              )}
            </TableCell>
            <TableCell className="">{history.moderatorNote}</TableCell>
            <TableCell className="text-right">{history.moderator}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
