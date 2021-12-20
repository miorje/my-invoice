import { Container } from "../../src/components/Container";
import {useRouter} from "next/router";
import { UserForm } from "../../src/modules/Form/User";
import {router} from "next/client";

const Id = () => {
  console.log(router)
  return <Container>Hello Group</Container>;
};

export default Id;
