import "./globals.css";



export const metadata = {
  title: "EgiftSub",
  description: "Buy Gift card codes online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link href="https://fonts.cdnfonts.com/css/euclid-circular-a" rel="stylesheet"/>
                
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
