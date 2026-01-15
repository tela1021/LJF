
import { checkAuth, logout } from "@/app/actions/auth";
import Link from 'next/link';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await checkAuth();

    return (
        <div className="flex min-h-screen bg-[#F8F7F5]">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 shadow-sm z-50">
                <div className="p-10 border-b border-gray-50 mb-8">
                    <Link href="/" className="text-3xl font-serif text-[#1B263B] tracking-widest font-bold block mb-2">
                        LJF<span className="text-[#C5A065]">.</span>
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold">Admin Panel</p>
                </div>

                <nav className="flex-1 px-6 flex flex-col gap-2">
                    <DashboardLink href="/admin/dashboard">Overview</DashboardLink>
                    <DashboardLink href="/admin/dashboard/news">Editorial Journal</DashboardLink>
                    <DashboardLink href="/admin/dashboard/events">Competitions</DashboardLink>
                    <DashboardLink href="/admin/dashboard/riders">Riders List</DashboardLink>
                    <div className="mt-8 border-t border-gray-50 pt-8">
                        <DashboardLink href="/">View Public Site</DashboardLink>
                    </div>
                </nav>

                <div className="p-8 border-t border-gray-50">
                    <form action={logout}>
                        <button className="w-full text-left text-[10px] uppercase tracking-widest text-red-800 hover:text-red-500 font-bold transition-colors">
                            End Session
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-80 flex-1 p-16">
                <div className="max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
}

function DashboardLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center px-6 py-4 text-sm font-medium text-[#1B263B] hover:bg-[#F8F7F5] transition-all hover:translate-x-1"
        >
            <span className="w-2 h-[1px] bg-[#C5A065] mr-4"></span>
            {children}
        </Link>
    );
}
