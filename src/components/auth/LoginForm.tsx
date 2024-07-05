"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/index";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardWrapper,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  FormError,
  FormSuccess,
} from "@/components/index";
import { useEffect, useState, useTransition } from "react";
import { login } from "@/actions";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked")
      setErrorMessage("Email already in use with different provider");
  }, [searchParams]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(async () => {
      try {
        const data = await login(values);
        if (data?.error) {
          setErrorMessage(data.error);
        } else if (data?.success) {
          setSuccessMessage(data.success);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="davidleond99@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    asChild
                    className="px-o font-normal"
                  >
                    <Link href="/auth/reset">Forgot password</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
