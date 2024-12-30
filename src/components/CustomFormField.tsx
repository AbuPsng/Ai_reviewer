"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface customeFieldPropTypes {
  form?: UseFormReturn<{
    username: string;
    email: string;
    password: string;
  }>;
  signForm?: UseFormReturn<{
    identifier: string;
    password: string;
  }>;

  verifyForm?: UseFormReturn<{
    code: string;
  }>;
  contentForm?: UseFormReturn<{
    content: string;
  }>;
  name?: "username" | "email" | "password";
  signName?: "identifier" | "password";
  verify?: "code";
  content?: "content";
  label?: "Username" | "Email" | "Password" | "Code";
  usernameMessage?: string;
  onChange?: (value: string) => void;
  isCheckingUsername?: boolean;
}

const CustomFormField = ({
  form,
  contentForm,
  signForm,
  verifyForm,
  verify,
  content,
  label,
  name,
  signName,
  usernameMessage,
  onChange,
  isCheckingUsername,
}: customeFieldPropTypes) => {
  return (
    <>
      {form && name && (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {onChange ? (
                  <Input
                    placeholder={name}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onChange(e.target.value);
                    }}
                  />
                ) : (
                  <Input
                    placeholder={name}
                    type={name === "password" ? "password" : "text"}
                    {...field}
                  />
                )}
              </FormControl>
              {isCheckingUsername && <Loader2 className="animate-spin" />}
              <p
                className={`text-sm ${usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"}`}
              >
                {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {verifyForm && verify && (
        <FormField
          control={verifyForm.control}
          name={verify}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={verify} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {contentForm && content && (
        <FormField
          control={contentForm.control}
          name={content}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input className="h-24" placeholder={signName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {signForm && signName && (
        <FormField
          control={signForm.control}
          name={signName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type={signName === "password" ? "password" : "text"}
                  placeholder={signName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CustomFormField;
