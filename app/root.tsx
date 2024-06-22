import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import './tailwind.css'
import { useState } from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
    let [isInfoOpen, setIsInfoOpen] = useState(false)

    const toggleIsInfoOpen = () => {
        setIsInfoOpen(!isInfoOpen)
    }

    return (
        <html lang="ja">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <nav className="flex fixed w-screen inset-x-0 bottom-0 h-[10%] bg-slate-300 dark:bg-slate-950 z-10 lg:flex-col lg:w-20 lg:h-screen lg:left-0 lg:bg-white lg:dark:bg-slate-800"></nav>

                <div className="fixed rounded-full top-3 inset-x-3 h-16 bg-white dark:bg-slate-950 lg:dark:text-white lg:shadow lg:w-[30%] lg:top-4 lg:left-28 lg:h-12"></div>

                <aside
                    onClick={toggleIsInfoOpen}
                    className={`flex transition-[height] ease-in-out duration-500 fixed w-screen inset-x-0 bottom-0 rounded-t-3xl ${isInfoOpen ? 'h-[20%]' : 'h-[90%]'} bg-white dark:bg-slate-800 overflow-y-hidden text-nowrap lg:w-[30%] lg:rounded-3xl lg:top-20 lg:bottom-6 lg:left-28 lg:h-auto lg:shadow`}
                >
                    {children}
                </aside>

                <main className='className="w-screen h-screen bg-slate-200 dark:bg-slate-700'></main>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}
