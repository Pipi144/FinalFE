import React, { useState } from "react";
import { Label } from "../ui/label";
import { useGameContext } from "@/Providers/GameProvider";
import NewRuleItem from "../NewRuleItem/NewRuleItem";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TBasicGameRule } from "@/models/gameRule";
import { useToast } from "@/hooks/use-toast";

type Props = {};

const AddGameRule = (props: Props) => {
  const [newNumber, setNewNumber] = useState("");
  const [newReplaceWord, setNewReplaceWord] = useState("");
  const { addGamePayload, setAddGamePayload } = useGameContext();
  const { toast } = useToast();
  const onSubmitNewRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4 w-full flex-wrap">
      <Label htmlFor={"gameRules"}>Game rules</Label>
      {addGamePayload.gameRules.map((rule, index) => (
        <NewRuleItem key={index} rule={rule} index={index} />
      ))}

      <form className="flex items-center justify-between w-full max-w-screen-sm mx-auto mt-2 flex-wrap border-[1px] border-solid border-slate-400 px-2 rounded-sm">
        <Input
          placeholder="Enter divisible number"
          className="placeholder:text-slate-400 w-full md:w-1/3 m-2 border-[0px] rounded-none !border-b-[1px] shadow-none"
          type="number"
        />
        <Input
          placeholder="Enter replaced word"
          className="placeholder:text-slate-400 w-full md:w-1/3 m-2 border-none shadow-none border-b-[1px]"
        />

        <Button className="bg-black text-white hover:bg-slate-400 hover:text-slate-50 m-2 ml-auto md:ml-2">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddGameRule;
