
import { prisma } from "@/lib/prisma";
import Link from 'next/link';

export default async function EventsPage() {
    const events = await prisma.event.findMany({
        orderBy: { date: 'asc' }
    });

    return (
        <div className="bg-white min-h-screen pb-24">
            <header className="py-24 bg-[#1B263B] text-white mb-20 text-center">
                <div className="container px-4">
                    <span className="text-[#C5A065] uppercase tracking-[0.4em] text-xs mb-4 block">Official Calendar</span>
                    <h1 className="text-5xl md:text-6xl font-serif">Competitions</h1>
                </div>
            </header>

            <div className="container max-w-4xl px-4">
                <div className="space-y-12">
                    {events.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-gray-100 group">
                            <div className="md:w-48 flex flex-col items-center justify-center p-6 bg-[#F8F7F5] border border-gray-100">
                                <span className="text-3xl font-serif text-[#1B263B]">
                                    {new Date(event.date).getDate()}
                                </span>
                                <span className="text-xs uppercase tracking-widest text-[#C5A065] font-bold">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-serif text-[#1B263B] uppercase tracking-wide group-hover:text-[#C5A065] transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex gap-4 text-xs uppercase tracking-widest text-gray-400 mt-2">
                                            <span>{event.location || 'Official Venue'}</span>
                                            <span>•</span>
                                            <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                    <Link href="#" className="btn-primary py-2 px-6 text-xs whitespace-nowrap">
                                        Register
                                    </Link>
                                </div>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    {event.description || 'Full schedule and competition details will be published closer to the event date.'}
                                </p>
                            </div>
                        </div>
                    ))}

                    {events.length === 0 && (
                        <div className="py-20 text-center text-gray-400 font-light italic">
                            No upcoming competitions scheduled at this time.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
