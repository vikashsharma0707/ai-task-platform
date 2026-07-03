import { Check, X } from 'lucide-react';

export function getPasswordChecks(password: string) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordScore(password: string) {
  const checks = getPasswordChecks(password);
  return Object.values(checks).filter(Boolean).length;
}

const LEVELS = [
  { label: 'Very weak', color: 'bg-[#EF4444]', text: 'text-[#EF4444]' },
  { label: 'Weak', color: 'bg-[#EF4444]', text: 'text-[#EF4444]' },
  { label: 'Fair', color: 'bg-[#F59E0B]', text: 'text-[#F59E0B]' },
  { label: 'Good', color: 'bg-[#2563EB]', text: 'text-[#2563EB]' },
  { label: 'Strong', color: 'bg-[#10B981]', text: 'text-[#10B981]' },
];

export function PasswordStrength({ password }: { password: string }) {
  const checks = getPasswordChecks(password);
  const score = getPasswordScore(password);
  const level = LEVELS[score] ?? LEVELS[0];

  if (!password) return null;

  return (
    <div className="mt-2.5">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[#F3F4F6]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                i < score ? level.color : 'bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={`text-xs font-medium ${level.text}`}>{level.label}</span>
        {[
          ['8+ characters', checks.length],
          ['Uppercase', checks.uppercase],
          ['Number', checks.number],
          ['Special char', checks.special],
        ].map(([label, ok]) => (
          <span
            key={label as string}
            className={`inline-flex items-center gap-1 text-[11px] ${
              ok ? 'text-[#6B7280]' : 'text-[#D1D5DB]'
            }`}
          >
            {ok ? <Check size={11} className="text-[#10B981]" /> : <X size={11} />}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}