// app/components/PasswordStrength.tsx
"use client";

type Props = {
  password: string;
};

const getStrength = (password: string) => {
  if (!password) return { label: "", level: 0 };

  let level = 0;
  if (password.length >= 6) level++;
  if (/[A-Z]/.test(password)) level++;
  if (/[0-9]/.test(password)) level++;
  if (/[^A-Za-z0-9]/.test(password)) level++;

  if (level <= 1) return { label: "Weak", level };
  if (level === 2) return { label: "Medium", level };
  return { label: "Strong", level };
};

export default function PasswordStrength({ password }: Props) {
  const { label, level } = getStrength(password);

  if (!password) return null;

  const colors = {
    Weak: "bg-red-500",
    Medium: "bg-yellow-500",
    Strong: "bg-green-500",
  } as const;

  const width = {
    1: "w-1/3",
    2: "w-2/3",
    3: "w-full",
  } as const;

  return (
    <div className="mt-1">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            colors[label as keyof typeof colors]
          } rounded-full transition-all ${
            width[Math.min(level, 3) as keyof typeof width]
          }`}
        />
      </div>
      <p
        className={`text-xs mt-1 ${
          label === "Weak"
            ? "text-red-500"
            : label === "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        Password strength: {label}
      </p>
    </div>
  );
}
