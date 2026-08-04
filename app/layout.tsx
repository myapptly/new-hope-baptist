import './globals.css';

export const metadata = {
  title: 'New Hope Baptist Church & Bible College',
  description: 'Welcome to New Hope Baptist Church and Bible College',
  openGraph: {
    title: 'New Hope Baptist Church & Bible College',
    description: 'Loving God, Loving People, Preparing Disciples for The Ministry.',
    url: 'https://new-hope-baptist-seven.vercel.app',
    siteName: 'New Hope Baptist Church',
    images: [
      {
        url: '/new hope 2.png',
        width: 1200,
        height: 630,
        alt: 'New Hope Baptist Church Building',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Hope Baptist Church & Bible College',
    description: 'Loving God, Loving People, Preparing Disciples for The Ministry.',
    images: ['/new hope 2.png'],
  },
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
