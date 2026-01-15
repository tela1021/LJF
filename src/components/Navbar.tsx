
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E5E5E5]">
            {/* Top Bar (Promo) */}
            <div className="bg-[#1B263B] text-white text-xs text-center py-2 tracking-widest uppercase">
                Official Federation Website
            </div>

            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-3xl font-serif text-[#1B263B] tracking-widest font-bold">
                    LJF<span className="text-[#C5A065]">.</span>
                </Link>

                {/* Centered Links */}
                <div className="hidden md:flex gap-12 items-center">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/news">News</NavLink>
                    <NavLink href="/events">Competitions</NavLink>
                    <NavLink href="/riders">Riders</NavLink>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/admin/login"
                        className="text-xs font-semibold text-[#1B263B] uppercase tracking-widest hover:opacity-70"
                    >
                        Members Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm uppercase tracking-widest font-medium text-[#1B263B] hover:text-[#C5A065] transition-colors"
        >
            {children}
        </Link>
    );
}
