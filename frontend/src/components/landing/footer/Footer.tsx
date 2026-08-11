import Logo from "../Logo";

const columns = [
  {
    title: "Product",
    links: [
      "Messaging",
      "Meetings",
      "Whiteboard",
      "AI Assistant",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Blog",
      "Contact",
    ],
  },
  {
    title: "Resources",
    links: [
      "Help Center",
      "Documentation",
      "Security",
      "Privacy",
    ],
  },
];


export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">


        <div className="space-y-5">

          <Logo />

          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Synapse connects people through messaging,
            meetings and collaboration tools.
          </p>

        </div>



        {columns.map((column)=>(
          <div key={column.title}>

            <h3 className="mb-5 font-semibold">
              {column.title}
            </h3>


            <ul className="space-y-3">

              {column.links.map((link)=>(
                <li
                  key={link}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {link}
                </li>
              ))}

            </ul>


          </div>
        ))}


      </div>



      <div className="border-t border-white/10 py-6 text-center text-sm text-muted-foreground">

        © {new Date().getFullYear()} Synapse. All rights reserved.

      </div>


    </footer>
  );
}