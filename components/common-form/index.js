import { Button } from "../ui/button";
import FormControll from "./form-controll";

const CommonForm = ({
  formControlls = [],
  formData,
  setFormData,
  buttonText,
  isButtonDisabled,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormControll
        formControls={formControlls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className={`w-full py-3 rounded-md text-white font-bold ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
export default CommonForm;
