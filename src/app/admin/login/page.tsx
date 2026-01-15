
import { login } from "@/app/actions/auth";
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F7F5] p-6">
            <div className="bg-white border border-gray-100 p-12 shadow-2xl w-full max-w-md animate-fade-in">
                <div className="text-center mb-10">
                    <Link href="/" className="text-4xl font-serif text-[#1B263B] tracking-widest font-bold mb-4 block">
                        LJF<span className="text-[#C5A065]">.</span>
                    </Link>
                    <h1 className="text-xs uppercase tracking-[0.3em] text-[#C5A065] font-semibold">Management Console</h1>
                </div>

                <form action={login} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-2">Member Email</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue="admin@ljf.com"
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] rounded-none focus:border-[#C5A065] focus:outline-none transition-all placeholder:text-gray-300"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-2">Security Key</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] rounded-none focus:border-[#C5A065] focus:outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-primary mt-4 w-full py-5">
                        Access Dashboard
                    </button>

                    <Link href="/" className="text-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#1B263B] transition-colors mt-4">
                        Return to Public Site
                    </Link>
                </form>
            </div>
        </div>
    );
}
