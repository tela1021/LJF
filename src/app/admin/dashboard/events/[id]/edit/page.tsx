
import { prisma } from "@/lib/prisma";
import { updateEvent } from "@/app/actions/events";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
    const event = await prisma.event.findUnique({
        where: { id: params.id }
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
                <Link href="/admin/dashboard/events" className="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-[#1B263B] hover:bg-[#1B263B] hover:text-white transition-all">
                    &larr;
                </Link>
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Edit Event</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Update competition details</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-12">
                <form action={updateEvent.bind(null, event.id)} className="flex flex-col gap-10">
                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Event Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            defaultValue={event.title}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] text-xl font-serif focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Location</label>
                        <input
                            name="location"
                            type="text"
                            defaultValue={event.location || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Event Date</label>
                        <input
                            name="date"
                            type="date"
                            required
                            defaultValue={event.date.toISOString().split('T')[0]}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Description</label>
                        <textarea
                            name="description"
                            rows={8}
                            defaultValue={event.description || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light leading-relaxed focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-50">
                        <button type="submit" className="btn-primary min-w-[300px] py-5">
                            Update Competition Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
