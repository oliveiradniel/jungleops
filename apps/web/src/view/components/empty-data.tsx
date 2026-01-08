import dataNotFoundImage from '@/assets/images/tasks-not-found.svg';

export function EmptyData({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
      <img src={dataNotFoundImage} alt="" className="h-60" />

      {children}
    </div>
  );
}
