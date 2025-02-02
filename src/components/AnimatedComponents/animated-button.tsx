"use client";
import { HTMLMotionProps, Variants, motion } from "framer-motion";
import React from "react";

type TButtonAnimatedVariants = "fade" | "fadeInLeft" | "fadeInRight";
const getAnimationVariants = (
  animatedVariant?: TButtonAnimatedVariants
): Pick<
  HTMLMotionProps<"button">,
  "variants" | "animate" | "exit" | "transition"
> => {
  const animatedConfig: Variants = {
    fadeInLeft: {
      opacity: [0, 1],
      x: [-5, 0],
    },
    fadeInRight: {
      opacity: [0, 1],
      x: [5, 0],
    },
    fade: {
      opacity: [0, 1],
    },
    exit: {
      opacity: [1, 0],
    },
  };

  return {
    variants: animatedConfig,
    animate: animatedVariant,
    exit: "exit",
    transition: {
      damping: 16,
      mass: 0.4,
      stiffness: 120,
    },
  };
};
export interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  animatedVariants?: TButtonAnimatedVariants;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ animatedVariants, ...props }, ref) => {
    const animatedProps = getAnimationVariants(animatedVariants);
    return <motion.button ref={ref} {...animatedProps} {...props} />;
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
