import Image from "next/image";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
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
