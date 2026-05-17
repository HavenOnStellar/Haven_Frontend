'use client';

type Status = 'Active' | 'Stolen' | 'Recovered';

export function StatusBadge({ status }: { status: Status }) {
  let colorClass = '';
  let dotClass = '';

  switch (status) {
    case 'Active':
      colorClass = 'text-[#00d4aa] bg-[#00d4aa]/10 border-[#00d4aa]/30';
      dotClass = 'bg-[#00d4aa]';
      break;
    case 'Stolen':
      colorClass = 'text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30';
      dotClass = 'bg-[#f59e0b] animate-pulse';
      break;
    case 'Recovered':
      colorClass = 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30';
      dotClass = 'bg-[#10b981]';
      break;
  }

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${colorClass}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span className="text-[10px] font-bold uppercase tracking-widest">{status}</span>
    </div>
  );
}
