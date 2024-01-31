import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import User from "./components/User";
import SessionProvider from "./components/SessionProvider";
import { faShieldCat, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "@/lib/getSession";
import { ReduxProvider } from "./components/ReduxProvider";
import { getUserSettings } from "./(site)/protected/settings/getUserSettings";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Suspense } from "react";
import Loading from "./loading";
import { MAIN_PAGE } from "./helpers/consts";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Wolontariat fundacji",
  description: "Apka pomocnicza dla wolontariuszy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const settings = await getUserSettings();

  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full bg-white dark:bg-black">
        <SessionProvider session={session}>
          <ReduxProvider userSettings={settings}>
            <main className="h-full flex flex-col">
              <header className="header flex items-center justify-between p-5 bg-neutral-100 dark:bg-neutral-900 shrink-0">
                <h2 className="ml-2 text-3xl uppercase">
                  <Link href={session ? MAIN_PAGE : "/"}>
                    <FontAwesomeIcon icon={faShieldCat} size="sm" />
                  </Link>
                </h2>
                <User />
              </header>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
