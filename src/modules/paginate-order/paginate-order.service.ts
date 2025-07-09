import { Injectable } from '@nestjs/common';
import {
  PAGINATE_ORDER_DEFAULT_LIMIT,
  PAGINATE_ORDER_DEFAULT_ORDER,
} from 'src/constant/paginate-order.const';
import {
  BASE_GET_ALL_KEYS,
  BaseGetAll,
} from 'src/validators/get-all-query.dto';
import { IPaginateOrderResponse } from './types/paginate-order.type';

@Injectable()
export class PaginateOrderService {
  generatePaginate(paginateOrder?: BaseGetAll) {
    const page = paginateOrder?.page || 1;
    const limit = paginateOrder?.limit || PAGINATE_ORDER_DEFAULT_LIMIT;
    const offset = (page - 1) * limit;

    let order: string[][] | undefined;
    if (paginateOrder?.order_by) {
      const orderArr = [paginateOrder.order_by];
      if (paginateOrder.order_direction) {
        orderArr.push(paginateOrder.order_direction);
      }
      order = [orderArr];
    } else {
      order = PAGINATE_ORDER_DEFAULT_ORDER;
    }

    return { limit, offset, order };
  }

  paginateOrderResponse(
    items: any[],
    totalItems: number,
    paginateOrder?: BaseGetAll,
  ): IPaginateOrderResponse<any> {
    const page = paginateOrder?.page || 1;
    const limit = paginateOrder?.limit || PAGINATE_ORDER_DEFAULT_LIMIT;
    const totalPage = totalItems ? Math.ceil(totalItems / limit) : 1;
    return {
      items,
      paginationData: {
        currentPage: page,
        totalPage,
        limit,
        totalItems,
      },
      orderData: {
        orderBy: paginateOrder?.order_by || 'id',
        orderDirection: paginateOrder?.order_direction || 'desc',
      },
    };
  }

  separateQueryParameters = <T>(queryDto: Record<string, any>) => {
    const paginateOrder: Partial<BaseGetAll> = {};
    const filter: T | Record<string, any> = {};

    for (const key of Object.keys(queryDto)) {
      if (BASE_GET_ALL_KEYS.includes(key as keyof BaseGetAll)) {
        if (queryDto[key] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          paginateOrder[key] = queryDto[key];
        }
      } else {
        if (queryDto[key] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          filter[key] = queryDto[key];
        }
      }
    }

    return { paginateOrder, filter };
  };
}
