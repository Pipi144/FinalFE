import { TGameRule } from "@/models/gameRule";
import React from "react";

type Props = {
  rule: TGameRule;
  index: number;
};

const RuleItem = ({ rule, index }: Props) => {
  return <div>RuleItem</div>;
};

export default RuleItem;
