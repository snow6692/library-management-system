"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function UploadThing({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative h-72 w-full">
        <Image
          src={value}
          alt="Upload"
          fill
          className="rounded-md object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-red-500 p-1 shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
export default UploadThing;
