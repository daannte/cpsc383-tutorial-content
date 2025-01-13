import { useMDXComponent } from "@content-collections/mdx/react";
import Link from "next/link";
import Image from "next/image";

const components = {
  h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-2 scroll-m-20 text-4xl font-bold" {...props} />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  h5: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="mt-8 scroll-m-20 text-base font-semibold tracking-tight"
      {...props}
    />
  ),
  a: ({ ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className="font-medium underline underline-offset-2 hover:underline-offset-4 transition-all duration-300 dark:text-teal-400 text-teal-500"
      {...props}
    />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="ml-6 list-disc" {...props} />
  ),
  ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="ml-6 list-decimal" {...props} />
  ),
  li: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className="mt-2" {...props} />
  ),
  pre: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <pre
      className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 dark:bg-[#1a1b26] bg-[#eff1f5]"
      {...props}
    />
  ),
  code: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  Image: ({ className, src, ...props }: React.ComponentProps<typeof Image>) => (
    <Image className={className} src={src} {...props} />
  ),
  // Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
  //   <h3
  //     className={cn(
  //       "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  //       className,
  //     )}
  //     {...props}
  //   />
  // ),
  // Steps: ({ ...props }) => (
  //   <div
  //     className="relative [&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
  //     {...props}
  //   />
  // ),
};

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="mx-auto max-w-[120ch]">
      <Component components={components} />
    </article>
  );
}
