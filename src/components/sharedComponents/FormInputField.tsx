import { UseFormRegister } from "react-hook-form";

// Define the prop types for the component
type FieldProps = {
  register: UseFormRegister<any>; // Use InputsType here
  type: string;
  placeholder: string;
  fieldName: string;
  labelName: string;
  readOnlyField?: boolean;
  required?: boolean;
};

export default function FormInputField({
  register,
  type,
  placeholder,
  fieldName,
  labelName,
  readOnlyField,
  required,
}: FieldProps) {
  return (
    <div id={fieldName as string} className="flex flex-col flex-1">
      <label className="mb-2 font-medium text-gray-600">{labelName}</label>
      <input
        {...register(fieldName, {
          required: required ? `${labelName} is required` : false,
        })}
        type={type}
        className="p-4 border-[2px] border-gray-400 rounded-[7px] mt-[6px] hover:outline-blue-500 "
        tabIndex={0}
        placeholder={placeholder}
        disabled={readOnlyField}
      />
    </div>
  );
}
