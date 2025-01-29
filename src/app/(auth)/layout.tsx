import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex gap-2">
            <Image src={"/icons/logo.svg"} alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white"> Bookie</h1>
          </div>

          <div className="">{children}</div>
        </div>
      </section>

      <section className="auth-illustration hidden md:block">
        <Image
          src={"/images/book-auth.jpg"}
          alt="auth illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
}

export default layout;
