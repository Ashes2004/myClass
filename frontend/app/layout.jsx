import "./globals.css";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
      <body>
        <main>
          {children}
        </main>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </body>
    </html>
  );
}
