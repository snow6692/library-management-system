"use client";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ZodType } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
interface IProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SignIn" | "SignUp";
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: IProps<T>) {
  const isSignedIn = type === "SignIn";
  const form: UseFormReturn<T> = useForm({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignedIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });
      router.push("/");
    } else {
      if (result.error === "TOO_FAST") {
        router.push("/too-fast"); // Redirect to the rate-limit page
      } else {
        toast({
          title: "Error",
          description:
            result.error ||
            (isSignedIn ? "Error signing in." : "Error signing up."),
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignedIn ? "Welcome back to Bookie" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignedIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library  "}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {/* Grab names of defaultValues */}
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        {...field}
                        className="form-input"
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            disabled={form.formState.isLoading}
            type="submit"
            className="form-btn disabled:bg-gray-100"
          >
            {isSignedIn ? "Sign In " : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignedIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignedIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignedIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
