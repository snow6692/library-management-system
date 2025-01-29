"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/authAction";
import { signInSchema } from "@/lib/validations";
import React from "react";

function page() {
  return (
    <AuthForm
      type="SignIn"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
}

export default page;
