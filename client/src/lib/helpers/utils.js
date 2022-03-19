import { format } from "date-fns";
import { toast } from "react-toastify";

export const formatDate = (date) => {
  const newDate = new Date(date);
  return format(newDate, "yyyy-MM-dd HH:mm");
};

export const handleFormError = (err, setError, withToast = true) => {
  for (const error of err.errors) {
    if (withToast) toast.error(error.message);

    if (error.field)
      setError(
        error.field,
        {
          message: error.message,
        },
        {
          shouldFocus: true,
        }
      );
  }
};

export const toastErrors = (err) => {
  for (const error of err.errors) {
    toast.error(error.message);
  }
};
