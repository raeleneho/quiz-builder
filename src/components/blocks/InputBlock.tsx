import { useStepEditorContext } from "../../pages/StepEditor/StepEditorContext";
import { FormInput } from "../FormInput";

interface InputBlockProps {
  label: string;
  fieldName: string;
}

export const InputBlock = ({
  label,
  fieldName,
  ...defaultAttrs
}: InputBlockProps) => {
  const stepEditorContext = useStepEditorContext();
  return (
    <div className="input-control">
      {label && <label>{label}</label>}

      <FormInput
        {...defaultAttrs}
        value={stepEditorContext?.formData?.[fieldName] ?? ""}
        onChange={(e) =>
          stepEditorContext?.setFormData({
            ...stepEditorContext?.formData,
            [fieldName]: e.target.value,
          })
        }
      />

      {stepEditorContext?.formData?.[fieldName] &&
        stepEditorContext?.formData[fieldName]}
    </div>
  );
};
