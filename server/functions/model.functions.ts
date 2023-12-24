import { Attributes, BuildOptions, Includeable, Model, ModelStatic, Order, WhereOptions } from "sequelize";
import { IPager } from "../types/controller.types";

type ModelType<T extends Model> = ModelStatic<T> & {
  new (values?: object, options?: BuildOptions): T;
};

interface IOptions<T extends Model> {
  where?: WhereOptions<Attributes<T>>;
  include?: Includeable | Includeable[];
  order?: Order;
  limit?: number;
}

export const getModelPage = async <T extends Model> (
  model: ModelType<T>,
  page: number,
  limit: number,
  paginationName: string,
  countOptions: IOptions<T> = {},
  findAllOptions: IOptions<T> = {},
): Promise<IPager<T>> => {
  const totalCount = await model.count(countOptions);
  const offset = (page - 1) * limit;
  const data = await model.findAll({ ...findAllOptions, offset });
  return {
    pager: {
      page,
      limit,
      offset,
      totalPages: Math.ceil(totalCount / limit),
      paginationName,
    },
    [paginationName]: data
  };
}