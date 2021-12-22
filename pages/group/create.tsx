import { Container } from "../../src/components/Container";
import { GroupForm } from "../../src/modules/Form/Group";
import { Formik } from "formik";

const CreateGroup = () => {
  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Create Group
      </h1>
      <GroupForm />
    </Container>
  );
};

export default CreateGroup;
