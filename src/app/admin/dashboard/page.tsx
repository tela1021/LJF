
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const newsCount = await prisma.newsItem.count();
    const eventCount = await prisma.event.count();
    const riderCount = await prisma.rider.count();

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-4xl font-serif text-[#1B263B]">Administration Overview</h1>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Federation Control Center</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard title="Editorial Stories" value={newsCount} label="Published Articles" />
                <StatCard title="Competitions" value={eventCount} label="Upcoming Events" />
                <StatCard title="Elite Athletes" value={riderCount} label="Active Roster" />
            </div>

            <div className="mt-16">
                <h2 className="text-xl font-serif text-[#1B263B] mb-6">Recent Federation Pulse</h2>
                <div className="bg-white border border-gray-100 p-12 text-center shadow-sm">
                    <p className="text-gray-400 text-sm italic font-light">
                        The management system is healthy. No critical alerts found in the last 24 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, label }: { title: string, value: number, label: string }) {
    return (
        <div className="bg-white border border-gray-100 p-10 shadow-sm group hover:border-[#C5A065] transition-colors duration-500">
            <h3 className="text-[#C5A065] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">{title}</h3>
            <div className="flex items-baseline gap-4">
                <p className="text-5xl font-serif text-[#1B263B]">{value}</p>
                <div className="w-8 h-[1px] bg-gray-100 group-hover:bg-[#C5A065] transition-colors"></div>
            </div>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-4">{label}</p>
        </div>
    );
}
