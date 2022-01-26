import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent } from "react";
import { UserSelection } from "./UserSelection";
import { IGroup } from "../../store/model/group";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { schema } from "./groupSchema";
import { useRouter } from "next/router";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { AutoComplete } from "../../components/AutoComplete";
import { IUser } from "../../store/model/user";

export const GroupForm: FunctionComponent = () => {
  const router = useRouter();
  const setGroup = useStoreActions((actions) => actions.group.setGroups);
  const users = useStoreState((state) => state.user.users);
  const formik = useFormik<Omit<IGroup, "id">>({
    initialValues: {
      name: "",
      users: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const result = setGroup(values);
      //@ts-ignore
      router.replace(`/group/${result.payload.id}?created=today`);
    },
  });

  console.log(formik.values.users);
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

  const setUsers = useStoreActions((actions) => actions.user.setUsers);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        id="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        errors={formik.errors.name}
      />
      <section>
        <AutoComplete
          onCreateNew={setUsers}
          filterBy={"name"}
          label={"Participant"}
          id="users"
          placeholder="Participant"
          options={users as IUser[]}
          onChange={handleUser}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          errors={formik.errors.users as string}
        />
        {/*<UserSelection users={formik.values.users} handleUser={handleUser} />*/}
        {formik.errors.users && (
          <span className="text-sm text-red-600">{formik.errors.users}</span>
        )}
      </section>
      <Button type="submit">Create Group</Button>
    </form>
  );
};
