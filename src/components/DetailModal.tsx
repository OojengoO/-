import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Zap, 
  PhoneCall, 
  Copy, 
  Check, 
  Share2, 
  Calendar, 
  Shield, 
  ChevronRight,
  Clock,
  Pencil
} from 'lucide-react';
import { DailyDutyRecord, formatPhoneNumber } from '../data/dutyData';

interface DetailModalProps {
  record: DailyDutyRecord | null;
  onClose: () => void;
  onSelectAsActive: (day: number) => void;
  onOpenEdit?: (record: DailyDutyRecord) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  record,
  onClose,
  onSelectAsActive,
  onOpenEdit,
}) => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  if (!record) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
              {record.day}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                วัน{record.dayOfWeek} ที่ {record.day} ต.ค. 2569
              </h3>
              <p className="text-[11px] text-slate-500">
                {record.isWeekend ? 'วันหยุดราชการ' : 'วันทำการปกติ'} · สพ.ทร.บางนา
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Card: Fire Duty Officer */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-red-700">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  นายทหารเวรดับเพลิง
                </span>
              </div>
              <span className="text-[10px] bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded-full">
                24 ชม.
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900">
                {record.fireDuty.rank} {record.fireDuty.name}
              </div>
              <div className="text-xs font-mono font-bold text-slate-700 mt-1">
                {formatPhoneNumber(record.fireDuty.phone)}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${record.fireDuty.phone}`}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>โทรออก</span>
              </a>
              <button
                onClick={() => handleCopy(record.fireDuty.phone, 'fire')}
                className="p-2 bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-lg text-xs"
                title="คัดลอกเบอร์"
              >
                {copiedLabel === 'fire' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card: Utility Duty Officer */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-blue-700">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  เวรไฟฟ้า - ประปา
                </span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                โทรภายใน 52222
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900">
                {record.utilityDuty.rank} {record.utilityDuty.name}
              </div>
              <div className="text-xs font-mono font-bold text-slate-700 mt-1">
                {formatPhoneNumber(record.utilityDuty.phone)}
                {record.utilityDuty.secondaryPhone && ` / ${formatPhoneNumber(record.utilityDuty.secondaryPhone)}`}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${record.utilityDuty.phone}`}
                className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>โทรเบอร์มือถือ</span>
              </a>
              {record.utilityDuty.secondaryPhone && (
                <a
                  href={`tel:${record.utilityDuty.secondaryPhone}`}
                  className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>เบอร์ 2</span>
                </a>
              )}
              <button
                onClick={() => handleCopy(record.utilityDuty.phone, 'util')}
                className="p-2 bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-lg text-xs"
                title="คัดลอกเบอร์"
              >
                {copiedLabel === 'util' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            {onOpenEdit && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEdit(record);
                }}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5 text-blue-600" />
                <span>แก้ไขเบอร์โทรศัพท์ / ชื่อผู้เข้าเวรของวันนี้</span>
              </button>
            )}

            {/* Quick Action: Set as active day in main view */}
            <button
              onClick={() => {
                onSelectAsActive(record.day);
                onClose();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>เลือกดูเป็นเวรประจำวันหลัก ({record.day} ต.ค. 69)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
