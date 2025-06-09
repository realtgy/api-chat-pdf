"use client";

import { Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useChat, Message } from "ai/react";
import { Document, Message as MessageDB } from "@prisma/client";
import { scrollToBottom } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ChatProps {
  document: Document & {
    messages: MessageDB[];
  };
}

export default function Chat({ document }: ChatProps) {
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      body: {
        fileKey: document.fileKey,
        documentId: document.id,
      },
      initialMessages: document.messages,
    });

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollToBottom(messageRef);
  }, [messages]);

  return (
    <div className="w-1/2  h-[calc(100vh-60px)]">
      <div className="h-full flex flex-col justify-between overflow-scroll bg-white">
        {/* message */}
        <div className="overlfow-auto bg-white">
          <div className="flex flex-col">
            {messages.map((message: Message, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 w-full flex items-start gap-x-8",
                  message.role === "user" ? "bg-white" : "bg-[#faf9f6]"
                )}
              >
                {/* icon */}
                <div className="w-4">
                  {message.role === "user" ? (
                    <User className="bg-[#ff612f] text-white rounded-sm p-1" />
                  ) : (
                    <Bot className="bg-[#062427] text-white rounded-sm p-1" />
                  )}
                </div>
                <div className="text-sm font-light overflow-hidden">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          {/* mark as the bottom of the message box */}
          <div ref={messageRef}></div>
        </div>

        {/* form */}
        <div className="bg-[#faf9f6]">
          <form
            onSubmit={handleSubmit}
            className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white"
          >
            <Input
              disabled={isLoading}
              onChange={handleInputChange}
              value={input}
              placeholder="Enter you question"
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            />
            {isLoading ? (
              <Loader2
                className="h-5 w-5 text-white/80 animate-spin"
                style={{
                  strokeWidth: "3",
                }}
              />
            ) : (
              <Button variant="orange" type="submit">
                <Send className="w-4 h-4" />
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
