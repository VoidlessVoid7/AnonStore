import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../utils/trpc";

type Inputs = {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  hidden: boolean;
};

const Admin: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { data: session } = useSession();
  const router = useRouter();
  const createProduct = trpc.products.createProduct.useMutation()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createProduct.mutate(data)
    console.log(data);
  }

  useEffect(() => {
    if (session && session?.user?.role != "admin") {
      router.push("/");
    }
  }, []);

  if (session && session?.user?.role != "admin") {
    return <div>Unauthorized</div>
  }

  return (
    <div className="mx-8 mt-12">
      <div className="w-1/4">
        <h2 className="text-3xl font-bold mb-12">Create</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <TextInput
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <TextInput type="text" placeholder="Image" {...register("image")} />
        <TextInput type="number" placeholder="Price" 
         {...register("price", {valueAsNumber: true})} />
        <TextInput
          type="number"
          placeholder="Quantity"
          {...register("quantity", {valueAsNumber: true})}
        />
        <div className="flex items-center gap-2 mt-4">
          <Checkbox {...register("hidden")}/>
          <Label>Set item as hidden?</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      </div>
    </div>
  );
};

export default Admin;
