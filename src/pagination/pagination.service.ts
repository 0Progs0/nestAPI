import { Injectable } from "@nestjs/common";
import { PaginationDTO } from "./dto/pagination.dto";

@Injectable()
export class PaginationService {
  getPagination(dto: PaginationDTO, defaultLimit = 5) {
    const page = dto.page ? +dto.page : 1;
    const limit = dto.limit ? +dto.limit : defaultLimit;

    const skip = (page - 1) * limit;

    return { limit, skip };
  }
}
