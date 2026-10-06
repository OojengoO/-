import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Send, 
  Copy, 
  Check, 
  Flame, 
  Zap, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import { IncidentLog } from '../types';

const INITIAL_LOGS: IncidentLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-26T08:00:00.000Z',
    dateThai: '26 ต.ค. 69',
    timeString: '08:00 น.',
    reporterRank: 'ร.อ.',
    reporterName: 'สนธยา พึ่งเกษม',
    dutyType: 'fire',
    category: 'normal',
    title: 'รับมอบหน้าที่นายทหารเวรดับเพลิง',
    details: 'รับมอบหน้าที่เวรดับเพลิง สพ.ทร.บางนา ตรวจความพร้อมรถดับเพลิง อุปกรณ์สายส่งน้ำ และวิทยุสื่อสาร พบสภาพพร้อมใช้งาน 100%',
    location: 'หมวดดับเพลิง สพ.ทร.บางนา',
    status: 'resolved',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-26T09:30:00.000Z',
    dateThai: '26 ต.ค. 69',
    timeString: '09:30 น.',
    reporterRank: 'พ.จ.ต.',
    reporterName: 'สุรสิทธิ์ บุษบา',
    dutyType: 'utility',
    category: 'water_issue',
    title: 'ตรวจเช็กแรงดันปั๊มน้ำประปา',
    details: 'ตรวจปั๊มน้ำประปาอาคารกองบัญชาการ พบวาล์วระบายแรงดันมีน้ำซึมเล็กน้อย ได้ทำการขันกวดเกลียวและตรวจสอบแรงดันปกติแล้ว',
    location: 'สถานีสูบน้ำประปา สพ.ทร.',
    status: 'resolved',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-26T14:15:00.000Z',
    dateThai: '26 ต.ค. 69',
    timeString: '14:15 น.',
    reporterRank: 'ร.อ.',
    reporterName: 'สนธยา พึ่งเกษม',
    dutyType: 'fire',
    category: 'normal',
    title: 'ตรวจถังดับเพลิงเคมีประจำคลังสรรพาวุธ',
    details: 'ตรวจถังดับเพลิงประจำคลังหมายเลข 1-4 เข็มวัดแรงดันอยู่ในเกณฑ์สีเขียวทุกถัง ไม่มีสิ่งกีดขวางทางหนีไฟ',
    location: 'คลังสรรพาวุธ 1-4',
    status: 'resolved',
  },
];

