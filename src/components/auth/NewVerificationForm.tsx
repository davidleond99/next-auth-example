"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { RingLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/auth/new-verification";
import { FormSuccess } from "../form/FormSuccess";
import { FormError } from "../form/FormError";

export const NewVerificationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (successMessage || errorMessage) {
      return;
    }
    if (!token) {
      setErrorMessage("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setErrorMessage(data.error);
        setSuccessMessage(data.success);
      })
      .catch(() => {
        setErrorMessage("Something went wrong!");
      });
  }, [token, successMessage, errorMessage]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center space-x-10">
        {/* <CircleLoader /> */}
        {!successMessage && !errorMessage && <RingLoader />}
        <FormSuccess message={successMessage} />
        {!successMessage && <FormError message={errorMessage} />}
      </div>
    </CardWrapper>
  );
};
