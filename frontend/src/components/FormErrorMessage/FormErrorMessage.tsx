import { FieldError } from "react-hook-form";

interface FormErrorMessageProps {
  error?: FieldError;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className="label">
      <span className="label-text-alt text-error" role="alert">
        {error.message}
      </span>
    </div>
  );
};

export default FormErrorMessage;
