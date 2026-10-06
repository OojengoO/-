import React from 'react';
import { 
  ShieldAlert, 
  RotateCw, 
  Smartphone, 
  Maximize2, 
  CalendarDays,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { AppSheetTab } from '../types';
import { AVAILABLE_MONTHS } from '../data/dutyData';

interface AppSheetHeaderProps {
  currentTab: AppSheetTab;
  isMobileDeviceView: boolean;
  setIsMobileDeviceView: (val: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  selectedDay: number;
  onOpenGuideModal?: () => void;
  selectedMonthKey?: string;
  onSelectMonth?: (key: string) => void;
}

export const AppSheetHeader: React.FC<AppSheetHeaderProps> = ({
  currentTab,
  isMobileDeviceView,
  setIsMobileDeviceView,
  onRefresh,
  isRefreshing,
  selectedDay,
  onOpenGuideModal,
  selectedMonthKey = '2569-10',
  onSelectMonth,
}) => {
  const currentMonthObj = AVAILABLE_MONTHS.find(m => m.key === selectedMonthKey) || AVAILABLE_MONTHS[0];

  const getTabTitle = () => {
    switch (currentTab) {
      case 'today':
        return `เวรประจำวัน (${selectedDay} ${currentMonthObj.shortName})`;
      case 'line':
        return `คัดลอกส่ง LINE กลุ่ม (${selectedDay} ${currentMonthObj.shortName})`;
      case 'roster':
        return `ตารางเวรประจำเดือน ${currentMonthObj.shortName}`;
      case 'emergency':
        return 'สมุดโทรศัพท์ & สายด่วนฉุกเฉิน';
      case 'incident':
        return 'บันทึกเหตุการณ์ & ส่งมอบเวร';
      case 'order':
        return 'คำสั่งแต่งตั้ง & ขอเปลี่ยนเวร';
      default:
        return 'สพ.ทร.บางนา';
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30 border-b border-slate-800">
      {/* AppSheet Top Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Naval Crest & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-700/80 border border-blue-400/40 flex items-center justify-center shadow-inner shrink-0 text-amber-300">
            {/* Navy Anchor Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="currentColor" strokeWidth="1">
              <path d="M12 2a3 3 0 0 0-3 3c0 1.3.8 2.4 2 2.8V11a8 8 0 0 0-7 8h2a6 6 0 0 1 12 0h2a8 8 0 0 0-7-8V7.8c1.2-.4 2-1.5 2-2.8a3 3 0 0 0-3-3zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-semibold tracking-wide truncate">สพ.ทร.บางนา</h1>
              <span className="text-[10px] font-medium bg-blue-900/80 text-blue-200 border border-blue-700/50 px-1.5 py-0.2 rounded">
                AppSheet
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate font-light">
              {getTabTitle()}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Guide & Share */}
          {onOpenGuideModal && (
            <button
              onClick={onOpenGuideModal}
              title="วิธีนำไปใช้งานบนมือถือ / แชร์ลิงก์เข้า LINE"
              className="px-2 py-1 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>วิธีใช้</span>
            </button>
          )}

          {/* Sync / Refresh */}
          <button
            onClick={onRefresh}
            title="ซิงค์ข้อมูล (AppSheet Sync)"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-700 rounded-md transition-colors"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* Toggle Device Frame (useful for desktop screen testing) */}
          <button
            onClick={() => setIsMobileDeviceView(!isMobileDeviceView)}
            title={isMobileDeviceView ? 'ขยายเต็มจอ' : 'มุมมองจำลองหน้าจอมือถือ'}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded border border-slate-700 transition-colors"
          >
            {isMobileDeviceView ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>เต็มจอ</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>จอมือถือ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Online status indicator strip */}
      <div className="bg-slate-800/90 px-4 py-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ระบบพร้อมใช้งาน · บันทึกในเครื่อง (Offline Ready)</span>
        </div>
        {/* Month Selector dropdown */}
        <div className="flex items-center gap-1 text-slate-300">
          <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={selectedMonthKey}
            onChange={(e) => onSelectMonth?.(e.target.value)}
            className="bg-slate-900 text-amber-300 font-semibold text-[11px] rounded px-1.5 py-0.5 border border-slate-700 focus:outline-hidden focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-2xs"
            title="เปลี่ยนเดือนที่ต้องการดูเวร"
          >
            {AVAILABLE_MONTHS.map(m => (
              <option key={m.key} value={m.key}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