export const IncidentLogView: React.FC = () => {
  const [logs, setLogs] = useState<IncidentLog[]>(() => {
    const saved = localStorage.getItem('bangna_duty_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_LOGS;
      }
    }
    return INITIAL_LOGS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [reporterRank, setReporterRank] = useState('ร.อ.');
  const [reporterName, setReporterName] = useState('สนธยา พึ่งเกษม');
  const [dutyType, setDutyType] = useState<'fire' | 'utility' | 'security' | 'other'>('fire');
  const [category, setCategory] = useState<'normal' | 'fire_hazard' | 'power_issue' | 'water_issue' | 'medical_emergency' | 'security'>('normal');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('สพ.ทร.บางนา');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'resolved' | 'in_progress' | 'pending'>('resolved');

  useEffect(() => {
    localStorage.setItem('bangna_duty_logs', JSON.stringify(logs));
  }, [logs]);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;

    const newLog: IncidentLog = {
      id: `log-${Date.now()}`,
      timestamp: now.toISOString(),
      dateThai: '26 ต.ค. 69',
      timeString: timeStr,
      reporterRank,
      reporterName,
      dutyType,
      category,
      title,
      details,
      location,
      status,
    };

    setLogs([newLog, ...logs]);
    setIsAdding(false);
    setTitle('');
    setDetails('');
  };

  const handleDeleteLog = (id: string) => {
    if (confirm('ยืนยันลบรายการบันทึกนี้?')) {
      setLogs(logs.filter(l => l.id !== id));
    }
  };

  const handleCopyLog = (log: IncidentLog) => {
    const text = `📋 บันทึกเหตุการณ์ สพ.ทร.บางนา
เวลา: ${log.timeString} (${log.dateThai})
ผู้บันทึก: ${log.reporterRank} ${log.reporterName} (${log.dutyType === 'fire' ? 'เวรดับเพลิง' : 'เวรไฟฟ้า-ประปา'})
สถานที่: ${log.location}
เรื่อง: ${log.title}
รายละเอียด: ${log.details}
สถานะ: ${log.status === 'resolved' ? 'เรียบร้อย' : 'กำลังดำเนินการ'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-lg mx-auto pb-14">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">บันทึกเหตุการณ์ & การตรวจตรา</h2>
          <p className="text-[11px] text-slate-500">
            สมุดบันทึกผลัดเวรประจำวัน สพ.ทร.บางนา (AppSheet Form)
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            isAdding
              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              : 'bg-blue-900 text-white hover:bg-blue-800'
          }`}
        >
          {isAdding ? (
            <span>ยกเลิก</span>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>บันทึกเหตุการณ์</span>
            </>
          )}
        </button>
      </div>

      {/* AppSheet Add Form */}
      {isAdding && (
        <form onSubmit={handleSaveLog} className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
              <ClipboardCheck className="w-4 h-4 text-blue-600" />
              <span>แบบฟอร์มบันทึกเหตุการณ์ใหม่</span>
            </span>
            <span className="text-[10px] text-slate-400">จันทร์ 26 ต.ค. 69</span>
          </div>

          {/* Duty role selector */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                หน้าที่เวร
              </label>
              <select
                value={dutyType}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setDutyType(val);
                  if (val === 'fire') {
                    setReporterRank('ร.อ.');
                    setReporterName('สนธยา พึ่งเกษม');
                  } else if (val === 'utility') {
                    setReporterRank('พ.จ.ต.');
                    setReporterName('สุรสิทธิ์ บุษบา');
                  }
                }}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500"
              >
                <option value="fire">นายทหารเวรดับเพลิง</option>
                <option value="utility">เวรไฟฟ้า - ประปา</option>
                <option value="security">เวรกอง รปภฯ</option>
                <option value="other">เวรประจำวันอื่น</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                ประเภทเหตุการณ์
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500"
              >
                <option value="normal">รายงานตรวจปกติ / ส่งมอบเวร</option>
                <option value="fire_hazard">เหตุอัคคีภัย / ตรวจหัวจ่ายน้ำ</option>
                <option value="power_issue">เหตุขัดข้องระบบไฟฟ้า</option>
                <option value="water_issue">เหตุขัดข้องระบบประปา</option>
                <option value="medical_emergency">แจ้งกำลังพลเจ็บป่วย</option>
                <option value="security">เหตุการณ์ความปลอดภัย</option>
              </select>
            </div>
          </div>

          {/* Reporter name */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">ยศ</label>
              <input
                type="text"
                value={reporterRank}
                onChange={(e) => setReporterRank(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-medium text-slate-700 mb-1">ชื่อ - สกุล</label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                required
              />
            </div>
          </div>

          {/* Title & Location */}
          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">หัวข้อเหตุการณ์ *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น ตรวจสภาพหัวรับน้ำดับเพลิง, ไฟส่องสว่างจุดตรวจดับ"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">สถานที่ / จุดเกิดเหตุ</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">รายละเอียด / การปฏิบัติ</label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="ระบุรายละเอียดผลการตรวจ หรือการแก้ไขเหตุขัดข้อง..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className="text-xs">
            <label className="block text-[11px] font-medium text-slate-700 mb-1">สถานะ</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="resolved"
                  checked={status === 'resolved'}
                  onChange={() => setStatus('resolved')}
                />
                <span>เรียบร้อยปกติ</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="in_progress"
                  checked={status === 'in_progress'}
                  onChange={() => setStatus('in_progress')}
                />
                <span>กำลังแก้ไข</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>บันทึกข้อมูล (Save)</span>
          </button>
        </form>
      )}

      {/* Logs List */}
      <div className="space-y-2.5">
        {logs.map((log) => {
          const isFire = log.dutyType === 'fire';

          return (
            <div
              key={log.id}
              className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-start gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isFire ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isFire ? <Flame className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{log.title}</h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-slate-700">
                        {log.reporterRank} {log.reporterName}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {log.timeString}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    log.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {log.status === 'resolved' ? 'เรียบร้อย' : 'กำลังดำเนินการ'}
                </span>
              </div>

              {/* Details */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                {log.details}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>สถานที่: {log.location}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLog(log)}
                    className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
                  >
                    {copiedId === log.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>คัดลอก</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-slate-400 hover:text-red-600 p-0.5"
                    title="ลบรายการ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
