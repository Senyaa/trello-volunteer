import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import User from "./components/User";
import SessionProvider from "./components/SessionProvider";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "@/lib/getSession";
import { ReduxProvider } from "./components/ReduxProvider";
import { getUserSettings } from "./(site)/protected/settings/getUserSettings";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Suspense } from "react";
import Loading from "./loading";
import { MAIN_PAGE } from "./helpers/consts";
import { getCurrentShiftId } from "@/actions/getCurrentShiftId";
import { StoreHydration } from "./components/StoreHydration";
import ShiftIndicator from "./components/shift/ShiftIndicator";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "ekoapka",
  description: "Dyżury w eko łatwiejsze niz z trello",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const settings = await getUserSettings();
  const shift = await getCurrentShiftId();

  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full bg-neutral-100 dark:bg-black">
        <SessionProvider session={session}>
          <ReduxProvider>
            <StoreHydration userSettings={settings} shiftId={shift || ""}>
              <main className="h-full flex flex-col">
                <header className="header flex items-center justify-between p-5 bg-white shadow-xs dark:bg-neutral-900 shrink-0">
                  <h2>
                    <Link
                      href={session ? MAIN_PAGE : "/"}
                      className="flex items-center"
                    >
                      <FontAwesomeIcon icon={faShieldCat} className="text-3xl"/>
                      <span className="hidden md:block text-sm ml-2">ekoapka</span>
                    </Link>
                  </h2>
                  <div className="flex items-center">
                    {session && <ShiftIndicator isShift={Boolean(shift)} />}
                    <User />
                  </div>
                </header>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </main>
            </StoreHydration>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
