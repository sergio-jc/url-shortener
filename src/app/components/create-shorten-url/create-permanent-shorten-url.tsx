"use client";
import { Button } from "@/src/components/ui/button";

export default function CreatePermanentShortenUrl() {
  return (
    <div className="flex w-full justify-center items-center flex-col gap-2">
      <p>Register to create permanent shortened URLs.</p>
      <div className="flex gap-2">
        <Button>Register</Button>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
}
