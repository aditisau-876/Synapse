import type { ReactNode } from "react";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import Logo from "@/components/landing/Logo";

interface Props {
  children: ReactNode;
}


export default function AuthLayout({
  children,
}: Props) {

  return (
    <main
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-background
      px-6
      "
    >

      <AnimatedBackground />


      <div
        className="
        grid
        w-full
        max-w-6xl
        overflow-hidden
        rounded-[2.5rem]
        border
        border-white/10
        bg-background/60
        shadow-2xl
        backdrop-blur-xl
        lg:grid-cols-2
        "
      >


        {/* Left Branding */}

        <div
          className="
          hidden
          flex-col
          justify-between
          bg-gradient-to-br
          from-indigo-500/20
          via-cyan-500/10
          to-transparent
          p-12
          lg:flex
          "
        >

          <Logo />


          <div>

            <h1
              className="
              text-5xl
              font-black
              leading-tight
              "
            >
              Connect.
              <br/>
              Collaborate.
              <br/>
              Create.
            </h1>


            <p
              className="
              mt-6
              max-w-md
              text-muted-foreground
              "
            >
              Synapse brings messaging, meetings and
              collaboration into one powerful platform.
            </p>


            <div className="mt-10 space-y-4">

              {[
                "Real-time messaging",
                "HD video meetings",
                "AI-powered collaboration",
              ].map((item)=>(

                <div
                  key={item}
                  className="
                  rounded-xl
                  border
                  border-white/10
                  bg-background/40
                  px-4
                  py-3
                  text-sm
                  "
                >
                  ✓ {item}
                </div>

              ))}


            </div>


          </div>


        </div>



        {/* Form */}

        <div
          className="
          flex
          items-center
          justify-center
          p-8
          lg:p-12
          "
        >

          {children}

        </div>


      </div>


    </main>
  );
}