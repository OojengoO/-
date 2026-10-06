import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar as CalendarIcon, 
  List, 
  Flame, 
  Zap, 
  PhoneCall, 
  Filter, 
  ChevronRight,
  Download,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { DailyDutyRecord, formatPhoneNumber } from '../data/dutyData';

interface MonthlyRosterViewProps {
  records: DailyDutyRecord[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onOpenDetailModal: (record: DailyDutyRecord) => void;
}

export const MonthlyRosterView: React.FC<MonthlyRosterViewProps> = ({
  records,
  selectedDay,
  onSelectDay,
  onOpenDetailModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'workdays' | 'weekends' | 'fire' | 'utility'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Search text match
      const query = searchTerm.trim().toLowerCase();
      const matchSearch =
        query === '' ||
        r.day.toString().includes(query) ||
        r.dayOfWeek.toLowerCase().includes(query) ||
        r.fireDuty.name.toLowerCase().includes(query) ||
        r.fireDuty.rank.toLowerCase().includes(query) ||
        r.fireDuty.phone.includes(query) ||
        r.utilityDuty.name.toLowerCase().includes(query) ||
        r.utilityDuty.rank.toLowerCase().includes(query) ||
        r.utilityDuty.phone.includes(query);

      if (!matchSearch) return false;

      // Filter category
      if (filterType === 'workdays') return !r.isWeekend;
      if (filterType === 'weekends') return r.isWeekend;
      return true;
    });
  }, [records, searchTerm, filterType]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['วันที่', 'วัน', 'นายทหารเวรดับเพลิง', 'เบอร์โทรดับเพลิง', 'เวรไฟฟ้า-ประปา', 'เบอร์โทรไฟฟ้า-ประปา', 'เบอร์ภายใน'];
    const rows = records.map(r => [
      `"${r.day} ต.ค. 69"`,
      `"${r.dayOfWeek}"`,
      `"${r.fireDuty.rank} ${r.fireDuty.name}"`,
      `"${r.fireDuty.phone}"`,
      `"${r.utilityDuty.rank} ${r.utilityDuty.name}"`,
      `"${r.utilityDuty.phone}${r.utilityDuty.secondaryPhone ? ' / ' + r.utilityDuty.secondaryPhone : ''}"`,
      `"${r.utilityDuty.ext || '52222'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ตารางเวร_สพ.ทร.บางนา_ตุลาคม_2569.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 max-w-lg mx-auto pb-14">
      {/* Header & View Mode Switch */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900">ตารางเวร สพ.ทร.บางนา</h2>
          <p className="text-[11px] text-slate-500">ประจำเดือน ตุลาคม 2569 (31 วัน)</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              viewMode === 'table' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>รายการ</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              viewMode === 'calendar' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>ปฏิทิน</span>
          </button>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาชื่อนายทหาร, ยศ, วันที่, เบอร์โทร..."
          className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-2xs"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-0.5"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ทั้งหมด ({records.length})
        </button>
        <button
          onClick={() => {
            onSelectDay(26);
            setSearchTerm('');
            setFilterType('all');
          }}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            selectedDay === 26
              ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
              : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          ★ วันที่ 26 ต.ค.
        </button>
        <button
          onClick={() => setFilterType('workdays')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            filterType === 'workdays'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          วันธรรมดา (จ.-ศ.)
        </button>
        <button
          onClick={() => setFilterType('weekends')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            filterType === 'weekends'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          วันหยุด (ส.-อา.)
        </button>
        <button
          onClick={handleExportCSV}
          title="ดาวน์โหลดเป็นไฟล์ CSV Excel"
          className="shrink-0 ml-auto px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium flex items-center gap-1"
        >
          <Download className="w-3 h-3 text-slate-500" />
          <span>CSV</span>
        </button>
      </div>

      {/* View Mode: CALENDAR VIEW */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3 space-y-2">
          {/* Day of week header */}
          <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-500 border-b border-slate-100 pb-1.5">
            <div>อา.</div>
            <div>จ.</div>
            <div>อ.</div>
            <div>พ.</div>
            <div>พฤ.</div>
            <div>ศ.</div>
            <div>ส.</div>
          </div>

          {/* Dynamic blank slots before Day 1 */}
          <div className="grid grid-cols-7 gap-1">
            {(() => {
              const dayOfWeekMap: Record<string, number> = {
                'อาทิตย์': 0,
                'จันทร์': 1,
                'อังคาร': 2,
                'พุธ': 3,
                'พฤหัสบดี': 4,
                'ศุกร์': 5,
                'เสาร์': 6,
              };
              const blankCount = records[0] ? (dayOfWeekMap[records[0].dayOfWeek] ?? 0) : 0;
              return Array.from({ length: blankCount }).map((_, i) => (
                <div key={`blank-${i}`} className="h-16 rounded-md bg-slate-50/50"></div>
              ));
            })()}

            {records.map((r) => {
              const isToday26 = r.day === 26;
              const isSelected = r.day === selectedDay;
              return (
                <button
                  key={r.day}
                  onClick={() => {
                    onSelectDay(r.day);
                    onOpenDetailModal(r);
                  }}
                  className={`h-16 p-1 rounded-lg text-left transition-all relative flex flex-col justify-between border ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/50 bg-blue-50/70'
                      : isToday26
                      ? 'border-amber-400 bg-amber-50/80 shadow-xs'
                      : r.isWeekend
                      ? 'border-red-100 bg-red-50/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday26
                          ? 'text-amber-900 bg-amber-200/90 px-1 rounded'
                          : r.isWeekend
                          ? 'text-red-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {r.day}
                    </span>
                    {isToday26 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    )}
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    <div className="text-[9px] text-red-700 truncate font-medium flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 shrink-0"></span>
                      <span className="truncate">{r.fireDuty.name.split(' ')[0]}</span>
                    </div>
                    <div className="text-[9px] text-blue-700 truncate font-medium flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="truncate">{r.utilityDuty.name.split(' ')[0]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-slate-600 pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>เวรดับเพลิง</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
              <span>เวรไฟฟ้า-ประปา</span>
            </div>
            <span>แตะวันที่ เพื่อดูรายละเอียดเต็ม</span>
          </div>
        </div>
      ) : (
        /* View Mode: APPSHEET TABLE / LIST VIEW */
        <div className="space-y-2">
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500">
              <p className="text-xs">ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
              >
                ล้างการค้นหา
              </button>
            </div>
          ) : (
            filteredRecords.map((r) => {
              const isToday26 = r.day === 26;
              const isSelected = r.day === selectedDay;

              return (
                <div
                  key={r.day}
                  onClick={() => {
                    onSelectDay(r.day);
                    onOpenDetailModal(r);
                  }}
                  className={`bg-white rounded-xl border p-3 cursor-pointer transition-all hover:shadow-sm ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/20'
                      : isToday26
                      ? 'border-amber-300 bg-amber-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center font-bold shrink-0 ${
                          isToday26
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                            : r.isWeekend
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span className="text-[10px] leading-tight font-medium">ต.ค.</span>
                        <span className="text-sm leading-none">{r.day}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            วัน{r.dayOfWeek} ที่ {r.day} ตุลาคม 2569
                          </span>
                          {isToday26 && (
                            <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
                              ★ วันที่ 26
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-600">
                          {r.isWeekend ? 'วันหยุดราชการ' : 'วันทำการปกติ'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Two Officer Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* Fire Officer */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/50 border border-red-100">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Flame className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <div className="truncate">
                          <div className="text-[10px] text-red-800 font-medium">เวรดับเพลิง</div>
                          <div className="font-semibold text-slate-900 truncate">
                            {r.fireDuty.rank} {r.fireDuty.name}
                          </div>
                        </div>
                      </div>
                      <a
                        href={`tel:${r.fireDuty.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-red-700 hover:bg-red-200 rounded-md shrink-0 ml-1"
                        title={`โทร ${r.fireDuty.phone}`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Utility Officer */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/50 border border-blue-100">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <div className="text-[10px] text-blue-800 font-medium">เวรไฟฟ้า-ประปา</div>
                          <div className="font-semibold text-slate-900 truncate">
                            {r.utilityDuty.rank} {r.utilityDuty.name}
                          </div>
                        </div>
                      </div>
                      <a
                        href={`tel:${r.utilityDuty.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-blue-700 hover:bg-blue-200 rounded-md shrink-0 ml-1"
                        title={`โทร ${r.utilityDuty.phone}`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
