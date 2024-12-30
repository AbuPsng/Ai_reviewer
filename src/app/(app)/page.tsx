import Carousal from "@/components/Carousal";
import React from "react";

const fakeMessages = [
  { id: "1", senderName: "Alice", message: "Hello, how are you?" },
  { id: "2", senderName: "Bob", message: "I'm good, thank you!" },
  { id: "3", senderName: "Charlie", message: "What's everyone up to?" },
  { id: "4", senderName: "Alice", message: "Just catching up on some work." },
  { id: "5", senderName: "Bob", message: "Same here. It's been a busy day." },
];

const Home = () => {
  return (
    <main className="flex-grow gap-4 flex flex-col items-center justify-center px-4 md:px-24 pt-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World od Anonymouse Conversations
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore Mystery Message - where your identity remains a secret.
        </p>
      </section>
      <Carousal messageList={fakeMessages} />
      <footer className="text-center p-4 md:p-6 w-full bg-black-80">
        © 2023 Mystery Message. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
