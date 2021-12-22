import { Container } from "../../src/components/Container";
import { router } from "next/client";

const Id = () => {
  console.log(router);
  return <Container>Hello Group</Container>;
};

export default Id;
