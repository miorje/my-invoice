import { FunctionComponent, useMemo } from "react";
import { IExpenseValue } from "../../store/model/expense";
import dayjs from "dayjs";
import { IUserCard } from "./UserCard";
import { useConvertToCurrency } from "../../utility/useConvertToCurrency";
import dynamic from "next/dynamic";

const UserCard = dynamic<IUserCard>(
  () => import("./UserCard").then((mod) => mod.UserCard),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-row mt-1">
        <div className="h-4 w-4 mr-2 rounded-full bg-gray-200" />
        <div className="animate-pulse w-1/2 h-4 bg-gray-200 rounded-md" />
      </div>
    ),
  }
);

export const ExpenseCard: FunctionComponent<IExpenseValue> = (expense) => {
  const total = useConvertToCurrency(expense.total);
  const totalPaid = useMemo(() => {
    return expense.payment.reduce(
      (totalPayment, pay) => pay.total + totalPayment,
      0
    );
  }, [expense.payment]);

  const totalPaidToCurrency = useConvertToCurrency(totalPaid);

  const isSettle = useMemo(() => {
    return totalPaid >= expense.total;
  }, [totalPaid, expense.total]);

  const totalPerParticipant = useMemo(
    () => expense.total / expense.users.length,
    [expense.users, expense.total]
  );
  const date = useMemo(
    () => ({
      month: dayjs(expense.created).format("MMM"),
      day: dayjs(expense.created).format("DD"),
    }),
    [expense.created]
  );

  return (
    <div
      key={expense.id}
      className={`grid grid-cols-12 gap-4 border-gray-700 rounded-lg shadow-md py-6 px-4 ${
        isSettle ? "opacity-50" : ""
      }`}
    >
      <section className="col col-span-1">
        <h2 className="text-xl font-extrabold text-red-500">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <section className="col col-start-2 col-end-11">
        <div className="flex w-full justify-between text-xl font-extrabold text-gray-800">
          <div>{expense.name}</div>
          <div className="flex flex-col">
            <div className="flex">{total}</div>
            {totalPaid > 0 && (
              <div className="flex text-sm w-full font-bold text-green-500 justify-end">
                + {totalPaidToCurrency}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          {expense.users.map((id) => (
            <UserCard
              id={id}
              key={id}
              expenseId={expense.id as string}
              groupId={expense.groupId}
              total={totalPerParticipant}
              payment={expense.payment}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
