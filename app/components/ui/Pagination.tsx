"use client";

import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface PaginationProps {
  current: number; // 0-indexed
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  current,
  total,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={onPrev}
        disabled={current === 0}
      />
      <span className="text-slate-400 text-sm font-semibold min-w-9 text-center">
        {current + 1} / {total}
      </span>
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={onNext}
        disabled={current === total - 1}
      />
    </div>
  );
}
