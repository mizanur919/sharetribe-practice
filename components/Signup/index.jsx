import { Form, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import sdkProvider from "../../utils/sdk";

const SignUpPage = () => {
  const sdk = sdkProvider();
  return (
    <div className="container mx-auto py-10 w-96">
      <h1 className="text-center text-4xl mb-6">Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
        }}
        validationSchema={yup.object({
          firstName: yup.string().required("Required"),
          lastName: yup.string().required("Required"),
          phone: yup.string().required("Required"),
          password: yup.string().required("Required"),
          email: yup
            .string()
            .email("Invalid email format")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          sdk.currentUser
            .create(
              {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                publicData: {
                  email: values.email,
                },
                protectedData: {
                  phoneNumber: values.phone,
                },
                privateData: {
                  discoveredServiceVia: "Twitter",
                },
              },
              {
                expand: true,
              }
            )
            .then((res) => {
              console.log("response", res);
            });
          resetForm({
            initialValues: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
            },
          });
        }}
      >
        <Form>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="mb-2 block font-satoshi-bold text-base capitalize text-[#262626] md:text-lg"
            >
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding bg-no-repeat px-3 py-[5px] font-satoshi text-base text-[#1e1e1e] transition ease-in-out focus:outline-none md:py-[7px] md:text-lg"
            />
            <span className="mt-2 text-sm text-red-500">
              <ErrorMessage name="firstName" />
            </span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="mb-2 block font-satoshi-bold text-base capitalize text-[#262626] md:text-lg"
            >
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding bg-no-repeat px-3 py-[5px] font-satoshi text-base text-[#1e1e1e] transition ease-in-out focus:outline-none md:py-[7px] md:text-lg"
            />
            <span className="mt-2 text-sm text-red-500">
              <ErrorMessage name="lastName" />
            </span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block font-satoshi-bold text-base capitalize text-[#262626] md:text-lg"
            >
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding bg-no-repeat px-3 py-[5px] font-satoshi text-base text-[#1e1e1e] transition ease-in-out focus:outline-none md:py-[7px] md:text-lg"
            />
            <span className="mt-2 text-sm text-red-500">
              <ErrorMessage name="email" />
            </span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="mb-2 block font-satoshi-bold text-base capitalize text-[#262626] md:text-lg"
            >
              Phone
            </label>
            <Field
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding bg-no-repeat px-3 py-[5px] font-satoshi text-base text-[#1e1e1e] transition ease-in-out focus:outline-none md:py-[7px] md:text-lg"
            />
            <span className="mt-2 text-sm text-red-500">
              <ErrorMessage name="phone" />
            </span>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-satoshi-bold text-base capitalize text-[#262626] md:text-lg"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Phone Number"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding bg-no-repeat px-3 py-[5px] font-satoshi text-base text-[#1e1e1e] transition ease-in-out focus:outline-none md:py-[7px] md:text-lg"
            />
            <span className="mt-2 text-sm text-red-500">
              <ErrorMessage name="password" />
            </span>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 px-4 py-2 text-center text-white"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpPage;
