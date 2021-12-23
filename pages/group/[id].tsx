import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const Id = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({ spread: 420 , particleCount:1000});
    }


  }, [router]);
  return <Container>Hello Group {router.query.id}</Container>;
};

export default Id;
