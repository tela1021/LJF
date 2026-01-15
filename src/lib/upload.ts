
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function uploadFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0 || !(file instanceof File)) {
        return null;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(uploadDir, uniqueName);

    await writeFile(path, buffer);

    // Return the public URL
    return `/uploads/${uniqueName}`;
}
