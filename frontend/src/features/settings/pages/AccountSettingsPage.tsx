import {
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Monitor,
  Smartphone,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">
          Account
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, security, and connected devices.
        </p>
      </div>


      {/* Account information */}
      <section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Account Information
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the contact information associated with your account.
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
          <button
            className="
              flex
              w-full
              items-center
              gap-4
              p-5
              text-left
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-brand
                dark:text-brand
              "
            >
              <Mail size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="font-medium">
                Email address
              </p>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                aditi@example.com
              </p>

            </div>

            <div className="flex items-center gap-3">

              <span
                className="
                  hidden
                  rounded-full
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-600
                  sm:block
                  dark:text-emerald-400
                "
              >
                Verified
              </span>

              <ChevronRight
                size={18}
                className="text-muted-foreground"
              />

            </div>

          </button>


          {/* Phone */}
          <button
            className="
              flex
              w-full
              items-center
              gap-4
              p-5
              text-left
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-brand
                dark:text-brand
              "
            >
              <Phone size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="font-medium">
                Phone number
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                +91 ••••••••••
              </p>

            </div>

            <div className="flex items-center gap-3">

              <span
                className="
                  hidden
                  rounded-full
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-600
                  sm:block
                  dark:text-emerald-400
                "
              >
                Verified
              </span>

              <ChevronRight
                size={18}
                className="text-muted-foreground"
              />

            </div>

          </button>

        </div>

      </section>


      {/* Security */}
      <section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Security
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Keep your Synapse account secure.
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

          {/* Password */}
          <button
            className="
              flex
              w-full
              items-center
              gap-4
              p-5
              text-left
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-brand
                dark:text-brand
              "
            >
              <Lock size={20} />
            </div>

            <div className="flex-1">

              <p className="font-medium">
                Password
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Change your account password
              </p>

            </div>

            <ChevronRight
              size={18}
              className="text-muted-foreground"
            />

          </button>


          {/* Two-factor authentication */}
          <button
            className="
              flex
              w-full
              items-center
              gap-4
              p-5
              text-left
              transition
              hover:bg-muted/40
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <ShieldCheck size={20} />
            </div>

            <div className="flex-1">

              <p className="font-medium">
                Two-factor authentication
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>

            </div>

            <span
              className="
                hidden
                rounded-full
                bg-muted
                px-3
                py-1
                text-xs
                font-medium
                text-muted-foreground
                sm:block
              "
            >
              Not enabled
            </span>

            <ChevronRight
              size={18}
              className="text-muted-foreground"
            />

          </button>

        </div>

      </section>


      {/* Devices */}
      <section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Devices & Sessions
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage where your Synapse account is currently signed in.
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

          {/* Current device */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--synapse-accent-500)]/10
                text-brand
                dark:text-brand
              "
            >
              <Monitor size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-center gap-2">

                <p className="font-medium">
                  Windows PC
                </p>

                <span
                  className="
                    rounded-full
                    bg-emerald-500/10
                    px-2
                    py-0.5
                    text-[11px]
                    font-medium
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  This device
                </span>

              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Chrome · Active now
              </p>

            </div>

          </div>


          {/* Mobile device */}
          <div
            className="
              flex
              items-center
              gap-4
              p-5
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-muted
                text-muted-foreground
              "
            >
              <Smartphone size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="font-medium">
                Android Phone
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Synapse Mobile · Last active recently
              </p>

            </div>

            <button
              className="
                rounded-xl
                p-2
                text-muted-foreground
                transition
                hover:bg-red-500/10
                hover:text-red-500
              "
              title="Sign out"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

        <button
          className="
            mt-4
            rounded-xl
            border
            border-border
            px-4
            py-2.5
            text-sm
            font-medium
            transition
            hover:bg-muted
          "
        >
          Sign out of all other devices
        </button>

      </section>


      {/* Danger zone */}
      <section>

        <div className="mb-4">

          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Danger Zone
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Actions here can permanently affect your account.
          </p>

        </div>

        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/[0.03]
            p-5
            dark:bg-red-500/[0.05]
          "
        >

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-red-500
              "
            >
              <Trash2 size={20} />
            </div>

            <div className="flex-1">

              <h4 className="font-semibold">
                Delete account
              </h4>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Permanently delete your Synapse account and all associated data.
                This action cannot be undone.
              </p>

              <button
                className="
                  mt-4
                  rounded-xl
                  border
                  border-red-500/30
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-red-600
                  transition
                  hover:bg-red-500/10
                  dark:text-red-400
                "
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}