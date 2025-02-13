import React, { useCallback, useState } from "react";
import { Label } from "../ui/label";
import { useGameContext } from "@/Providers/GameProvider";
import RuleItemDisplay from "../RuleItemDisplay/RuleItemDisplay";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { produce } from "immer";

type Props = {};

const AddGameRule = (props: Props) => {
  const [newNumber, setNewNumber] = useState("");
  const [newReplaceWord, setNewReplaceWord] = useState("");
  const { addGamePayload, setAddGamePayload } = useGameContext();
  const { toast } = useToast();

  const onRemoveRule = useCallback((index: number) => {
    setAddGamePayload(
      produce((draft) => {
        draft.gameRules.splice(index, 1);
      })
    );
  }, []);
  const onSubmitNewRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNumber || !newReplaceWord) {
      toast({
        title: "Fields are required",
        description: "Please fill in all fields",
      });
      return;
    }
    if (
      addGamePayload.gameRules.some(
        (rule) => rule.divisibleNumber === Number(newNumber)
      )
    ) {
      toast({
        title: "Rule already exists",
        description: "Rule with this divisible number already exists",
      });
      return;
    }
    setAddGamePayload(
      produce((draft) => {
        draft.gameRules.push({
          divisibleNumber: Number(newNumber),
          replacedWord: newReplaceWord,
        });
      })
    );
    setNewNumber("");
    setNewReplaceWord("");
  };

  return (
    <div className="mt-4 w-full flex-wrap">
      <Label htmlFor={"gameRules"}>Game rules</Label>
      <form
        onSubmit={onSubmitNewRule}
        className="flex items-center justify-between w-full max-w-screen-sm  my-4 flex-wrap border-[1px] border-solid border-slate-400 px-2 rounded-sm"
      >
        <Input
          placeholder="Enter divisible number"
          className="placeholder:text-slate-400 w-full md:w-1/3 m-2 border-[0px] rounded-none !border-b-[1px] border-slate-400 shadow-none p-0"
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <Input
          placeholder="Enter replaced word"
          className="placeholder:text-slate-400 w-full md:w-1/3 m-2 border-[0px] rounded-none !border-b-[1px] border-slate-400 shadow-none p-0"
          value={newReplaceWord}
          onChange={(e) => setNewReplaceWord(e.target.value)}
        />

        <Button type="submit" className=" m-2 ml-auto md:ml-2" variant="dark">
          Add rule
        </Button>
      </form>
      <div className="w-full flex items-center flex-wrap my-2 justify-around">
        {addGamePayload.gameRules.map((rule, index) => (
          <RuleItemDisplay
            key={index}
            rule={rule}
            index={index}
            onRemoveRule={onRemoveRule}
          />
        ))}
      </div>
    </div>
  );
};

export default AddGameRule;
