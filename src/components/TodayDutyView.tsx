import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Droplets, 
  PhoneCall, 
  PhoneForwarded,
  Copy, 
  Check, 
  Share2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Hospital,
  Sparkles,
  ExternalLink,
  Pencil,
  Edit3
} from 'lucide-react';
import { DailyDutyRecord, EmergencyContact, formatPhoneNumber } from '../data/dutyData';

interface TodayDutyViewProps {
  currentRecord: DailyDutyRecord;
  allRecords: DailyDutyRecord[];
  onSelectDay: (day: number) => void;
  onOpenOrderModal: () => void;
  onGoToLineTab: () => void;
  onOpenEditDutyModal: (record: DailyDutyRecord) => void;
  onOpenEditEmergencyModal: (contact: EmergencyContact) => void;
  emergencyContacts: EmergencyContact[];
  isDayCustomized?: boolean;
}

export const TodayDutyView: React.FC<TodayDutyViewProps> = ({
  currentRecord,
  allRecords,
  onSelectDay,
  onOpenOrderModal,
  onGoToLineTab,
  onOpenEditDutyModal,
  onOpenEditEmergencyModal,
  emergencyContacts,
  isDayCustomized,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [safetyChecks, setSafetyChecks] = useState<{ [key: string]: boolean }>({
    fire1: true,
    fire2: true,
    water1: true,
    elec1: true,
    guard1: true,
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const toggleSafetyCheck = (key: string) => {
    setSafetyChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Find contacts from dynamic list
  const secGuard = emergencyContacts.find(c => c.id === 'security-guard') || {
    id: 'security-guard',
    name: 'น.เวรกองรปภฯ สพ.ทร.',
    department: 'กองรักษาความปลอดภัย สพ.ทร.บางนา',
    phone: '52344',
    formattedPhone: '52344 (โทรภายใน)',
    category: 'internal' as const,
    description: '',
  };

  const transportDiv = emergencyContacts.find(c => c.id === 'transport-div') || {
    id: 'transport-div',
    name: 'เวรมว.ขนส่งฯ สพ.ทร.',
    department: 'หมวดขนส่ง สพ.ทร.บางนา',
    phone: '52205',
    formattedPhone: '52205 (โทรภายใน)',
    category: 'internal' as const,
    description: '',
  };

  const transportRiverine = emergencyContacts.find(c => c.id === 'transport-riverine') || {
    id: 'transport-riverine',
    name: 'ขนส่ง กลน.กร.',
    department: 'กองเรือลำน้ำ กองเรือยุทธการ',
    phone: '024752491',
    formattedPhone: '0 2475 2491',
    category: 'support' as const,
    description: '',
  };

  const electricMEA = emergencyContacts.find(c => c.id === 'mea-electric') || {
    id: 'mea-electric',
    name: 'การไฟฟ้านครหลวง',
    department: 'การไฟฟ้าฯ รับแจ้งเหตุ',
    phone: '027693333',
    formattedPhone: '02-769-3333',
    category: 'utility' as const,
    description: '',
  };

  const hospitalBangna = emergencyContacts.find(c => c.id === 'hospital-bangna') || {
    id: 'hospital-bangna',
    name: 'นายทหารเวร ร.พ.กรุงเทพฯ(บางนา)',
    department: 'แจ้งป่วยฉุกเฉิน',
    phone: '0860677770',
    formattedPhone: '08-6067-777',
    category: 'medical' as const,
    description: '',
  };

  // Generate exact duty report text as specified by user for LINE groups
  const generateLineReportText = () => {
    const utilityPhone = currentRecord.utilityDuty.phone || '0821727782';

    return `รายชื่อเวรประจำวัน ${currentRecord.dayOfWeek} ที่
${currentRecord.day} ตุลาคม 2569
นายทหารเวรดับเพลิง
${currentRecord.fireDuty.rank}  ${currentRecord.fireDuty.name}
โทร ${currentRecord.fireDuty.phone}
เวรไฟฟ้า-ประปา โทร ${currentRecord.utilityDuty.ext || '52222'}
${currentRecord.utilityDuty.rank}  ${currentRecord.utilityDuty.name}
โทร ${utilityPhone}
น.เวรกองรปภฯ สพ.ทร. โทร ${secGuard.phone}
เวรมว.ขนส่งฯ สพ.ทร.โทร ${transportDiv.phone}
ขนส่ง กลน.กร.
โทร.${transportRiverine.formattedPhone || transportRiverine.phone}
เบอร์ฉุกเฉิน - กรุณาแจ้งป่วยเบอร์
นายทหารเวร ร.พ.กรุงเทพฯ(บางนา)
โทร ${hospitalBangna.formattedPhone || hospitalBangna.phone}
การไฟฟ้า ${electricMEA.formattedPhone || electricMEA.phone}`;
  };

  const handleShareOrCopyReport = () => {
    const reportText = generateLineReportText();
    handleCopy(reportText, 'ข้อความส่ง LINE กลุ่ม');
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-lg mx-auto pb-12">
      {/* Date Navigation Strip */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-2.5 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectDay(Math.max(1, currentRecord.day - 1))}
          disabled={currentRecord.day <= 1}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="วันก่อนหน้า"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-800" />
            <span className="text-xs font-semibold text-blue-900 tracking-wide">
              {currentRecord.fullDateThai}
            </span>
          </div>
          <div className="text-[11px] text-slate-600 mt-0.5">
            {currentRecord.day === 26 && currentRecord.fullDateThai.includes('ตุลาคม') ? (
              <span className="text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                ★ วันที่ระบุในคำร้อง (จันทร์ 26 ต.ค. 69)
              </span>
            ) : (
              <span>เวรประจำวัน สพ.ทร.บางนา</span>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelectDay(Math.min(allRecords.length, currentRecord.day + 1))}
          disabled={currentRecord.day >= allRecords.length}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="วันถัดไป"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Jump Date Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
        <button
          onClick={() => onSelectDay(1)}
          className={`shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentRecord.day === 1
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ต้นเดือน (วันที่ 1)
        </button>
        <button
          onClick={() => onSelectDay(15)}
          className={`shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentRecord.day === 15
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          กลางเดือน (วันที่ 15)
        </button>
        <button
          onClick={() => onSelectDay(allRecords.length)}
          className={`shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentRecord.day === allRecords.length
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          สิ้นเดือน ({allRecords.length})
        </button>

        {/* Dropdown for any day */}
        <select
          value={currentRecord.day}
          onChange={(e) => onSelectDay(Number(e.target.value))}
          className="shrink-0 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-medium focus:ring-1 focus:ring-blue-500"
        >
          {allRecords.map(r => (
            <option key={r.day} value={r.day}>
              {r.shortDateThai} ({r.dayOfWeek})
            </option>
          ))}
        </select>
      </div>

      {/* Copy Toast Alert */}
      {copiedText && (
        <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>คัดลอก {copiedText} เรียบร้อยแล้ว</span>
          </div>
          <span className="text-[10px] text-slate-400">พร้อมวางใน LINE / โทรศัพท์</span>
        </div>
      )}

      {/* Card 1: นายทหารเวรดับเพลิง (Primary Duty Officer) */}
      <div className="bg-white rounded-xl shadow-xs border border-amber-200/80 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Flame className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wide uppercase">นายทหารเวรดับเพลิง</span>
              <p className="text-[11px] text-red-100">ควบคุมและป้องกันอัคคีภัย สพ.ทร.บางนา</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
            ประจำวันที่ {currentRecord.day}
          </span>
        </div>

        <div className="p-3.5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] text-slate-600 uppercase font-medium">ยศ - ชื่อ - สกุล</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                <span className="text-red-700 mr-1.5">{currentRecord.fireDuty.rank}</span>
                {currentRecord.fireDuty.name}
              </h2>
              <p className="text-xs text-slate-700 mt-0.5">
                นายทหารเวร สพ.ทร.พื้นที่บางนา
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
              พร้อมปฏิบัติหน้าที่
            </span>
          </div>

          {/* Quick Call Action Strip */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-600">เบอร์โทรศัพท์เคลื่อนที่</div>
                <div className="text-sm font-bold font-mono text-slate-900 tracking-wider">
                  {formatPhoneNumber(currentRecord.fireDuty.phone)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Direct Call Button */}
              <a
                href={`tel:${currentRecord.fireDuty.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>โทรออก</span>
              </a>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(currentRecord.fireDuty.phone, `เบอร์ ${currentRecord.fireDuty.name}`)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
                title="คัดลอกเบอร์โทร"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => onOpenEditDutyModal(currentRecord)}
                className="p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-slate-300 transition-colors flex items-center gap-1"
                title="แก้ไขเบอร์หรือชื่อผู้เข้าเวร"
              >
                <Pencil className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-medium hidden sm:inline">แก้ไขเบอร์</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: เวรไฟฟ้า - ประปา (Utility Duty Officer) */}
      <div className="bg-white rounded-xl shadow-xs border border-blue-200/80 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-700 text-white px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wide uppercase">เวรไฟฟ้า - ประปา</span>
              <p className="text-[11px] text-blue-100">แก้ไขเหตุขัดข้องระบบสาธารณูปโภค 24 ชม.</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
            โทรภายใน: {currentRecord.utilityDuty.ext || '52222'}
          </span>
        </div>

        <div className="p-3.5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] text-slate-600 uppercase font-medium">ยศ - ชื่อ - สกุล</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                <span className="text-blue-700 mr-1.5">{currentRecord.utilityDuty.rank}</span>
                {currentRecord.utilityDuty.name}
              </h2>
              <p className="text-xs text-slate-700 mt-0.5 flex items-center gap-2">
                <span>สพ.ทร.พื้นที่บางนา</span>
                <span className="text-blue-800 font-semibold bg-blue-100 px-1.5 py-0.2 rounded text-[11px]">
                  เบอร์ภายใน {currentRecord.utilityDuty.ext || '52222'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenEditDutyModal(currentRecord)}
                className="px-2 py-1 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md border border-slate-300 text-[11px] font-medium flex items-center gap-1 transition-colors"
                title="แก้ไขเบอร์หรือชื่อผู้เข้าเวร"
              >
                <Pencil className="w-3 h-3 text-blue-600" />
                <span>แก้ไขเบอร์</span>
              </button>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                เข้าเวรประจำจุด
              </span>
            </div>
          </div>

          {/* Primary Mobile Phone */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-600">โทรศัพท์เคลื่อนที่ (หลัก)</div>
                <div className="text-xs font-bold font-mono text-slate-900">
                  {formatPhoneNumber(currentRecord.utilityDuty.phone)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${currentRecord.utilityDuty.phone}`}
                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>โทร</span>
              </a>
              <button
                onClick={() => handleCopy(currentRecord.utilityDuty.phone, `เบอร์หลัก ${currentRecord.utilityDuty.name}`)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded border border-slate-300"
                title="คัดลอกเบอร์"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Secondary Mobile Phone (if available, e.g. for Day 26 / 4) */}
          {currentRecord.utilityDuty.secondaryPhone && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <PhoneForwarded className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-600">โทรศัพท์เคลื่อนที่ (สำรอง)</div>
                  <div className="text-xs font-bold font-mono text-slate-900">
                    {formatPhoneNumber(currentRecord.utilityDuty.secondaryPhone)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={`tel:${currentRecord.utilityDuty.secondaryPhone}`}
                  className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>โทร</span>
                </a>
                <button
                  onClick={() => handleCopy(currentRecord.utilityDuty.secondaryPhone!, 'เบอร์สำรอง')}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded border border-slate-300"
                  title="คัดลอกเบอร์"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Internal Extension 52222 */}
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-lg p-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-900">โทรศัพท์สายภายใน:</span>
              <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                52222
              </span>
            </div>
            <a
              href="tel:52222"
              className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold underline flex items-center gap-0.5"
            >
              กดโทร 52222
            </a>
          </div>
        </div>
      </div>

      {/* Speed Dial / Emergency Contacts Section (Requested Numbers) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              เบอร์ประสานงาน & ฉุกเฉินประจำวัน
            </h3>
          </div>
          <span className="text-[10px] text-slate-600">กดเพื่อโทรได้ทันที</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* น.เวรกองรปภฯ สพ.ทร. */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <div className="min-w-0 pr-1">
              <div className="text-xs font-semibold text-slate-900 truncate">{secGuard.name}</div>
              <div className="text-[11px] text-slate-600 font-mono">โทรภายใน {secGuard.phone}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${secGuard.phone}`}
                className="px-2 py-1 bg-slate-900 hover:bg-blue-900 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{secGuard.phone}</span>
              </a>
              <button
                onClick={() => onOpenEditEmergencyModal(secGuard)}
                className="p-1 text-slate-400 hover:text-blue-700 rounded hover:bg-slate-200"
                title="แก้ไขเบอร์นี้"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* เวรมว.ขนส่งฯ สพ.ทร. */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <div className="min-w-0 pr-1">
              <div className="text-xs font-semibold text-slate-900 truncate">{transportDiv.name}</div>
              <div className="text-[11px] text-slate-600 font-mono">โทรภายใน {transportDiv.phone}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${transportDiv.phone}`}
                className="px-2 py-1 bg-slate-900 hover:bg-blue-900 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{transportDiv.phone}</span>
              </a>
              <button
                onClick={() => onOpenEditEmergencyModal(transportDiv)}
                className="p-1 text-slate-400 hover:text-blue-700 rounded hover:bg-slate-200"
                title="แก้ไขเบอร์นี้"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* ขนส่ง กลน.กร. */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <div className="min-w-0 pr-1">
              <div className="text-xs font-semibold text-slate-900 truncate">{transportRiverine.name}</div>
              <div className="text-[11px] text-slate-600 font-mono">{transportRiverine.formattedPhone || transportRiverine.phone}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${transportRiverine.phone}`}
                className="px-2 py-1 bg-slate-900 hover:bg-blue-900 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>โทร</span>
              </a>
              <button
                onClick={() => onOpenEditEmergencyModal(transportRiverine)}
                className="p-1 text-slate-400 hover:text-blue-700 rounded hover:bg-slate-200"
                title="แก้ไขเบอร์นี้"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* การไฟฟ้า 02-769-3333 */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <div className="min-w-0 pr-1">
              <div className="text-xs font-semibold text-slate-900 truncate">{electricMEA.name}</div>
              <div className="text-[11px] text-slate-600 font-mono">{electricMEA.formattedPhone || electricMEA.phone}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${electricMEA.phone}`}
                className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>โทร</span>
              </a>
              <button
                onClick={() => onOpenEditEmergencyModal(electricMEA)}
                className="p-1 text-slate-400 hover:text-blue-700 rounded hover:bg-slate-200"
                title="แก้ไขเบอร์นี้"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Emergency: นายทหารเวร ร.พ.กรุงเทพฯ (บางนา) กรุณาแจ้งป่วยเบอร์ */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
              <Hospital className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-red-900">
                  {hospitalBangna.name}
                </span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">
                  แจ้งป่วย
                </span>
              </div>
              <div className="text-[11px] text-red-700 mt-0.5 font-medium">
                เบอร์ฉุกเฉิน - กรุณาแจ้งป่วยเบอร์: <span className="font-bold font-mono">{hospitalBangna.formattedPhone || hospitalBangna.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            <a
              href={`tel:${hospitalBangna.phone}`}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold shadow-xs flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>โทรฉุกเฉิน</span>
            </a>
            <button
              onClick={() => handleCopy(hospitalBangna.phone, 'เบอร์แจ้งป่วย ร.พ.กรุงเทพฯ บางนา')}
              className="p-1.5 text-red-700 hover:bg-red-100 rounded border border-red-300"
              title="คัดลอกเบอร์"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenEditEmergencyModal(hospitalBangna)}
              className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-white rounded border border-slate-300"
              title="แก้ไขเบอร์โทรศัพท์นี้"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Share to LINE / Official Report Button */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-green-800 text-white rounded-xl p-3.5 shadow-sm space-y-2.5 border border-emerald-600/40">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-wide">คัดลอกส่ง LINE กลุ่ม</span>
                <span className="text-[10px] bg-emerald-500/80 text-white font-semibold px-1.5 py-0.2 rounded">
                  ตามแบบฟอร์ม
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                รายชื่อเวรประจำวัน {currentRecord.dayOfWeek} ที่ {currentRecord.day} ต.ค. 69
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareOrCopyReport}
            className="flex-1 py-2 px-3 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-98"
          >
            <Copy className="w-4 h-4 text-slate-900" />
            <span>คัดลอกข้อความทันที</span>
          </button>

          <button
            onClick={onGoToLineTab}
            className="py-2 px-3 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all border border-white/20"
          >
            <span>เปิดหน้า LINE</span>
          </button>
        </div>
      </div>

      {/* Safety Rounds Checklist Widget */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            รายการตรวจความปลอดภัยประจำผลัด
          </span>
          <span className="text-[10px] text-slate-600">สพ.ทร.บางนา</span>
        </div>

        <div className="space-y-1.5">
          {[
            { id: 'fire1', label: 'ตรวจความพร้อมตู้ดับเพลิงและหัวรับน้ำดับเพลิง' },
            { id: 'water1', label: 'ตรวจระบบปั๊มน้ำประปาและแรงดันน้ำภายในพื้นที่' },
            { id: 'elec1', label: 'ตรวจตู้ควบคุมไฟฟ้า MDB และระบบไฟส่องสว่างค่าย' },
            { id: 'guard1', label: 'ตรวจความพร้อมป้อมยามและจุดตรวจ รปภ.' },
          ].map((item) => (
            <label
              key={item.id}
              onClick={() => toggleSafetyCheck(item.id)}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs text-slate-700 transition-colors select-none"
            >
              <input
                type="checkbox"
                checked={!!safetyChecks[item.id]}
                readOnly
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className={safetyChecks[item.id] ? 'line-through text-slate-600' : 'font-medium'}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Official Order Footer note */}
      <div className="text-center py-1">
        <button
          onClick={onOpenOrderModal}
          className="text-xs text-blue-700 hover:text-blue-900 underline font-medium inline-flex items-center gap-1"
        >
          <span>ดูคำสั่งอนุมัติ กห 0423.4 / 334 และระเบียบการเปลี่ยนเวรฯ</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
