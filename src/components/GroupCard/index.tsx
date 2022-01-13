import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { SummaryLoading } from "./Summary.Loading";
import { motion } from "framer-motion";

const Summary = dynamic<IGroup>(
  () => import("./Summary").then((component) => component.Summary),
  { loading: SummaryLoading }
);

const container = {
  visible: {
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
  hidden: {
    transition: { when: "afterChildern" },
  },
};

const card = {
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: -16,
    opacity: 0.4,
  },
};

export const GroupCard = () => {
  const group = useStoreState((state) => state.group.groups);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {group.map((group) => (
        <motion.div key={group.id} variants={card}>
          <Summary {...group} />
        </motion.div>
      ))}
    </motion.div>
  );
};
