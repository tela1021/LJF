
import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import { deleteEvent } from "@/app/actions/events";

export default async function EventsAdminPage() {
    const events = await prisma.event.findMany({
        orderBy: { date: 'asc' }
    });

    return (
        <div>
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Competitions</h1>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Event Schedule Management</p>
                </div>
                {/* For now, just a list. Add "New Event" if needed later. */}
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Event Title</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Location</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Date</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-[#F8F7F5]/50 transition-colors">
                                <td className="p-6 text-[#1B263B] font-medium serif text-lg">{event.title}</td>
                                <td className="p-6 text-gray-500 text-sm font-light">{event.location}</td>
                                <td className="p-6 text-gray-500 text-sm font-light">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="p-6 text-right flex items-center justify-end gap-6">
                                    <Link href={`/admin/dashboard/events/${event.id}/edit`} className="text-[10px] uppercase tracking-widest text-[#1B263B] hover:text-[#C5A065] font-bold transition-colors">
                                        Edit
                                    </Link>
                                    <form action={deleteEvent.bind(null, event.id)} className="inline">
                                        <button className="text-[10px] uppercase tracking-widest text-red-800 hover:text-red-500 font-bold transition-colors">
                                            Remove
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-gray-400 italic font-light">
                                    No events scheduled.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
