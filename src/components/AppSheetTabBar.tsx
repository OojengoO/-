import React from 'react';
import { 
  UserCheck, 
  CalendarRange, 
  PhoneCall, 
  ClipboardEdit, 
  FileText,
  MessageSquareShare
} from 'lucide-react';
import { AppSheetTab } from '../types';

interface AppSheetTabBarProps {
  currentTab: AppSheetTab;
  onTabChange: (tab: AppSheetTab) => void;
  unreadIncidentCount?: number;
}

export const AppSheetTabBar: React.FC<AppSheetTabBarProps> = ({
  currentTab,
  onTabChange,
  unreadIncidentCount = 0,
}) => {
  const tabs: { id: AppSheetTab; label: string; icon: React.ReactNode; badge?: number; isSpecial?: boolean }[] = [
    {
      id: 'today',
      label: 'เวรวันนี้',
      icon: <UserCheck className="w-4.5 h-4.5" />,
    },
    {
      id: 'line',
      label: 'ส่ง LINE',
      icon: <MessageSquareShare className="w-4.5 h-4.5 text-emerald-400" />,
      isSpecial: true,
    },
    {
      id: 'roster',
      label: 'ตารางเวร',
      icon: <CalendarRange className="w-4.5 h-4.5" />,
    },
    {
      id: 'emergency',
      label: 'ฉุกเฉิน',
      icon: <PhoneCall className="w-4.5 h-4.5" />,
    },
    {
      id: 'incident',
      label: 'บันทึกเหตุ',
      icon: <ClipboardEdit className="w-4.5 h-4.5" />,
      badge: unreadIncidentCount > 0 ? unreadIncidentCount : undefined,
    },
    {
      id: 'order',
      label: 'คำสั่งเวร',
      icon: <FileText className="w-4.5 h-4.5" />,
    },
  ];

  return (
    <nav className="bg-slate-900 border-t border-slate-800 text-slate-400 py-1.5 px-1 safe-area-bottom z-30 shadow-lg">
      <div className="grid grid-cols-6 gap-0.5 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all relative ${
                isActive
                  ? tab.isSpecial 
                    ? 'text-emerald-400 font-bold bg-emerald-950/40' 
                    : 'text-amber-400 font-semibold bg-slate-800/60'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full ring-2 ring-slate-900">
                    {tab.badge}
                  </span>
                )}
                {tab.isSpecial && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-slate-900 animate-pulse"></span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight truncate w-full text-center ${
                isActive 
                  ? tab.isSpecial ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold' 
                  : tab.isSpecial ? 'text-emerald-400 font-medium' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${tab.isSpecial ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
