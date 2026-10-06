import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Send, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  MessageSquare,
  Sparkles,
  Edit3
} from 'lucide-react';
import { DailyDutyRecord, EmergencyContact } from '../data/dutyData';

interface LineShareViewProps {
  currentRecord: DailyDutyRecord;
  allRecords: DailyDutyRecord[];
  onSelectDay: (day: number) => void;
  emergencyContacts?: EmergencyContact[];
  onOpenEditDutyModal?: (record: DailyDutyRecord) => void;
}

export function generateExactDutyText(record: DailyDutyRecord, emergencyContacts?: EmergencyContact[]): string {
  const utilityPhone = record.utilityDuty.phone || '0821727782';
  
  // Extract month name from fullDateThai e.g. "ตุลาคม 2569" or "พฤศจิกายน 2569"
  const monthMatch = record.fullDateThai.match(/(ตุลาคม|พฤศจิกายน|ธันวาคม|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน)\s+\d{4}/);
  const monthString = monthMatch ? monthMatch[0] : 'ตุลาคม 2569';
  const isSpecialOct26 = record.day === 26 && monthString.includes('ตุลาคม');

  // Format name nicely with rank
  const formatFireOfficer = isSpecialOct26 
    ? `${record.fireDuty.rank}  ${record.fireDuty.name}`
    : `${record.fireDuty.rank}${record.fireDuty.rank.endsWith('.') ? '' : ' '}${record.fireDuty.name}`;
    
  const formatUtilityOfficer = isSpecialOct26 
    ? `${record.utilityDuty.rank}  ${record.utilityDuty.name}`
    : `${record.utilityDuty.rank}${record.utilityDuty.rank.endsWith('.') ? '' : ' '}${record.utilityDuty.name}`;

  const secGuardPhone = emergencyContacts?.find(c => c.id === 'security-guard')?.phone || '52344';
  const transportDivPhone = emergencyContacts?.find(c => c.id === 'transport-div')?.phone || '52205';
  const transportRiverinePhone = emergencyContacts?.find(c => c.id === 'transport-riverine')?.formattedPhone || emergencyContacts?.find(c => c.id === 'transport-riverine')?.phone || '0 2475 2491';
  const hospitalPhone = emergencyContacts?.find(c => c.id === 'hospital-bangna')?.formattedPhone || emergencyContacts?.find(c => c.id === 'hospital-bangna')?.phone || '08-6067-777';
  const electricPhone = emergencyContacts?.find(c => c.id === 'mea-electric')?.formattedPhone || emergencyContacts?.find(c => c.id === 'mea-electric')?.phone || '02-769-3333';
  const utilityExt = record.utilityDuty.ext || '52222';

  return `รายชื่อเวรประจำวัน ${record.dayOfWeek} ที่
${record.day} ${monthString}
นายทหารเวรดับเพลิง
${formatFireOfficer}
โทร ${record.fireDuty.phone}
เวรไฟฟ้า-ประปา โทร ${utilityExt}
${formatUtilityOfficer}
โทร ${utilityPhone}
น.เวรกองรปภฯ สพ.ทร. โทร ${secGuardPhone}
เวรมว.ขนส่งฯ สพ.ทร.โทร ${transportDivPhone}
ขนส่ง กลน.กร.
โทร.${transportRiverinePhone}
เบอร์ฉุกเฉิน - กรุณาแจ้งป่วยเบอร์
นายทหารเวร ร.พ.กรุงเทพฯ(บางนา)
โทร ${hospitalPhone}
การไฟฟ้า ${electricPhone}`;
}

