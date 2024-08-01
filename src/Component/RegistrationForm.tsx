import React, { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formValues);

      setFormValues({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormValues> = {};
    if (!formValues.name) newErrors.name = "name is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formValues.password) newErrors.password = "Password is required";
    else if (formValues.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="bg-gray-700  rounded-lg p-6 ">
        <h2 className="mt-2 text-lg font-semibold text-white">
          To contact us fill the form
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Name : </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              className="border rounded px-2 py-1  mt-4"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <br />
          <div>
            <label className="text-white">Email : </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formValues.email}
              onChange={handleChange}
              className="border rounded px-2 py-1 mt-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <br />
          <div>
            <label className="text-white">Password : </label>
            <input
              id="password"
              name="password"
              type="text"
              value={formValues.password}
              onChange={handleChange}
              className="border rounded px-2 py-1 mt-2"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 mt-2 mb-2 rounded "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;