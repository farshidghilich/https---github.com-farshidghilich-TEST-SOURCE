"use client";
import { usePickerStore } from "../../store/index";
import { SelectItem } from "@/components/ui/select";
const PickerSelect = ({ picker }) => {
  const { pickers } = usePickerStore();
  console.log(pickers);
  const getPickerOptions = () => {
    if (pickers[picker]) {
      var result = pickers[picker]?.map((option, index) => {
        return (
          <SelectItem
            key={index + 1}
            value={option.id}
            dir="rtl"
          >
            {option.fullTitle
              ? option.fullTitle
              : option.title
              ? option.title
              : option.name}
          </SelectItem>
        );
      });
      if (result) {
        return [
          <option key={0} value={""} dir="rtl">
            {"انتخاب کنید"}
          </option>,
          ...result,
        ];
      }
    }
  };
  return getPickerOptions();
};
export default PickerSelect;
