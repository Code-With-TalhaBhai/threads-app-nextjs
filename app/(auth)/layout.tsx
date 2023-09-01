import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import '@/app/globals.css';


const inter = Inter({subsets:["latin"]})

export const metadata = {
    title: 'Auth',
    description: 'This is authentication by clerk js'
};


export default function RootLayout({children}:{
        children:React.ReactNode
    }){
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1}`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}