'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";

export async function createNews(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const summary = formData.get('summary') as string;
    const imageFile = formData.get('imageFile') as File;
    let image = formData.get('image') as string;

    // Handle file upload
    const uploadedPath = await uploadFile(imageFile);
    if (uploadedPath) {
        image = uploadedPath;
    }

    if (!title || !content) {
        redirect('/admin/dashboard/news/create?error=Missing Fields');
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
        await prisma.newsItem.create({
            data: {
                title,
                content,
                summary,
                image,
                slug: `${slug}-${Date.now()}`,
            }
        });

        revalidatePath('/admin/dashboard/news');
        revalidatePath('/news');
        revalidatePath('/');

    } catch (e) {
        console.error(e);
        redirect('/admin/dashboard/news/create?error=Database Error');
    }

    redirect('/admin/dashboard/news');
}

export async function deleteNews(id: string) {
    await prisma.newsItem.delete({ where: { id } });
    revalidatePath('/admin/dashboard/news');
}

export async function updateNews(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const summary = formData.get('summary') as string;
    const imageFile = formData.get('imageFile') as File;
    let image = formData.get('image') as string;

    // Handle file upload
    const uploadedPath = await uploadFile(imageFile);
    if (uploadedPath) {
        image = uploadedPath;
    }

    if (!title || !content) {
        redirect(`/admin/dashboard/news/${id}/edit?error=Missing Fields`);
    }

    try {
        await prisma.newsItem.update({
            where: { id },
            data: {
                title,
                content,
                summary,
                image,
            }
        });

        revalidatePath('/admin/dashboard/news');
        revalidatePath('/news');
        revalidatePath('/');

    } catch (e) {
        console.error(e);
        redirect(`/admin/dashboard/news/${id}/edit?error=Database Error`);
    }

    redirect('/admin/dashboard/news');
}
