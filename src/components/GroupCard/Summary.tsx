import { IGroup } from "../../store/model/group";
import { UserAvatarGroup } from "../UserAvatar";
import { useRouter } from "next/router";
import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";
import { TotalSummary } from "./TotalSummary";
import { motion } from "framer-motion";

export const Summary = (group: IGroup) => {
  const router = useRouter();

  const handleToGroup = async () => {
    await router.push(`/group/${group.id}`);
  };

  const expenseById = useStoreState((state) =>
    state.expense.expenseByGroupId(group.id as string)
  );

  const totalExpenses = useMemo(() => {
    return expenseById?.reduce((total, expense) => total + expense.total, 0);
  }, [expenseById]);

  const totalPaid = useMemo(
    () =>
      expenseById.reduce(
        (total, expense) =>
          total +
          expense.payment.reduce(
            (totalPayment, pay) => totalPayment + pay.total,
            0
          ),
        0
      ),
    [expenseById]
  );

  console.log(totalPaid);
  return (
    <motion.div
      onClick={handleToGroup}
      className="shadow-md border-t-2 border-gray-100 rounded-lg rounded-tr-2xl rounded-bl-2xl pt-3 pb-5 px-1 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{scale:0.95}}
    >
      <section
        className="text-center flex justify-center flex-col"
        aria-describedby="group=header"
      >
        <div className="flex justify-center mt-2">
          <UserAvatarGroup users={group.users} />
        </div>
        <h2 className="font-medium text-gray-800 text-lg mt-0.5">
          {group.name}
        </h2>
      </section>
      <div className="grid grid-cols-2 mt-2">
        <TotalSummary header={"Paid"} total={totalPaid} />
        <TotalSummary header={"Total"} total={totalExpenses} />
      </div>
    </motion.div>
  );
};
