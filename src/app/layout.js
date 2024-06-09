import { Inter } from "next/font/google";

import "../styles/chat.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sala de Chat socket.io y socket.io-client",
  description: "Crear una sala de chat en Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
