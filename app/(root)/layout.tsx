import '@/app/globals.css';
import Bottombar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads clone by Talha Developer and its side project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
        <html lang="en">
          <body className={inter.className}>
            <Topbar/>
            <main className='flex'>
              <LeftSidebar/>
              <section className='main-container'>
                <div className='w-full max-w-4xl'>
                {children}
                </div>
              </section>
              <RightSidebar/>
              </main>
            <Bottombar/>
          </body>
        </html>
    </ClerkProvider>
  )
}