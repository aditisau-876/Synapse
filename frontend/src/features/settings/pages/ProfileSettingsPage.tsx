import {
  Camera,
  Mail,
  Phone,
  User,
  AtSign,
  FileText,
} from "lucide-react";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-8">

      {/* Profile header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

        {/* Avatar */}
        <div className="relative">

          <div
            className="
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-[var(--synapse-accent-500)]
              to-indigo-600
              text-4xl
              font-bold
              text-white
              shadow-lg
              shadow-[var(--synapse-accent-500)]/20
            "
          >
            A
          </div>

          <button
            className="
              absolute
              bottom-1
              right-1
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border-4
              border-card
              bg-[var(--synapse-accent-500)]
              text-white
              transition
              hover:bg-[var(--synapse-accent-700)]
            "
          >
            <Camera size={16} />
          </button>

        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Aditi
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information
          </p>

          <button
            className="
              mt-4
              rounded-xl
              border
              border-border
              px-4
              py-2
              text-sm
              font-medium
              transition
              hover:bg-muted
            "
          >
            Change Profile Photo
          </button>
        </div>

      </div>


      {/* Personal information */}
      <section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Personal Information
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Your basic profile information.
          </p>
        </div>


        <div
          className="
            divide-y
            divide-border
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-background
          "
        >

          {/* Name */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-[var(--synapse-accent-500)]
                dark:text-[var(--synapse-accent-500)]
              "
            >
              <User size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-muted-foreground">
                Name
              </p>

              <p className="mt-1 font-medium">
                Aditi
              </p>

            </div>

            <button
              className="
                rounded-xl
                px-3
                py-2
                text-sm
                font-medium
                text-[var(--synapse-accent-500)]
                transition
                hover:bg-[var(--synapse-accent-500)]/10
                dark:text-[var(--synapse-accent-500)]
              "
            >
              Edit
            </button>

          </div>


          {/* Username */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-[var(--synapse-accent-500)]
                dark:text-[var(--synapse-accent-500)]
              "
            >
              <AtSign size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-muted-foreground">
                Username
              </p>

              <p className="mt-1 font-medium">
                @aditi
              </p>

            </div>

            <button
              className="
                rounded-xl
                px-3
                py-2
                text-sm
                font-medium
                text-[var(--synapse-accent-500)]
                transition
                hover:bg-[var(--synapse-accent-500)]/10
                dark:text-[var(--synapse-accent-500)]
              "
            >
              Edit
            </button>

          </div>


          {/* About */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-[var(--synapse-accent-500)]
                dark:text-[var(--synapse-accent-500)]
              "
            >
              <FileText size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-muted-foreground">
                About
              </p>

              <p className="mt-1 truncate font-medium">
                Building something amazing 🚀
              </p>

            </div>

            <button
              className="
                rounded-xl
                px-3
                py-2
                text-sm
                font-medium
                text-[var(--synapse-accent-500)]
                transition
                hover:bg-[var(--synapse-accent-500)]/10
                dark:text-[var(--synapse-accent-500)]
              "
            >
              Edit
            </button>

          </div>

        </div>

      </section>


      {/* Contact information */}
      <section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Contact Information
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Contact details connected to your account.
          </p>
        </div>


        <div
          className="
            divide-y
            divide-border
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-background
          "
        >

          {/* Email */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-[var(--synapse-accent-500)]
                dark:text-[var(--synapse-accent-500)]
              "
            >
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-muted-foreground">
                Email
              </p>

              <p className="mt-1 truncate font-medium">
                aditi@example.com
              </p>

            </div>

            <span
              className="
                rounded-full
                bg-emerald-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-emerald-600
                dark:text-emerald-400
              "
            >
              Verified
            </span>

          </div>


          {/* Phone */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-[var(--synapse-accent-500)]
                dark:text-[var(--synapse-accent-500)]
              "
            >
              <Phone size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs font-medium text-muted-foreground">
                Phone number
              </p>

              <p className="mt-1 font-medium">
                +91 ••••••••••
              </p>

            </div>

            <span
              className="
                rounded-full
                bg-emerald-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-emerald-600
                dark:text-emerald-400
              "
            >
              Verified
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}