export function generateFormattedNavalDutyText(record: DailyDutyRecord, emergencyContacts?: EmergencyContact[]): string {
  const utilityPhone = record.utilityDuty.phone || '0821727782';
  const secPhone = record.utilityDuty.secondaryPhone ? ` / ${record.utilityDuty.secondaryPhone}` : '';
  const monthMatch = record.fullDateThai.match(/(ตุลาคม|พฤศจิกายน|ธันวาคม|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน)\s+\d{4}/);
  const monthString = monthMatch ? monthMatch[0] : 'ตุลาคม 2569';
  const secGuardPhone = emergencyContacts?.find(c => c.id === 'security-guard')?.phone || '52344';
  const transportDivPhone = emergencyContacts?.find(c => c.id === 'transport-div')?.phone || '52205';
  const transportRiverinePhone = emergencyContacts?.find(c => c.id === 'transport-riverine')?.formattedPhone || '0 2475 2491';
  const hospitalPhone = emergencyContacts?.find(c => c.id === 'hospital-bangna')?.formattedPhone || '08-6067-777';
  const electricPhone = emergencyContacts?.find(c => c.id === 'mea-electric')?.formattedPhone || '02-769-3333';
  const utilityExt = record.utilityDuty.ext || '52222';

  return `📋 รายชื่อเวรประจำวัน ${record.dayOfWeek} ที่
${record.day} ${monthString} (สพ.ทร.บางนา)
------------------------------------
🚒 นายทหารเวรดับเพลิง
${record.fireDuty.rank} ${record.fireDuty.name}
โทร ${record.fireDuty.phone}

⚡ เวรไฟฟ้า-ประปา โทร ${utilityExt}
${record.utilityDuty.rank} ${record.utilityDuty.name}
โทร ${utilityPhone}${secPhone}

🚨 เบอร์ประสานงาน & ฉุกเฉิน:
- น.เวรกองรปภฯ สพ.ทร. โทร ${secGuardPhone}
- เวรมว.ขนส่งฯ สพ.ทร.โทร ${transportDivPhone}
- ขนส่ง กลน.กร.
  โทร.${transportRiverinePhone}
- เบอร์ฉุกเฉิน - กรุณาแจ้งป่วยเบอร์
  นายทหารเวร ร.พ.กรุงเทพฯ(บางนา)
  โทร ${hospitalPhone}
- การไฟฟ้า ${electricPhone}

✅ สถานะเหตุการณ์: ปกติเรียบร้อยดี`;
}

