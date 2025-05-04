import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FsHelperMulti {
    async uploadFiles(files: Express.Multer.File[]) {
        const uploadDir = path.join(process.cwd(), 'uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const savedFiles: any[] = [];

        for (const file of files) {
            const extension = file.originalname.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
            const filePath = path.join(uploadDir, fileName);

            fs.writeFileSync(filePath, file.buffer);
            savedFiles.push({ original: file.originalname, savedAs: fileName });
        }

        return {
            message: 'Fayllar muvaffaqiyatli yuklandi',
            files: savedFiles,
        };
    }
}
