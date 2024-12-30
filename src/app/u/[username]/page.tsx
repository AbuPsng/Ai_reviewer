"use client";

import CustomFormField from "@/components/CustomFormField";
import SuggestMessageContainer from "@/components/SuggestMessageContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { messageSchema } from "@/schema/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reviews = [
  "This app has completely transformed how I edit images for my projects. ",
  "As a designer, I often struggle to create the perfect balance.",
  "I’ve been searching for an app like this for ages.",
];

const PublicPage = () => {
  const { username } = useParams();
  const [suggestMessages, setSuggestMessages] =
    useState<Array<string>>(reviews);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    const { content } = data;
    try {
      const result = await axios.post("/api/send-messages", {
        username,
        content,
      });
      toast({
        title: "Send Success",
        description: result.data.message,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Sending Messsage failed",
        description: `This ${error.response.data.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const handleSuggest = async () => {
    setIsSuggesting(true);
    try {
      const result = await axios.get("/api/suggest-messages");
      toast({
        title: "Send Success",
        description: result.data.message,
      });
      console.log(result.data);
      setSuggestMessages(result.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Suggesting Messsage failed",
        description: `This ${error.response.data.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <section className="flex justify-center w-full py-16 gap-y-14 flex-col items-center">
      <main className="flex justify-center items-center flex-col gap-y-10 w-3/4 max-w-[1100px]">
        <h1 className="text-5xl font-bold capitalize">Public Profile Link</h1>
        <div className=" flex flex-col w-full gap-y-3">
          <p className="font-semibold">
            Send Anonymous Message to @{username}{" "}
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col justify-center"
            >
              {/* for email */}
              <CustomFormField content="content" contentForm={form} />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-32 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send It"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <div className="flex  w-3/4 justify-center items-start flex-col gap-y-10  max-w-[1100px]">
        <Button
          className="mt-5 px-8 "
          disabled={isSuggesting}
          onClick={handleSuggest}
        >
          {!isSuggesting ? "Suggest Messages" : "Suggesting Messages ..."}
        </Button>
        <div className="w-full ">
          <p>Click on any messages below to to select it.</p>
          <div className="border rounded-md p-5 flex flex-col gap-y-3">
            <h3 className="font-semibold text-lg">Messages</h3>

            {suggestMessages.map((review, index) => (
              <SuggestMessageContainer
                key={index}
                content={review}
                handleSelect={form.setValue}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicPage;
