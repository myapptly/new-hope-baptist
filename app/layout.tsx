import './globals.css';

export const metadata = {
  title: 'New Hope Baptist Church',
  description: 'Welcome to New Hope Baptist Church and Bible College',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
