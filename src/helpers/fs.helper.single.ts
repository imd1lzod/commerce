import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "node:fs"

@Injectable()
export class FsHelper {
    async uploadFile(file: Express.Multer.File) {
        const fileFolder = path.join(process.cwd(), "uploads")


        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder)
        }


        const fileName = `${Date.now()}-file.${file.originalname.split(".")[1]}`
        fs.writeFileSync(path.join(fileFolder, fileName), file.buffer)

        return {
            message: "Faylga muvaffaqiyatli yozildi"
        }
    }
}