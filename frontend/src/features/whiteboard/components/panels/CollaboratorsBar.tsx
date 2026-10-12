import {
  Crown,
  Mic,
  MousePointer2,
} from "lucide-react";

import { motion } from "framer-motion";

const collaborators = [

  {
    name: "You",
    color: "bg-[var(--synapse-accent-500)]",
    owner: true,
  },

  {
    name: "Alex",
    color: "bg-sky-600",
  },

  {
    name: "Sarah",
    color: "bg-amber-600",
  },

  {
    name: "Emily",
    color: "bg-rose-600",
  },

];

export default function CollaboratorsBar() {

  return (

    <motion.div

      initial={{
        y: -30,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      className="
      absolute
      right-6
      top-6
      z-40
      flex
      items-center
      gap-4
      rounded-3xl
      border
      border-border
      bg-card/90
      px-5
      py-3
      shadow-2xl
      backdrop-blur-xl
      "

    >

      <div className="flex -space-x-3">

        {

          collaborators.map((user)=>(

            <div

              key={user.name}

              className={`
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border-2
                border-background
                
                ${user.color}
                text-sm
                font-bold
                text-white
              `}

            >

              {user.name[0]}

              {

                user.owner &&

                <Crown
                  size={12}
                  className="
                  absolute
                  -right-1
                  -top-1
                  text-yellow-400
                  "
                />

              }

            </div>

          ))

        }

      </div>

      <div className="h-10 w-px bg-border"/>

      <div>

        <p className="text-sm font-semibold">

          Alex is editing

        </p>

        <div
          className="
          mt-1
          flex
          items-center
          gap-2
          text-xs
          text-muted-foreground
          "
        >

          <MousePointer2 size={13}/>

          Cursor active

          <Mic size={13}/>

          Voice connected

        </div>

      </div>

    </motion.div>

  );

}