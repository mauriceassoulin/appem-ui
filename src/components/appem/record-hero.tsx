import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface RecordHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface RecordHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  image?: string;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: RecordHeroBreadcrumb[];
}

const RecordHero = React.forwardRef<HTMLDivElement, RecordHeroProps>(
  (
    { title, subtitle, image, badges, actions, breadcrumbs, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border-b border-ink-100 px-6 py-6",
          className
        )}
        {...props}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-sm text-ink-500">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <svg
                      className="h-3 w-3 text-ink-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-brand-700 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-ink-700">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="flex items-start gap-5">
          {image && (
            <Image
              src={image}
              alt=""
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-xl object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl text-ink-950">{title}</h1>
            {subtitle && (
              <p className="text-base text-ink-500 mt-1">{subtitle}</p>
            )}
            {badges && <div className="flex flex-wrap gap-2 mt-3">{badges}</div>}
          </div>
          {actions && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </div>
      </div>
    );
  }
);
RecordHero.displayName = "RecordHero";

export { RecordHero };
