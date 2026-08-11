import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/useScroll";


export default function Navbar() {

  const [open, setOpen] = useState(false);

  const scrolled = useScroll();


  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6 pt-5">

      <nav
        className={`
          mx-auto flex max-w-7xl items-center justify-between
          rounded-3xl px-6 py-3
          transition-all duration-300
          ${
            scrolled
              ? "border bg-background/80 shadow-xl backdrop-blur-xl"
              : "bg-transparent"
          }
        `}
      >

        <Logo />


        {/* Desktop */}

        <div className="hidden items-center gap-8 md:flex">

          <a href="#features">
            Features
          </a>

          <a href="#experience">
            Experience
          </a>

          <a href="#security">
            Security
          </a>

        </div>



        <div className="hidden items-center gap-3 md:flex">

          <Link to="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>


          <Link to="/signup">
            <Button>
              Get Started
            </Button>
          </Link>

        </div>



        {/* Mobile */}

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >

          {
            open
              ? <X />
              : <Menu />
          }

        </Button>


      </nav>



      {
        open && (

          <div
            className="
              mt-3
              rounded-3xl
              border
              bg-background/90
              p-6
              backdrop-blur-xl
              md:hidden
            "
          >

            <div className="flex flex-col gap-5">

              <a href="#features">
                Features
              </a>

              <a href="#experience">
                Experience
              </a>


              <Link to="/login">
                Login
              </Link>


              <Link to="/signup">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>


            </div>

          </div>

        )
      }


    </header>
  );
}