export const LineShareView: React.FC<LineShareViewProps> = ({
  currentRecord,
  allRecords,
  onSelectDay,
  emergencyContacts,
  onOpenEditDutyModal,
}) => {
  const [templateStyle, setTemplateStyle] = useState<'exact' | 'decorated'>('exact');
  const [customText, setCustomText] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  // Update text when current record or template changes
  useEffect(() => {
    const text = templateStyle === 'exact' 
      ? generateExactDutyText(currentRecord, emergencyContacts) 
      : generateFormattedNavalDutyText(currentRecord, emergencyContacts);
    setCustomText(text);
    setIsEdited(false);
  }, [currentRecord, templateStyle, emergencyContacts]);

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleOpenLine = () => {
    // Open LINE URL scheme with the pre-filled text
    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(customText)}`;
    window.location.href = lineUrl;
  };

  const handleReset = () => {
    const defaultText = templateStyle === 'exact' 
      ? generateExactDutyText(currentRecord, emergencyContacts) 
      : generateFormattedNavalDutyText(currentRecord, emergencyContacts);
    setCustomText(defaultText);
    setIsEdited(false);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-lg mx-auto pb-16">
      {/* Top Banner with LINE Brand Visual */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            {/* LINE logo speech bubble shape */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-emerald-600">
              <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.12 1.87 5.86 4.7 7.37-.21.78-.77 2.82-.88 3.25-.14.54.2.53.42.38.17-.11 2.37-1.6 3.32-2.25.78.11 1.6.17 2.44.17 5.52 0 10-3.92 10-8.75S17.52 2 12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wide">หน้าคัดลอกส่ง LINE กลุ่ม</h2>
            <p className="text-[11px] text-emerald-100">
              จัดรูปแบบข้อความรายชื่อเวรประจำวัน พร้อมส่งได้ทันที
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono shrink-0">
          LINE Format
        </span>
      </div>

      {/* Date Switcher */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-2.5 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectDay(Math.max(1, currentRecord.day - 1))}
          disabled={currentRecord.day <= 1}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          title="วันก่อนหน้า"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>วัน{currentRecord.dayOfWeek} ที่ {currentRecord.day} ตุลาคม 2569</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {currentRecord.day === 26 ? (
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                ★ วันจันทร์ที่ 26 ต.ค. (ตามที่กำหนด)
              </span>
            ) : (
              <span>เวรประจำวัน สพ.ทร.บางนา</span>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelectDay(Math.min(31, currentRecord.day + 1))}
          disabled={currentRecord.day >= 31}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          title="วันถัดไป"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Date Shortcuts */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar text-xs">
        <button
          onClick={() => onSelectDay(26)}
          className={`shrink-0 px-3 py-1 rounded-lg font-semibold transition-all ${
            currentRecord.day === 26
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📍 26 ต.ค. 69 (ตามคำขอ)
        </button>
        <button
          onClick={() => onSelectDay(27)}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-medium transition-all ${
            currentRecord.day === 27
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          27 ต.ค. (พรุ่งนี้)
        </button>
        <select
          value={currentRecord.day}
          onChange={(e) => onSelectDay(Number(e.target.value))}
          className="shrink-0 px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-medium"
        >
          {allRecords.map(r => (
            <option key={r.day} value={r.day}>
              {r.day} ต.ค. ({r.dayOfWeek})
            </option>
          ))}
        </select>
      </div>

      {/* Template Selector */}
      <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 text-xs">
        <button
          onClick={() => setTemplateStyle('exact')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            templateStyle === 'exact'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>แบบตามคำขอ (100% เป๊ะ)</span>
          {templateStyle === 'exact' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
        </button>
        <button
          onClick={() => setTemplateStyle('decorated')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            templateStyle === 'decorated'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>แบบทางการ (มีอิโมจิ)</span>
          {templateStyle === 'decorated' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
        </button>
      </div>

      {/* Copy Alert Toast */}
      {isCopied && (
        <div className="bg-emerald-600 text-white text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-200" />
            <span className="font-semibold">คัดลอกข้อความแล้ว! พร้อมกดวาง (Paste) ใน LINE กลุ่ม</span>
          </div>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">สำเร็จ</span>
        </div>
      )}

      {/* Primary Big Copy Action Button */}
      <div className="space-y-2">
        <button
          onClick={handleCopy}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          {isCopied ? (
            <>
              <Check className="w-5 h-5 text-emerald-200" />
              <span>คัดลอกข้อความสำเร็จแล้ว!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-emerald-100" />
              <span>คัดลอกข้อความส่ง LINE กลุ่ม</span>
            </>
          )}
        </button>

        <button
          onClick={handleOpenLine}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>เปิดแอป LINE เพื่อส่งข้อความ (Share to LINE)</span>
        </button>
      </div>

      {/* LINE Chat Bubble Preview & Editable Box */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-xs overflow-hidden">
        <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>ตัวอย่างข้อความที่จะส่งใน LINE</span>
            {isEdited && (
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-medium">
                พิมพ์แก้ในกล่องแล้ว
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onOpenEditDutyModal && (
              <button
                type="button"
                onClick={() => onOpenEditDutyModal(currentRecord)}
                className="px-2 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 text-[11px] font-medium flex items-center gap-1 shadow-2xs transition-colors"
                title="แก้ไขเบอร์โทรศัพท์และรายชื่ออย่างเป็นทางการ"
              >
                <Edit3 className="w-3 h-3 text-blue-600" />
                <span>แก้ไขเบอร์</span>
              </button>
            )}
            {isEdited && (
              <button
                onClick={handleReset}
                className="text-[11px] text-blue-700 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>คืนค่าเดิม</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Box Content */}
        <div className="p-3 bg-emerald-50/30">
          <div className="bg-[#85e24a]/20 border border-[#85e24a]/40 rounded-xl p-3 shadow-inner">
            <textarea
              rows={16}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setIsEdited(true);
              }}
              className="w-full bg-transparent text-slate-900 font-mono text-xs sm:text-[13px] leading-relaxed resize-none focus:outline-hidden border-0 p-0 selection:bg-emerald-300"
              placeholder="ข้อความรายงานเวร..."
            />
          </div>
        </div>

        <div className="bg-slate-50 px-3.5 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <Edit3 className="w-3 h-3 text-slate-400" />
            <span>แตะในกล่องข้อความเพื่อพิมพ์แก้ไขเพิ่มเติมได้</span>
          </div>
          <span>{customText.length} ตัวอักษร</span>
        </div>
      </div>
    </div>
  );
};
