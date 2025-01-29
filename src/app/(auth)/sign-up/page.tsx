"use client";
import AuthForm from "@/components/forms/AuthForm";
import { singUp } from "@/lib/actions/authAction";
import { singUpSchema } from "@/lib/validations";
import React from "react";

function page() {
  return (
    <AuthForm
      type="SignUp"
      schema={singUpSchema}
      defaultValues={{
        fullName: "",
        password: "",
        email: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={singUp}
    />
  );
}

export default page;
