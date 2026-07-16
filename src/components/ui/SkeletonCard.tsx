export function SkeletonCard() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm">
      <div className="h-48 w-full animate-pulse bg-foreground/10" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-foreground/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-foreground/10" />
        <div className="h-3 w-full animate-pulse rounded bg-foreground/10" />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="h-3 w-16 animate-pulse rounded bg-foreground/10" />
          <div className="h-7 w-20 animate-pulse rounded-lg bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}
