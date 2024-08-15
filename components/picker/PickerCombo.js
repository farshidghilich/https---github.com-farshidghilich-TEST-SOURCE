"use client";
import { usePickerStore } from "../../store/index";
import { CommandItem } from "@/components/ui/command";
const PickerCombo = ({ picker, setOpen, setValue, name,handleSelectChange }) => {
  const { pickers } = usePickerStore();
  const getPickerOptions = () => {
    if (pickers[picker]) {
      var result = pickers[picker]?.map((option, index) => {
        return (
          <CommandItem
            key={index + 1}
            value={option.id}
            onSelect={(currentValue) => {
                handleSelectChange(option.id, name)
              setOpen(false);
              setValue(currentValue);
              console.log(option.id);
            }}
          >
            {option.fullTitle}
          </CommandItem>
        );
      });
      if (result) {
        return [...result];
      }
    }
  };
  return getPickerOptions();
};
export default PickerCombo;
