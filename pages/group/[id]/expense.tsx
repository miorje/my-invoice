import { FunctionComponent } from "react";
import { ExpenseForm } from "../../../src/modules/Form/Expense";
import { Container } from "../../../src/components/Container";
import { Title } from "../../../src/components/Title";

const Expense: FunctionComponent = () => {
  return (
    <Container>
      <div className="mt-20 mb-8">
        <Title>Add Expense</Title>
      </div>
      <ExpenseForm />
    </Container>
  );
};

export default Expense;
