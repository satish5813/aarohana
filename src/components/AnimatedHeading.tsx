"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const word = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AnimatedHeading({
  text,
  className,
  as = "h2",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const Tag = motion.create(as);
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
