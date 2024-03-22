import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Search({ searchParams: { query } }: Props) {
  if (!query || Array.isArray(query)) {
    return redirect("/");
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(
      sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${
        productsTable.description
      })) @@ to_tsquery('simple', lower(${query.trim().split(" ").join(" & ")}))`
    )
    .limit(3);

  if (products.length === 0) {
    return (
      <div className="py-4 text-center bg-white shadow-md rounded-b-md">
        <X className="mx-auto text-gray-400 size-8" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
        <p className="mx-auto mt-1 text-sm text-gray-500 max-w-prose">
          We couldn't find any products with the search term <span className="font-medium text-green-600">{query}</span>
          . Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col py-4 mt-10 bg-white divide-y shadow-md divide-zinc-100 rounded-b-md">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="flex px-8 py-4 mx-auto mb-6 space-x-4">
            <div className="relative flex items-center rounded-lg bg-zinc-100 size-40">
              <Image loading="eager" src={`/${product.imageId}`} fill alt={product.name} />
            </div>
            <div className="flex-1 w-full py-1 space-y-2">
              <h1 className="text-lg font-medium text-gray-900">{product.name}</h1>
              <p className="prose-sm prose text-gray-500 line-clamp-3">{product.description}</p>
              <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
