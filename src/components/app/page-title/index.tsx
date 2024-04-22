"use client";
import Link from "next/link";
import { IoChevronForward as ChevronForward } from "react-icons/io5";

interface Props {
  primaryTitle: string;
  secondaryTitle?: string;
}

const PageTitle: React.FC<Props> = ({ primaryTitle, secondaryTitle }) => {
  const Title = () => (
    <h1 className="text-xl font-semibold uppercase tracking-wide md:text-3xl">
      {primaryTitle}
    </h1>
  );

  return (
    <div className="flex items-center gap-2 py-1 md:gap-4">
      {secondaryTitle?.trim() ? (
        <Link href="/">
          <Title />
        </Link>
      ) : (
        <Title />
      )}
      {secondaryTitle?.trim() && (
        <>
          <ChevronForward className="size-7 text-textPrimary" />
          <h2 className="truncate text-nowrap text-xl font-medium uppercase tracking-wide md:text-2xl">
            {secondaryTitle}
          </h2>
        </>
      )}
    </div>
  );
};

export default PageTitle;
