import { motion } from "framer-motion";

const CharacterCounter = ({
  className,
  currentLength,
  maxLength,
  variants,
  initial,
  animate,
  transition,
}) => {
  const styles =
    currentLength >= maxLength - 15
      ? "text-red-500"
      : currentLength >= maxLength - 30
      ? "text-yellow-500"
      : "text-stone-500";

  return (
    <motion.div
      className={`${className} ${styles}`}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {`${currentLength}/${maxLength}`}
    </motion.div>
  );
};

export default CharacterCounter;
