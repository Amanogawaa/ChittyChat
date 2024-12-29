import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type GenderProps = {
  onCheckbox: (gender: string) => void;
  selectedGender: string;
};

const Gender = ({ onCheckbox, selectedGender }: GenderProps) => {
  return (
    <div className="flex gap-2">
      <div className="form-control">
        <Label
          className={`gap-1 cursor-pointer flex items-center${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text">Male</span>
          <Checkbox
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onCheckedChange={() => onCheckbox("male")}
          />
        </Label>
      </div>
      <div className="form-control">
        <Label
          className={` gap-1 cursor-pointer flex items-center${
            selectedGender === "female" ? "selected" : ""
          } `}
        >
          <span className="label-text">Female</span>
          <Checkbox
            onCheckedChange={() => onCheckbox("female")}
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
          />
        </Label>
      </div>
    </div>
  );
};

export default Gender;
