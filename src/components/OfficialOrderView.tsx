import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Copy, 
  Check, 
  ArrowRightLeft,
  ChevronDown,
  Building,
  Shield,
  Download
} from 'lucide-react';
import { ORDER_DOCUMENT_INFO, OCTOBER_2569_SCHEDULE } from '../data/dutyData';

export const OfficialOrderView: React.FC = () => {
  const [showSwapForm, setShowSwapForm] = useState(false);
  const [copiedMemo, setCopiedMemo] = useState(false);

  // Shift swap form state
  const [requesterRole, setRequesterRole] = useState<'fire' | 'utility'>('fire');
  const [requesterName, setRequesterName] = useState('ร.อ.สนธยา พึ่งเกษม');
  const [origDay, setOrigDay] = useState(26);
  const [substituteName, setSubstituteName] = useState('ร.อ.มีชัย อันตะโก');
  const [subDay, setSubDay] = useState(27);
  const [reason, setReason] = useState('ติดภารกิจราชการฝึกอบรมตามคำสั่งหน่วยเหนือ');
  const [generatedMemo, setGeneratedMemo] = useState<string | null>(null);

  const handleGenerateSwapMemo = (e: React.FormEvent) => {
    e.preventDefault();
    const roleTitle = requesterRole === 'fire' ? 'นายทหารเวรดับเพลิง' : 'ผู้ปฏิบัติหน้าที่เวรไฟฟ้า - ประปา';

    const memo = `บันทึกข้อความ
ส่วนราชการ: สพ.ทร.บางนา
เรื่อง: ขออนุมัติเปลี่ยนการปฏิบัติหน้าที่${roleTitle} สพ.ทร.บางนา
เรียน: ผอ.กผร.สพ.ทร. (ผ่าน ผธก.กผร.สพ.ทร.)

๑. ตามที่ได้รับคำสั่งแต่งตั้งให้ข้าพเจ้า ${requesterName} ปฏิบัติหน้าที่${roleTitle} สพ.ทร.บางนา ประจำเดือน ต.ค. ๖๙ ในวันที่ ${origDay} ตุลาคม ๒๕๖๙ นั้น
๒. เนื่องจากข้าพเจ้ามีเหตุจำเป็นคือ ${reason} จึงไม่สามารถเข้าปฏิบัติหน้าที่ในวันดังกล่าวได้ ในการนี้ได้ประสานสลับเวรกับ ${substituteName} ซึ่งมีเวรในวันที่ ${subDay} ตุลาคม ๒๕๖๙ โดยทั้งสองฝ่ายยินยอมสลับเวรกัน
๓. จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติให้สลับวันปฏิบัติหน้าที่เวรฯ ดังกล่าว

(ลงชื่อ)...................................................
     (${requesterName})
     ผู้ขออนุมัติเปลี่ยนเวร

(ลงชื่อ)...................................................
     (${substituteName})
     ผู้ยินยอมปฏิบัติหน้าที่แทน`;

    setGeneratedMemo(memo);
  };

  const handleCopyGenerated = () => {
    if (!generatedMemo) return;
    navigator.clipboard.writeText(generatedMemo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-lg mx-auto pb-14">
      {/* Official Memo Header Card */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-xs p-4 space-y-3">
        {/* Garuda / Thai Emblem Simulation */}
        <div className="text-center space-y-1 border-b border-slate-200 pb-3">
          <div className="w-10 h-10 mx-auto text-amber-700">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2L9 7h6l-3-5zm0 6l-5 4 2 6 3-2 3 2 2-6-5-4zm-8 4l2 1-1 3-3-2 2-2zm16 0l2 2-3 2-1-3 2-1z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-slate-900 tracking-wide">
            บันทึกข้อความราชการ
          </h2>
          <p className="text-[11px] text-slate-600 font-mono">
            {ORDER_DOCUMENT_INFO.memoNumber} · {ORDER_DOCUMENT_INFO.date}
          </p>
        </div>

        {/* Memo Details */}
        <div className="text-xs space-y-2 text-slate-800">
          <div className="grid grid-cols-4 gap-1">
            <span className="font-semibold text-slate-500">ส่วนราชการ:</span>
            <span className="col-span-3 font-medium">กผร.สพ.ทร. (โทร. 52216)</span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            <span className="font-semibold text-slate-500">เรื่อง:</span>
            <span className="col-span-3 font-medium leading-relaxed">
              {ORDER_DOCUMENT_INFO.subject}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            <span className="font-semibold text-slate-500">เสนอ:</span>
            <span className="col-span-3 font-medium">
              ผอ.กผร.สพ.ทร. / หน.สพ.ทร.พื้นที่บางนา
            </span>
          </div>
        </div>

        {/* Memo Content 3 Clauses */}
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-2 border border-slate-200">
          <p className="leading-relaxed">
            <strong>๑.</strong> กผร.สพ.ทร. ขออนุมัติแต่งตั้งผู้ปฏิบัติหน้าที่นายทหารเวรดับเพลิง และผู้ปฏิบัติหน้าที่เวรไฟฟ้า - ประปา สพ.ทร.บางนา ประจำเดือน ต.ค.๖๙
          </p>
          <p className="leading-relaxed">
            <strong>๒.</strong> การแต่งตั้งผู้ปฏิบัติหน้าที่ฯ เพื่อเป็นการรักษาความปลอดภัย การป้องกันอัคคีภัย ตลอดจนการควบคุม กำกับดูแล และแก้ไขเหตุขัดข้องเกี่ยวกับระบบไฟฟ้าและประปาในพื้นที่ สพ.ทร.บางนา เป็นไปด้วยความเรียบร้อย
          </p>
          <p className="leading-relaxed">
            <strong>๓.</strong> เห็นควรอนุมัติแต่งตั้งผู้ปฏิบัติหน้าที่นายทหารเวรดับเพลิง สพ.ทร.บางนา และผู้ปฏิบัติหน้าที่เวรไฟฟ้า - ประปา สพ.ทร.บางนา ประจำเดือน ต.ค.๖๙
          </p>
        </div>

        {/* Approval Signatures */}
        <div className="border-t border-slate-200 pt-3 text-[11px] space-y-2">
          <div className="flex justify-between items-center text-slate-600">
            <span>ว่าที่ ร.ต. ผธก.กผร.สพ.ทร.</span>
            <span>น.อ. รอง ผอ.กผร.สพ.ทร. (๒๙ ก.ย. ๖๙)</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-md font-medium text-center">
            ✓ อนุมัติ (รับคำสั่ง จก.สพ.ทร.) — น.อ. ผอ.กผร.สพ.ทร. / หน.สพ.ทร.พื้นที่บางนา
          </div>
        </div>
      </div>

      {/* Rules Card */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-amber-900 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>ข้อกำหนดและระเบียบการปฏิบัติเวร</span>
        </div>

        <ul className="space-y-1.5 text-slate-700 list-disc list-inside text-[11px] leading-relaxed">
          {ORDER_DOCUMENT_INFO.rules.map((rule, idx) => (
            <li key={idx} className="pl-1">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      {/* Shift Swap Button & Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-blue-700" />
            <h3 className="text-xs font-bold text-slate-900">
              แบบฟอร์มขออนุมัติเปลี่ยนเวรฯ
            </h3>
          </div>
          <button
            onClick={() => setShowSwapForm(!showSwapForm)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            {showSwapForm ? 'ซ่อนฟอร์ม' : 'เปิดฟอร์ม'}
          </button>
        </div>

        {showSwapForm && (
          <form onSubmit={handleGenerateSwapMemo} className="space-y-3 pt-2 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                ประเภทหน้าที่
              </label>
              <select
                value={requesterRole}
                onChange={(e) => setRequesterRole(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="fire">นายทหารเวรดับเพลิง</option>
                <option value="utility">เวรไฟฟ้า - ประปา</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ผู้ขอสลับ (ยศ-ชื่อ)
                </label>
                <input
                  type="text"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  เวรเดิมวันที่
                </label>
                <select
                  value={origDay}
                  onChange={(e) => setOrigDay(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  {OCTOBER_2569_SCHEDULE.map(r => (
                    <option key={r.day} value={r.day}>
                      {r.day} ต.ค. 69
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ผู้เข้าเวรแทน (ยศ-ชื่อ)
                </label>
                <input
                  type="text"
                  value={substituteName}
                  onChange={(e) => setSubstituteName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  สลับกับวันที่
                </label>
                <select
                  value={subDay}
                  onChange={(e) => setSubDay(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  {OCTOBER_2569_SCHEDULE.map(r => (
                    <option key={r.day} value={r.day}>
                      {r.day} ต.ค. 69
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                เหตุผลความจำเป็น
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="เช่น ติดภารกิจราชการฝึกอบรม, มีราชการเร่งด่วน"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>สร้างข้อความบันทึกขอเปลี่ยนเวร</span>
            </button>
          </form>
        )}

        {/* Generated memo output */}
        {generatedMemo && (
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">ร่างบันทึกข้อความขอเปลี่ยนเวร:</span>
              <button
                onClick={handleCopyGenerated}
                className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
              >
                {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMemo ? 'คัดลอกแล้ว' : 'คัดลอกข้อความ'}</span>
              </button>
            </div>
            <pre className="text-[11px] text-slate-700 whitespace-pre-wrap font-sans bg-white p-2.5 rounded border border-slate-200">
              {generatedMemo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
