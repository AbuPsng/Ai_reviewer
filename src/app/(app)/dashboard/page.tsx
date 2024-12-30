"use client";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { acceptMessageSchema } from "@/schema/acceptMessageSchema";
import { ApiResponse, MessageReponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [messages, setMessages] = useState<MessageReponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchingLoading] = useState<boolean>(false);
  const [acceptMessages, setAcceptMessages] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteMessages = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  const { data: session } = useSession();

  const { register } = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchingLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setAcceptMessages(response.data.data!.isAcceptingMessages as boolean);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting",
        variant: "destructive",
      });
    } finally {
      setIsSwitchingLoading(false);
    }
  }, [setAcceptMessages, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchingLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refresh messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message setting",
          variant: "destructive",
        });
      } finally {
        setIsSwitchingLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setAcceptMessages, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setAcceptMessages(!acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to change user isAccepting status",
        variant: "destructive",
      });
    }
  };

  const user = session?.user as User;

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}u/${user?.username}`;

  const handleCopToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL copied",
      description: "Profile URL has been copied to clipboard",
    });
  };

  if (!session || !session.user) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto flex flex-col p-6 gap-y-10 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold ">
        <span className="capitalize">{user?.username || "User"}</span>`s
        Dashboard
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 ">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={handleCopToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />

        <span className="ml-2">
          Accept Messages : {acceptMessages ? "On" : "Off"}
        </span>

        <Separator />
        <Button
          className="mt-4 "
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className=" min-h-72 gap-6 flex justify-center items-center">
          {messages?.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
              {messages?.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessages}
                />
              ))}
            </div>
          ) : (
            <p className="text-xl text-black/60">No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
