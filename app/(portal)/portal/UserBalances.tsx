import Container from "@/components/Common/Container";
import LeaveCard from "./LeaveCard";
import { Balances } from "@prisma/client";

type Props = {
  balances: Balances;
};

const UserBalances = ({ balances }: Props) => {
  return (
    <Container>
      <section className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <LeaveCard
          year={balances?.year}
          leaveType={"ANNUEL"}
          credit={balances?.annualCredit as number}
          used={balances?.annualUsed as number}
          balance={balances?.annualAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"ÉTUDE"}
          credit={balances?.studyCredit as number}
          used={balances?.studyUsed as number}
          balance={balances?.studyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"SANTÉ"}
          credit={balances?.healthCredit as number}
          used={balances?.healthUsed as number}
          balance={balances?.healthAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"FAMILLE"}
          credit={balances?.familyCredit as number}
          used={balances?.familyUsed as number}
          balance={balances?.familyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"PATERNITÉ"}
          credit={balances?.paternityCredit as number}
          used={balances?.paternityUsed as number}
          balance={balances?.paternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"MATERNITÉ"}
          credit={balances?.maternityCredit as number}
          used={balances?.maternityUsed as number}
          balance={balances?.maternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"SANS SOLDE"}
          used={balances?.unpaidUsed as number}
        />
      </section>
    </Container>
  );
};

export default UserBalances;
