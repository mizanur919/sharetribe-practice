import React from "react";
import sdkProvider from "../../utils/sdk";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ListingPage = () => {
  const sdk = sdkProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    sdk.ownListings
      .create(
        {
          title: data.Title,
          description: data.Description,
          publicData: {
            address: {
              city: data.City,
              country: data.Country,
              street: data.Street,
            },
            rules: data.Rules,
          },
          price: {
            currency: "USD",
            amount: +data.Amount,
          },
        },
        {
          expand: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast("New list successfully added", {
            type: "success",
            duration: 3000,
          });
        }
      });
  };
  console.log(errors);
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-center text-3xl mb-6">Add New List</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 max-w-md p-3 border border-gray-400 rounded-lg mx-auto"
      >
        <input
          className="p-2 border border-gray-400 rounded-lg"
          type="text"
          placeholder="Title"
          {...register("Title", { required: true, maxLength: 50 })}
        />

        <p className="text-red-600">
          {errors.Title?.type === "required" && "Title is required"}
        </p>
        <textarea
          placeholder="Description"
          className="p-2 border border-gray-400 rounded-lg"
          {...register("Description", { required: true })}
        />
        <p className="text-red-600">
          {errors.Description?.type === "required" && "Description is required"}
        </p>

        <input
          className="p-2 border border-gray-400 rounded-lg"
          type="text"
          placeholder="City"
          {...register("City", { required: true })}
        />
        <p className="text-red-600">
          {errors.City?.type === "required" && "City is required"}
        </p>
        <input
          className="p-2 border border-gray-400 rounded-lg"
          type="text"
          placeholder="Country"
          {...register("Country", { required: true })}
        />
        <input
          className="p-2 border border-gray-400 rounded-lg"
          type="text"
          placeholder="Street"
          {...register("Street", { required: true })}
        />
        <p className="text-red-600">
          {errors.Street?.type === "required" && "Street is required"}
        </p>
        <textarea
          placeholder="Rules"
          className="p-2 border border-gray-400 rounded-lg"
          {...register("Rules", { required: true })}
        />
        <p className="text-red-600">
          {errors.Rules?.type === "required" && "Rules is required"}
        </p>
        <input
          className="p-2 border border-gray-400 rounded-lg"
          type="number"
          placeholder="Amount"
          {...register("Amount", { required: true, min: 100 })}
        />
        <p className="text-red-600">
          {errors.Amount?.type === "required" && "Amount is required"}
        </p>
        <p className="text-red-600">
          {errors.Amount?.type === "min" && "Amount must be higher than 100"}
        </p>

        <input
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ListingPage;
