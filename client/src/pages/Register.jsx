import { useTheme } from "@/context/theme-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { registerUser } from "@/services/auth-api";
import Notifications from "@/components/notification";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function Register() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.firstname.trim()) {
      nextErrors.firstname = "required";
    }
    if (!values.lastname.trim()) {
      nextErrors.lastname = "required";
    }
    if (!values.email.trim()) {
      nextErrors.email = "required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.password) {
      nextErrors.password = "required";
    } else if (values.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }
    if (!values.confirmpassword) {
      nextErrors.confirmpassword = "Please confirm your password.";
    } else if (values.confirmpassword !== values.password) {
      nextErrors.confirmpassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await registerUser({
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      });
      if (response.status === "success") {
        setNotification({
          status: response.status,
          message: response.message,
        });
        setValues(initialValues);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setNotification({
        status: "error",
        message: "An error occurred while registering the customer",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div></div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`${isDark ? "glass_card" : "glass_card_light"} col-span-1 p-4 rounded-lg`}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <h1 className="text-lg font-semibold text-center mb-6 mt-4">
          Register
        </h1>

        <FieldGroup className="sm:w-4/6 md:w-3/6 lg:w-3/6 mx-auto">
          {notification && (
            <Notifications
              status={notification.status}
              message={notification.message}
            />
          )}
          <Field data-invalid={!!errors.firstname}>
            <Input
              className="glass_input"
              type="text"
              placeholder="First Name"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              aria-invalid={!!errors.firstname}
            />
            {errors.firstname && (
              <FieldError className="flex items-center gap-1 !text-xs text-red-500 bg-red-100/60 p-1 rounded !w-1/2">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {errors.firstname}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.lastname}>
            <Input
              className="glass_input"
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              aria-invalid={!!errors.lastname}
            />
            {errors.lastname && (
              <FieldError className="flex items-center gap-1 !text-xs text-red-500 bg-red-100/60 p-1 rounded !w-1/2">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {errors.lastname}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.email}>
            <Input
              className="glass_input"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <FieldError className="flex items-center gap-1 !text-xs text-red-500 bg-red-100/60 p-1 rounded !w-1/2">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {errors.email}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.password}>
            <div className="relative pb-5">
              <Input
                className="glass_input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
              <small className="text-xs text-gray-500 absolute bottom-0 left-0">
                Password must be at least 8 characters long
              </small>
            </div>
            {errors.password && (
              <FieldError className="flex items-center gap-1 !text-xs text-red-500 bg-red-100/60 p-1 rounded !w-1/2">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {errors.password}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.confirmpassword}>
            <div className="relative">
              <Input
                className="glass_input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmpassword"
                value={values.confirmpassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmpassword}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            </div>
            {errors.confirmpassword && (
              <FieldError className="flex items-center gap-1 !text-xs text-red-500 bg-red-100/60 p-1 rounded !w-1/2">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {errors.confirmpassword}
              </FieldError>
            )}
          </Field>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
