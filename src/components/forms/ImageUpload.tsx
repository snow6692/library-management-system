"use client";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(
      `Auth request failed: ${error?.message || "Unknown error"}`,
    );
  }
};
function ImageUpload({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const onError = (error) => {
    console.log(error);
    toast({
      title: "Image upload failed",
      description: `Your'r image can't be uploaded please try again`,
      variant: "destructive",
    });
  };
  const onSuccess = (res) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} Uploaded`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
           
            ikUploadRef.current?.click();
          }
        }}
        className="upload-btn"
      >
        <Image
          className="object-contain"
          src={"/icons/upload.svg"}
          width={20}
          height={20}
          alt="Upload icon"
        />
        <p className="text-base text-light-100">Upload a file</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}

export default ImageUpload;
