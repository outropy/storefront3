import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { RequestURLParam } from "website/functions/requestToParam.ts";
import { AppContext } from "../apps/site.ts";

export interface Props {
  slug: RequestURLParam;
}

// TODO make this an env var
const BASE_LOAD_DIR = "/Users/kumpera/outropy/monobrow/page-out/";
/**
 * @title Outropy demo loader
 * @description Product Details Page loader
 */
const loader = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<ProductDetailsPage | null> => {
  const { slug } = props;

  const data = await Deno.readTextFile(
    BASE_LOAD_DIR + "page_" + slug + ".json",
  );
  const product_payload = JSON.parse(data);

  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 1,
      itemListElement: [
        {
          "@type": "ListItem",
          name: product_payload.data.name,
          item: "/magic/" + slug,
          position: 1,
        },
      ],
    },
    product: product_payload.data,
  };
};

export default loader;
