import Container from "@/components/Common/Container";
import HistoryTable from "./HistoryTable";
import TableWrapper from "../../../../components/Common/TableWrapper";

import { Leave } from "@prisma/client";
import { getUserLeaveDays } from "@/lib/data/getLeaveDays";
export const dynamic = 'force-dynamic';

// Composant côté serveur
const UserHistory = async () => {
  try {
    // Récupération des données côté serveur
    const leaveHistory = await getUserLeaveDays();
    console.log(leaveHistory)

    if (leaveHistory === null) {
      return <Container>Chargement...</Container>;
    }

    return (
      <Container>
        <TableWrapper title="My Leave History">
          <HistoryTable history={leaveHistory as Leave[]} />
        </TableWrapper>
      </Container>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des jours de congé:", error);
    return <Container>Erreur lors du chargement des données</Container>;
  }
};

export default UserHistory;
