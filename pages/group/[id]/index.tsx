import { Container } from "../../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useStoreActions, useStoreState } from "../../../src/store/hooks";
import { IUserAvatarGroup } from "../../../src/components/UserAvatar";
import { Title } from "../../../src/components/Title";
import { Add } from "../../../src/components/IconButton/Add";
import dynamic from "next/dynamic";
import { IExpenseValue } from "../../../src/store/model/expense";

const UserAvatarGroup = dynamic<IUserAvatarGroup>(
  () =>
    import("../../../src/components/UserAvatar").then(
      (mod) => mod.UserAvatarGroup
    ),
  { ssr: false }
);

const ExpenseCard = dynamic<IExpenseValue>(
  () =>
    import("../../../src/components/ExpenseCard").then(
      (mod) => mod.ExpenseCard
    ),
  { ssr: false }
);
const GroupId = () => {
  const router = useRouter();
  const getGroup = useStoreActions((actions) => actions.group.getGroup);
  const expenses = useStoreState((state) => state.expense.expenses);

  const groupById = useStoreState((state) =>
    state.group.groupById(router.query.id as string)
  );

  const expenseByGroupId = useStoreState((state) =>
    state.expense.expenseByGroupId(router.query.id as string)
  );
  // console.log(groupById);

  // const group = useMemo(
  //   () => getGroup(router.query.id as string),
  //   [getGroup, router.query.id, expenses]
  // );

  // console.log(expenses);

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({
        spread: 420,
      });
    }
  }, [router.query.created]);

  const handleAddExpense = () => {
    router?.push(`/group/${router.query.id}/expense`);
  };

  return (
    <Container>
      <section className="items-stretch flex-col flex mt-20 mb-8">
        <div className="flex justify-between">
          <Title>{groupById.name}</Title>
          <Add onClick={handleAddExpense} />
        </div>
        <div>
          <UserAvatarGroup users={groupById.users} />
        </div>
      </section>
      <section className="grid gap-4">
        {expenseByGroupId.map((item) => (
          <ExpenseCard
            {...item}
            groupId={router.query.id as string}
            key={item.id}
          />
        ))}
      </section>
    </Container>
  );
};

export default GroupId;
