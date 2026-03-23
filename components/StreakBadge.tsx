"use client";
import { useEffect, useState } from "react";
import { updateStreak, getStreakMilestoneMessage, type StreakData } from "@/lib/streak";

export function StreakBadge({ eventKey }: { eventKey: string }) {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const s = updateStreak(eventKey);
    setStreak(s);
    setMsg(getStreakMilestoneMessage(s.count));
  }, [eventKey]);

  if (!streak || streak.count <= 1) return null;

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-blue-200">
        <span>{streak.count}日連続訪問中</span>
      </div>
      {msg && <div className="text-orange-400 text-xs font-bold">{msg}</div>}
    </div>
  );
}
