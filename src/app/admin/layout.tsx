
import { checkAuth, logout } from "@/app/actions/auth";
import Link from 'next/link';
import "../globals.css"; // Ensure admin layout has styles

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Protect routes - verify session exists (Except login, but this layout wraps dashboard usually)
    // Actually Next.js creates layouts for routes. If this is /admin/layout.tsx, it wraps /admin/login too!
    // We need to move protected layout to /admin/dashboard/layout.tsx OR handle conditional rendering.
    // Best practice: /admin/login is standalone. /admin/(protected)/... 
    // For now, I'll allow this layout to be generic and check auth in the sub-pages or grouping.

    // BUT: if I put checkAuth() here, login page will loop if it's under /admin.
    // I will make this layout for Sidebar, and exclude Login from using it if possible? 
    // No, layout applies to all children.
    // Workaround: Move dashboard to /admin/dashboard and put layout THERE.
    // OR: Login is at /auth/login.
    // Let's assume this layout is only for the PROTECTED area and put login outside of it?
    // Current path: src/app/admin/layout.tsx. This wraps src/app/admin/login/page.tsx.
    // I should move this to src/app/admin/dashboard/layout.tsx.

    // Strategy:
    // 1. /admin/login/page.tsx (No layout or Root layout)
    // 2. /admin/dashboard/layout.tsx (Sidebar + Auth Check)
    // 3. /admin/dashboard/page.tsx

    return (
        <div className="admin-root">
            {children}
        </div>
    )
}
