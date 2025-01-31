const config = {
  env: {
    uploadThingToken: process.env.UPLOADTHING_TOKEN!,
    resendToken: process.env.RESEND_TOKEN!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qStashUrl: process.env.QSTASH_URL!,
      qStashToken: process.env.QSTASH_TOKEN!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
  },
};

export default config;
