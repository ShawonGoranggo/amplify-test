import { UseFormRegister } from "react-hook-form";

// Define the prop types for the component
type FieldProps = {
  register: UseFormRegister<any>;
  type: string;
  placeholder: string;
  fieldName: string;
  labelName: string;
  readOnlyField?: boolean;
  required?: boolean;
  maxLength?: number;
};

export default function FormNumberTypeInputField({
  register,
  type,
  placeholder,
  fieldName,
  labelName,
  readOnlyField,
  required,
  maxLength,
}: FieldProps) {
  return (
    <div id={fieldName as string} className="flex flex-col flex-1 gap-2 ">
      <label className="mb-2 font-medium text-gray-600">{labelName}</label>
      <input
        {...register(fieldName, {
          required: required ? `${labelName} is required` : false,
        })}
        maxLength={maxLength}
        type={type}
        className="p-3 border-[2px] border-gray-400 rounded-[7px] focus:border-blue-400"
        placeholder={placeholder}
        disabled={readOnlyField}
        onInput={(e) => {
          // Type assertion to ensure e.target is an HTMLInputElement
          const target = e.target as HTMLInputElement;
          // Remove non-numeric characters
          target.value = target.value.replace(/[^0-9]/g, "");
        }}
      />
    </div>
  );
}
