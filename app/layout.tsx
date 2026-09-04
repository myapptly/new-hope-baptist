import './globals.css';
import PublicBottomNav from './components/PublicBottomNav';

export const metadata = {
  title: 'New Hope Baptist Church & Bible College',
  description: 'Welcome to New Hope Baptist Church and Bible College',
  manifest: '/manifest.json',
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
      <body>
        {children}
        <div
          style={{
            maxWidth: '28rem',
            margin: '0 auto 78px',
            padding: '10px 16px 14px',
            textAlign: 'center',
            background: '#24152f',
            color: '#cbbdd0',
            fontSize: '11px',
          }}
        >
          Built by{' '}
          <a
            href="https://www.myapptly.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#eadbb5', fontWeight: 700, textDecoration: 'none' }}
          >
            APPTLY
          </a>
        </div>
        <PublicBottomNav />
      </body>
    </html>
  );
}
