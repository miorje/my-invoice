import { Container } from "../../src/components/Container";
import { GroupForm } from "../../src/modules/Form/Group";

const CreateGroup = () => {
  return (
    <Container>
      <div className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        <div>Create Group</div>
      </div>
      <GroupForm />
    </Container>
  );
};

export default CreateGroup;
