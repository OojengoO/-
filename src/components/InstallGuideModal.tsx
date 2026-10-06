import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  HelpCircle,
  Apple,
  Send,
  Sparkles
} from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'share' | 'ios' | 'android' | 'workflow'>('share');

  if (!isOpen) return null;

  // Use the current URL or pre URL
  const appUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareToLine = () => {
    const text = `📱 ระบบตารางเวรและเบอร์ฉุกเฉิน สพ.ทร.บางนา (AppSheet Mobile)\nคลิกเปิดใช้งานบนมือถือได้ทันที:\n${appUrl}`;
    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(text)}`;
    window.location.href = lineUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold">วิธีนำแอปไปใช้งานบนมือถือ</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs shrink-0">
          <button
            onClick={() => setActivePlatform('share')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activePlatform === 'share'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            แชร์เข้า LINE
          </button>
          <button
            onClick={() => setActivePlatform('ios')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activePlatform === 'ios'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            iPhone (iOS)
          </button>
          <button
            onClick={() => setActivePlatform('android')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activePlatform === 'android'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Android
          </button>
          <button
            onClick={() => setActivePlatform('workflow')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activePlatform === 'workflow'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            ขั้นตอนใช้
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs text-slate-700">
          {/* TAB 1: Share Link */}
          {activePlatform === 'share' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span>ส่งลิงก์นี้เข้ากลุ่ม LINE ได้ทันที</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  ผู้ใช้งานทุกคน (ทหารเวร, กำลังพล, ผู้บังคับบัญชา) สามารถกดเปิดลิงก์บนมือถือและใช้งานได้ทันที <strong>ไม่ต้องดาวน์โหลดไฟล์ ไม่ต้องลงแอปเพิ่ม</strong>
                </p>
              </div>

              {/* Link Box */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600">
                  ลิงก์สำหรับเข้าใช้งานแอป:
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px] text-slate-800 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="py-2 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold flex items-center gap-1 shadow-2xs shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                  </button>
                </div>
              </div>

              {/* Direct share button */}
              <button
                onClick={handleShareToLine}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Share2 className="w-4 h-4 text-emerald-200" />
                <span>แชร์ลิงก์เข้า LINE กลุ่มเดี๋ยวนี้</span>
              </button>
            </div>
          )}

          {/* TAB 2: iOS Guide */}
          {activePlatform === 'ios' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 flex items-center gap-1">
                <span>วิธีทำเป็นไอคอนแอปบน iPhone (Safari)</span>
              </h4>

              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">เปิดลิงก์ในเบราว์เซอร์ Safari</span>
                    <p className="text-slate-500">นำลิงก์นี้เปิดใน Safari บน iPhone</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">แตะปุ่ม "แชร์" (Share)</span>
                    <p className="text-slate-500">ไอคอนสี่เหลี่ยมที่มีลูกศรชี้ขึ้น 📤 ด้านล่างหน้าจอ</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">เลือก "เพิ่มไปยังหน้าจอโฮม"</span>
                    <p className="text-slate-500">(Add to Home Screen) แล้วกด "เพิ่ม" (Add)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-[11px] text-blue-900">
                ✨ ผลลัพธ์: จะได้ไอคอนแอปบนหน้าจอมือถือ แตะเปิดใช้งานได้เต็มจอทันทีโดยไม่มีแถบเบราว์เซอร์
              </div>
            </div>
          )}

          {/* TAB 3: Android Guide */}
          {activePlatform === 'android' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 flex items-center gap-1">
                <span>วิธีติดตั้งเป็นแอปบน Android (Chrome)</span>
              </h4>

              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">เปิดลิงก์ในแอป Google Chrome</span>
                    <p className="text-slate-500">เปิดลิงก์นี้บนโทรศัพท์ Android</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">แตะจุดสามจุด (⋮) ด้านขวาบน</span>
                    <p className="text-slate-500">เพื่อเปิดเมนูตัวเลือกของ Chrome</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">เลือก "ติดตั้งแอป" หรือ "เพิ่มลงในหน้าจอหลัก"</span>
                    <p className="text-slate-500">(Install app / Add to Home screen)</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-[11px] text-emerald-900">
                ✨ ผลลัพธ์: ติดตั้งเป็นแอปบนมือถือทันที ใช้พื้นที่น้อยมาก เปิดใช้งานได้รวดเร็ว
              </div>
            </div>
          )}

          {/* TAB 4: Workflow */}
          {activePlatform === 'workflow' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">
                ขั้นตอนการใช้งานเวรประจำวัน (Workflow)
              </h4>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800">1. ส่งรายงานเวรช่วงเช้า / เปลี่ยนผลัด</span>
                  <p className="text-slate-600">
                    เปิดแอป → ไปแท็บ <strong>"ส่ง LINE"</strong> → แตะ <strong>"คัดลอกข้อความส่ง LINE กลุ่ม"</strong> → วางส่งเข้ากลุ่มไลน์หน่วยงาน
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800">2. กดโทรด่วนเมื่อมีเหตุขัดข้อง/ฉุกเฉิน</span>
                  <p className="text-slate-600">
                    แตะปุ่ม "โทรออก" นายทหารเวรดับเพลิง, เวรไฟฟ้า-ประปา (52222), หรือแจ้งป่วยฉุกเฉิน ร.พ.กรุงเทพฯ บางนา ได้ทันที
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800">3. ค้นหาตารางเวร & ขอสลับเวร</span>
                  <p className="text-slate-600">
                    แท็บ "ตารางเวร" ค้นหารายชื่อล่วงหน้าทั้ง 31 วัน และแท็บ "คำสั่งเวร" มีแบบฟอร์มร่างข้อความขออนุมัติเปลี่ยนเวรฯ
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
          >
            เข้าใจแล้ว / ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
