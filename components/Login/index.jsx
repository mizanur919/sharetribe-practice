import Link from "next/link";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import sdkProvider from "../../utils/sdk";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const sdk = sdkProvider();
  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="border border-gray-200 rounded p-6">
        <h1 className="text-center text-3xl mb-6">Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Invalid email format")
              .required("Required"),
            password: yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            sdk
              .login({
                username: values.email,
                password: values.password,
              })
              .then((loginRes) => {
                if (loginRes.status === 200) {
                  toast("Login successful", {
                    type: "success",
                    duration: 3000,
                  });
                  router.push("/");
                }
              });
            resetForm({
              initialValues: {
                email: "",
                password: "",
              },
            });
          }}
        >
          <Form>
            <div className="mb-3">
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
                Log In
              </button>
            </div>
          </Form>
        </Formik>
        <Link href="/signup">
          <a className="text-indigo-600">Registration Here</a>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
