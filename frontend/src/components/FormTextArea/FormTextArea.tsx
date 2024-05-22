import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";

interface FormTextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormTextArea = ({
  label,
  register,
  error,
  ...props
}: FormTextAreaProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered w-full focus:border-primary focus:outline-none"
        {...props}
        {...register}
      ></textarea>
      <FormErrorMessage error={error} />
    </label>
  );
};

export default FormTextArea;
