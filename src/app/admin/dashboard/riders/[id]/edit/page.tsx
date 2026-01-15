
import { prisma } from "@/lib/prisma";
import { updateRider } from "@/app/actions/riders";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function EditRiderPage({ params }: { params: { id: string } }) {
    const rider = await prisma.rider.findUnique({
        where: { id: params.id }
    });

    if (!rider) {
        notFound();
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
                <Link href="/admin/dashboard/riders" className="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-[#1B263B] hover:bg-[#1B263B] hover:text-white transition-all">
                    &larr;
                </Link>
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Edit Athlete Profile</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Update rider Information</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-12">
                <form action={updateRider.bind(null, rider.id)} className="flex flex-col gap-10" encType="multipart/form-data">
                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Athlete Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={rider.name}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] text-xl font-serif focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Prime Horse</label>
                        <input
                            name="horseName"
                            type="text"
                            defaultValue={rider.horseName || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Biography</label>
                        <textarea
                            name="bio"
                            rows={5}
                            defaultValue={rider.bio || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light leading-relaxed focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Upload New Portrait</label>
                                <input
                                    name="imageFile"
                                    type="file"
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#F8F7F5] file:text-[#1B263B] hover:file:bg-[#C5A065] hover:file:text-white transition-all cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">OR Update URL</label>
                                <input
                                    name="image"
                                    type="text"
                                    defaultValue={rider.image || ''}
                                    placeholder="/images/rider1.png"
                                    className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                        {rider.image && (
                            <div>
                                <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Current Portrait</label>
                                <div className="aspect-[4/5] relative overflow-hidden bg-gray-50 border border-gray-100 max-w-[200px]">
                                    <img
                                        src={rider.image}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Key Achievements</label>
                        <textarea
                            name="achievements"
                            rows={5}
                            defaultValue={rider.achievements || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light leading-relaxed focus:border-[#C5A065] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-50">
                        <button type="submit" className="btn-primary min-w-[300px] py-5">
                            Update Athlete Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
