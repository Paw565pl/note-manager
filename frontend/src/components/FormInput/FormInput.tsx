import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormInput = ({ label, register, error, ...props }: FormInputProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        className="input input-bordered w-full focus:border-primary focus:outline-none"
        {...props}
        {...register}
      />
      <FormErrorMessage error={error} />
    </label>
  );
};

export default FormInput;
