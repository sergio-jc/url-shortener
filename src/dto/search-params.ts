import * as z from "zod"

import { DEFAULT_SEARCH_PARAMS } from "../constants/search-params"

export const BasicSearchParamsSchema = z.object({
  page: z.string().optional().transform(Number).default(DEFAULT_SEARCH_PARAMS.page),
  pageSize: z.string().optional().transform(Number).default(DEFAULT_SEARCH_PARAMS.pageSize),
  search: z.string().optional().default(DEFAULT_SEARCH_PARAMS.search),
})

export type BasicSearchParams = z.infer<typeof BasicSearchParamsSchema>
