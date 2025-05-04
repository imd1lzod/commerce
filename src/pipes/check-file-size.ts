import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeVaidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 5 * 1024 * 1024

        if (value.size > maxSize) {
            throw new ConflictException("Fayl hajmi 5mb dan kichik bolishi zarur")
        } else {
            return value
        }
    }
}