
import { prisma } from "@/lib/prisma";
import { updateNews } from "@/app/actions/news";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
    const news = await prisma.newsItem.findUnique({
        where: { id: params.id }
    });

    if (!news) {
        notFound();
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
                <Link href="/admin/dashboard/news" className="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-[#1B263B] hover:bg-[#1B263B] hover:text-white transition-all">
                    &larr;
                </Link>
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Edit Story</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Refine your journal entry</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-12">
                <form action={updateNews.bind(null, news.id)} className="flex flex-col gap-10" encType="multipart/form-data">
                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Story Headline</label>
                        <input
                            name="title"
                            type="text"
                            required
                            defaultValue={news.title}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] text-xl font-serif focus:border-[#C5A065] focus:outline-none transition-all placeholder:text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Brief Summary</label>
                        <textarea
                            name="summary"
                            rows={3}
                            defaultValue={news.summary || ''}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all placeholder:text-gray-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Upload New Image</label>
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
                                    defaultValue={news.image || ''}
                                    placeholder="/images/journal1.png"
                                    className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light focus:border-[#C5A065] focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                        {news.image && (
                            <div>
                                <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Current Preview</label>
                                <div className="aspect-video relative overflow-hidden bg-gray-50 border border-gray-100">
                                    <img
                                        src={news.image}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-[#1B263B] text-[10px] uppercase tracking-widest font-bold mb-3">Narrative Content</label>
                        <textarea
                            name="content"
                            required
                            rows={15}
                            defaultValue={news.content}
                            className="w-full bg-white border border-gray-200 p-4 text-[#1B263B] font-light leading-relaxed focus:border-[#C5A065] focus:outline-none transition-all placeholder:text-gray-200"
                        />
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-50">
                        <button type="submit" className="btn-primary min-w-[300px] py-5">
                            Save Editorial Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
