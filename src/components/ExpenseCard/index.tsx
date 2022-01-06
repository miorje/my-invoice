import { FunctionComponent, useMemo } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";
import dayjs from "dayjs";
import exp from "constants";
import { useStoreActions } from "../../store/hooks";

export const ExpenseCard: FunctionComponent<IGetExpensesByGroup> = (
  expense
) => {
  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR",
      }).format(expense.total),
    [expense.total]
  );

  const eachTotal = useMemo(
    () => expense.total / expense.users.length,
    [expense.total]
  );

  const getUser = useStoreActions((actions) => actions.user.getUser);

  const users = useMemo(
    () =>
      expense.users.map((userID) => ({
        ...getUser(userID),
        total: new Intl.NumberFormat("ms-MY", {
          style: "currency",
          currency: "MYR",
        }).format(expense.total / expense.users.length),
      })),
    [expense.users]
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
      className="grid grid-cols-12 gap-4 border-gray-700 rounded-lg shadow-md py-6 px-4"
    >
      <section className="col col-span-1">
        <h2 className="text-xl font-extrabold text-red-500">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <section className="col col-start-2 col-end-11">
        <div className="flex w-full justify-between text-xl font-extrabold text-gray-800">
          <div>{expense.name}</div>
          <div>{total}</div>
        </div>
        <div className="flex w-full flex-col">
          {users.map((user) => (
            <div key={user.id + user.name} className="flex w-full justify-between">
              <div>{user.name}</div>
              <div>{user.total}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
