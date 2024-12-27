import { Label } from "../ui/label";

type GenderProps = {
  onCheckbox: (gender: string) => void;
  selectedGender: string;
};

const Gender = ({ onCheckbox, selectedGender }: GenderProps) => {
  return (
    <div className="flex">
      <div className="form-control">
        <Label
          className={`gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckbox("male")}
          />
        </Label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          } `}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckbox("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default Gender;
