import NavDasboard from "@/components/layouts/dasboard/Navbar";
import { getUser } from "@/libs/dal";

export const metadata = {
  title: "Moot-Flow | Dasboard",
  description: "Mood Flow adalah aplikasi web yang membantu pengguna memantau mood harian, mengelola rutinitas, dan fokus mingguan secara personal.",
  icons: {
    icon: "/mood-flow.png",
  },
};

export default async function RootLayout({ children }) {
  const user = await getUser();

  return (
    <div className="flex bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 backdrop-blur-md">
      <NavDasboard user={user} />
      {children}
    </div>
  );
}
