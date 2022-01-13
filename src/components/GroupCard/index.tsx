import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { SummaryLoading } from "./Summary.Loading";
import { motion } from "framer-motion";
import { CONTAINER, CARD } from "../../animation";

const Summary = dynamic<IGroup>(
  () => import("./Summary").then((component) => component.Summary),
  { loading: SummaryLoading }
);

export const GroupCard = () => {
  const group = useStoreState((state) => state.group.groups);

  return (
    <motion.div
      variants={CONTAINER}
      initial="hidden"
      animate="visible"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {group.map((group) => (
        <motion.div key={group.id} variants={CARD}>
          <Summary {...group} />
        </motion.div>
      ))}
    </motion.div>
  );
};
