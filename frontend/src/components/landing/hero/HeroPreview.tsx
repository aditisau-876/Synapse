import { motion } from "framer-motion";
import {
  Video,
  Mic,
  Users,
  MessageCircle,
  CheckCheck,
} from "lucide-react";


export default function HeroPreview() {
  return (
    <div className="relative mx-auto mt-20 flex max-w-6xl justify-center">

      {/* Main Dashboard */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          w-full
          rounded-[2rem]
          border
          border-white/10
          bg-background/70
          p-6
          shadow-2xl
          backdrop-blur-xl
        "
      >

        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              Synapse Workspace
            </p>

            <h3 className="text-xl font-bold">
              Team Communication
            </h3>
          </div>


          <div className="flex -space-x-3">

            {[1,2,3].map((item)=>(
              <div
                key={item}
                className="
                  h-10
                  w-10
                  rounded-full
                  border-2
                  border-background
                  bg-gradient-to-br
                  from-indigo-500
                  to-cyan-400
                "
              />
            ))}

          </div>

        </div>



        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-2">


          {/* Chat */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-muted/30
              p-5
            "
          >

            <div className="mb-5 flex items-center gap-3">

              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-indigo-500
                text-white
              ">
                <MessageCircle size={20}/>
              </div>


              <div>
                <p className="font-semibold">
                  Messages
                </p>

                <p className="text-xs text-emerald-500">
                  5 people online
                </p>
              </div>

            </div>


            <div className="space-y-3">

              <div className="
                w-fit
                rounded-2xl
                bg-background
                px-4
                py-3
                text-sm
              ">
                Meeting starts in 5 minutes
              </div>


              <div className="
                ml-auto
                w-fit
                rounded-2xl
                bg-indigo-600
                px-4
                py-3
                text-sm
                text-white
              ">
                I'll join now 🚀
              </div>


              <div className="
                flex
                justify-end
                gap-1
                text-xs
                text-muted-foreground
              ">
                Seen
                <CheckCheck size={14}/>
              </div>


            </div>


          </div>




          {/* Meeting */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-muted/30
              p-5
            "
          >

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Video size={20}/>

                <p className="font-semibold">
                  Design Meeting
                </p>

              </div>


              <span className="
                rounded-full
                bg-emerald-500/20
                px-3
                py-1
                text-xs
                text-emerald-400
              ">
                Live
              </span>

            </div>


            <div className="
              grid
              grid-cols-2
              gap-3
            ">

              {[1,2,3,4].map((item)=>(
                <div
                  key={item}
                  className="
                    aspect-video
                    rounded-2xl
                    bg-gradient-to-br
                    from-slate-700
                    to-slate-950
                  "
                />
              ))}

            </div>


            <div className="
              mt-5
              flex
              justify-center
              gap-3
            ">

              <div className="rounded-full bg-background p-3">
                <Mic size={18}/>
              </div>


              <div className="rounded-full bg-background p-3">
                <Users size={18}/>
              </div>


            </div>


          </div>


        </div>


      </motion.div>



      {/* Floating notification */}
      <motion.div
        animate={{
          y:[0,-15,0],
        }}
        transition={{
          duration:4,
          repeat:Infinity,
        }}
        className="
          absolute
          -right-6
          top-20
          hidden
          rounded-2xl
          border
          border-white/10
          bg-background/80
          px-5
          py-4
          shadow-xl
          backdrop-blur-xl
          md:block
        "
      >

        <p className="text-sm font-semibold">
          New Message
        </p>

        <p className="text-xs text-muted-foreground">
          Alex joined the meeting
        </p>

      </motion.div>


    </div>
  );
}