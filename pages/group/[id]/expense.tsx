import { FunctionComponent } from "react";
import { ExpenseForm } from "../../../src/modules/Form/Expense";
import { Container } from "../../../src/components/Container";

const Expense: FunctionComponent = () => {
  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Hello Invoice
      </h1>
      <ExpenseForm />
    </Container>
  );
};

export default Expense;
