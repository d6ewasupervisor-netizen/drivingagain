import { useEffect, useState } from 'react';

export default function CoachBubble({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute bottom-28 right-8 bg-pink-500 text-black px-8 py-5 max-w-xs text-sm leading-tight neo-brutalist cursor-pointer z-50">
      {message}
    </div>
  );
}
