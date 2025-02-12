import { TBasicGameRule } from "@/models/gameRule";
import React from "react";
import { Label } from "../ui/label";
import AnimatedDiv from "../AnimatedComponents/AnimatedDiv";
import { IoClose } from "react-icons/io5";

type Props = { rule: TBasicGameRule; index: number };

const NewRuleItem = ({ rule, index }: Props) => {
  return (
    <AnimatedDiv
      className="w-full md:w-[45%] mb-5 flex flex-col space-y-1.5"
      animate={{ x: [5, 0], opacity: [0, 1] }}
      layout="position"
    >
      <div className="flex items-center space-x-2">
        <Label className="text-base font-semibold">Rule {index + 1}</Label>
        <IoClose className="text-lg ml-2 cursor-pointer" />
      </div>

      <div className="mt-1 flex items-center space-x-2">
        Number: {rule.divisibleNumber} {`<=>`} Word: {rule.replacedWord}
      </div>
    </AnimatedDiv>
  );
};

export default NewRuleItem;
