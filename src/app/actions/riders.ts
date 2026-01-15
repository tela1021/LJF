'use server';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";

export async function deleteRider(id: string) {
    try {
        await prisma.rider.delete({ where: { id } });
        revalidatePath('/admin/dashboard/riders');
        revalidatePath('/riders');
    } catch (e) {
        console.error("Failed to delete rider:", e);
    }
}

export async function updateRider(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const horseName = formData.get('horseName') as string;
    const bio = formData.get('bio') as string;
    const achievements = formData.get('achievements') as string;
    const imageFile = formData.get('imageFile') as File;
    let image = formData.get('image') as string;

    // Handle file upload
    const uploadedPath = await uploadFile(imageFile);
    if (uploadedPath) {
        image = uploadedPath;
    }

    if (!name) {
        redirect(`/admin/dashboard/riders/${id}/edit?error=Missing Fields`);
    }

    try {
        await prisma.rider.update({
            where: { id },
            data: {
                name,
                horseName,
                bio,
                achievements,
                image,
            }
        });

        revalidatePath('/admin/dashboard/riders');
        revalidatePath('/riders');
    } catch (e) {
        console.error("Failed to update rider:", e);
        redirect(`/admin/dashboard/riders/${id}/edit?error=Database Error`);
    }

    redirect('/admin/dashboard/riders');
}
