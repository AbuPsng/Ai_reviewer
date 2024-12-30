"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { CarouselPropTypes } from "@/types/Props";

const Carousal = ({ messageList }: { messageList: CarouselPropTypes[] }) => {
  return (
    <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full max-w-xs">
      <CarouselContent>
        {messageList.length > 0 ? (
          messageList.map((message) => (
            <CarouselItem key={message.id}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                    <h1>
                      {" "}
                      Message from{" "}
                      <span className="text-black font-semibold">
                        {message.senderName}
                      </span>
                    </h1>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <span className="text-4xl font-semibold">
                      {message.message}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <p>No message to show</p>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Carousal;
