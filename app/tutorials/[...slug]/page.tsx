import { allTutorials } from "content-collections";
import { notFound } from "next/navigation";
import { Mdx } from "@/mdx-components";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

async function getTutorialFromParams({ params }: Props) {
  const { slug } = await params;

  const entry = allTutorials.find((entry) => {
    return entry.slug === slug.join("/");
  });

  if (!entry) {
    return null;
  }
  return entry;
}

export function generateStaticParams(): { slug: string[] }[] {
  return allTutorials.map((entry) => ({
    slug: entry.slug.split("/"),
  }));
}

export default async function Tutorial({ params }: Props) {
  const entry = await getTutorialFromParams({ params });

  if (!entry || entry.disabled) {
    return notFound();
  }

  return (
    <main className="flex overflow-hidden gap-16">
      <div className="flex-1 overflow-auto no-scrollbar">
        <div className="mt-8 sm:mt-12 sm:font-light flex items-center">
          <Link
            href="/"
            className="bg-zinc-200 hover:bg-zinc-300 p-2 rounded-md duration-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Link>
          <h1 className="flex items-center text-[clamp(1.875rem,5vw,2.25rem)] font-bold ml-2">
            {entry.title}
          </h1>
        </div>

        <div className="flex gap-16">
          <div className="pb-12 pt-8">
            <Mdx code={entry.mdx} />
          </div>
        </div>
      </div>
    </main>
  );
}
