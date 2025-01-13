import { allTutorials } from "content-collections";
import { notFound } from "next/navigation";
import { Mdx } from "@/mdx-components";

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

  if (!entry) {
    return notFound();
  }

  return (
    <main className="flex overflow-hidden gap-16">
      <div className="flex-1 overflow-auto no-scrollbar">
        <div className="mt-8 sm:mt-12 sm:font-light">
          <h1 className="flex items-center text-[clamp(1.875rem,5vw,2.25rem)] font-bold">
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
