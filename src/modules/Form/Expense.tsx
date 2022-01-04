import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useStoreActions } from "../../store/hooks";
import { schema } from "./groupSchema";
import { useRouter } from "next/router";
import { IExpenseValue } from "../../store/model/expense";
import { AutoComplete } from "../../components/AutoComplete";
import { TextField } from "../../components/TextField";
import { IUser } from "../../store/model/user";

interface ItextField {
  label: string;
  error?: string;
}

export const ExpenseForm: FunctionComponent = () => {
  const router = useRouter();
  const setExpenses = useStoreActions((actions) => actions.expense.setExpenses);
  const getGroup = useStoreActions((actions) => actions.group.getGroup);

  const users = useMemo(
    () => getGroup(router.query.id as string).users,
    [getGroup, router.query.id]
  );

  const formik = useFormik<Omit<IExpenseValue, "id">>({
    initialValues: {
      name: "",
      users: [],
      groupId: router.query.id as string,
      total: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setExpenses(values);
      //@ts-ignore
      router.replace(`/group/${router.query.id}`, { shallow: true });
    },
  });

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    // if (event.target.checked) {
    //   formik.setFieldValue("users", [
    //     ...formik.values.users,
    //     event.target.value,
    //   ]);
    // } else {
    //   formik.setFieldValue(
    //     "users",
    //     formik.values.users.filter((userId) => userId === event.target.value)
    //   );
    // }

    formik.setFieldValue(
      "users",
      event.target.checked
        ? [...formik.values.users, event.target.value]
        : formik.values.users.filter((userId) => userId !== event.target.value)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        errors={formik.errors.name}
        id="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <section className="mb-4">
        <AutoComplete
          label="Participant"
          id="users"
          placeholder="participants"
          options={users as IUser[]}
          getOptionLabel={(user) => user.name}
          getOptionValue={(user) => user.id}
        />
      </section>
      <button
        type="submit"
        className="bg-yellow-400 text-yellow-900 py-2 px-4 rounded-lg shadow-md"
      >
        Create Group
      </button>
    </form>
  );
};
