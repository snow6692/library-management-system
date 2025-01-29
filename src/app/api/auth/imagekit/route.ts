import Imagekit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imageKit: { privateKey, publicKey, urlEndpoint },
  },
} = config;
const imagekit = new Imagekit({ privateKey, publicKey, urlEndpoint });

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
