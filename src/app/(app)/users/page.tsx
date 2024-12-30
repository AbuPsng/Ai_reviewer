"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserDetail from "@/components/UserDetail";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface UserInterface {
  _id: string;
  isAcceptingMessages: boolean;
  username: string;
}

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<Array<UserInterface>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");

  const handleGetUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/get-users");
      toast({
        title: "Fetch successfully",
      });
      setAllUsers([...response.data.data]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while fetching Users",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const handleSearchUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/get-users", {
        username: searchUser,
      });
      toast({
        title: "Fetch successfully",
      });
      setAllUsers([response.data.data]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while fetching Users",
      });
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-col  items-center pt-20">
      <main className="w-full max-w-[1000px] h-full flex flex-col justify-center items-center px-4 gap-y-6">
        <div className="w-full flex gap-3 ">
          <Input
            type="text"
            className="h-12 shadow-lg"
            placeholder="Enter user name "
            onChange={handleSetUser}
          />
          <Button onClick={handleSearchUser} className="px-7 py-6">
            Search
          </Button>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-7">
          {isLoading ? (
            <div className="flex gap-x-4 mt-10 text-lg">
              <span>Fetching Users...</span>
              <Loader2 className="animate-spin" />
            </div>
          ) : allUsers.length > 0 ? (
            allUsers.map((user) => <UserDetail key={user._id} user={user} />)
          ) : (
            <span className="text-2xl text-center mt-16">No Users to show</span>
          )}
        </div>
      </main>
    </section>
  );
};

export default AllUsers;
