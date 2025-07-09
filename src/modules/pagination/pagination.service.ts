import { Injectable } from '@nestjs/common';
import { PAGINATE_ORDER_DEFAULT_LIMIT } from 'src/constant/paginate-order.const';
import {
  IPagination,
  IPaginationResponse,
} from 'src/modules/pagination/types/pagination.type';

@Injectable()
export class PaginationService {
  generateOffsetLimit(pagination: IPagination) {
    const page = pagination.page || 1;
    const limit = pagination.limit || PAGINATE_ORDER_DEFAULT_LIMIT;
    const offset = (page - 1) * limit;
    return { limit, offset };
  }

  paginationResponse(
    pagination: IPagination,
    items: any[],
    totalItems: number,
  ): IPaginationResponse<any> {
    const page = pagination.page || 1;
    const limit = pagination.limit || PAGINATE_ORDER_DEFAULT_LIMIT;
    const totalPage = totalItems ? Math.ceil(totalItems / limit) : 1;
    return {
      items,
      paginationData: {
        currentPage: page,
        totalPage,
        limit,
        totalItems,
      },
    };
  }
}
