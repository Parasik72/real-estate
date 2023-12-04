import type { INextPageContextExtended, QueryType } from "../types/http.types";
import type { ControllerConfig } from "../types/controller.types";

export const tryCatchControllerSSR = async <TBody extends Object = {}, TQuery extends QueryType = {}>(
  controllerFunc: (config: ControllerConfig<TBody, TQuery>) => Promise<any>,
  context: INextPageContextExtended<TBody, TQuery>
) => {
  try {
    const data = await controllerFunc({
      body: {} as TBody,
      query: context.query as TQuery,
      user: context.user,
      req: context.req,
      res: context.res
    });
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    return { notFound: true };
  }
}