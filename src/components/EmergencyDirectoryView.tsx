import React, { useState, useMemo } from 'react';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  Search, 
  Hospital, 
  ShieldAlert, 
  Zap, 
  Truck, 
  Users, 
  Flame, 
  Building2,
  PhoneForwarded,
  Info,
  Pencil,
  RotateCcw
} from 'lucide-react';
import { EMERGENCY_CONTACTS, SPARE_OFFICERS, formatPhoneNumber, EmergencyContact } from '../data/dutyData';

interface EmergencyDirectoryViewProps {
  emergencyContacts?: EmergencyContact[];
  onEditContact?: (contact: EmergencyContact) => void;
  onResetAll?: () => void;
}

export const EmergencyDirectoryView: React.FC<EmergencyDirectoryViewProps> = ({
  emergencyContacts = EMERGENCY_CONTACTS,
  onEditContact,
  onResetAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'emergency' | 'internal' | 'support' | 'spare_fire' | 'spare_util'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filter emergency contacts
  const filteredEmergencyContacts = useMemo(() => {
    return emergencyContacts.filter(c => {
      const q = searchTerm.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.formattedPhone.includes(q);

      if (!matchSearch) return false;

      if (categoryFilter === 'emergency') return c.isEmergencyAlert || c.category === 'medical';
      if (categoryFilter === 'internal') return c.category === 'internal';
      if (categoryFilter === 'support') return c.category === 'support' || c.category === 'utility';
      if (categoryFilter === 'spare_fire' || categoryFilter === 'spare_util') return false; // shown in separate section

      return true;
    });
  }, [searchTerm, categoryFilter, emergencyContacts]);

  // Filter spare fire officers
  const filteredSpareFire = useMemo(() => {
    if (categoryFilter !== 'all' && categoryFilter !== 'spare_fire') return [];
    return SPARE_OFFICERS.filter(s => s.role === 'fire').filter(s => {
      const q = searchTerm.trim().toLowerCase();
      return (
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.rank.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    });
  }, [searchTerm, categoryFilter]);

  // Filter spare utility officers
  const filteredSpareUtility = useMemo(() => {
    if (categoryFilter !== 'all' && categoryFilter !== 'spare_util') return [];
    return SPARE_OFFICERS.filter(s => s.role === 'utility').filter(s => {
      const q = searchTerm.trim().toLowerCase();
      return (
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.rank.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-lg mx-auto pb-14">
      {/* Header */}
      <div>
        <h2 className="text-sm font-bold text-slate-900">สมุดโทรศัพท์ & สายด่วนฉุกเฉิน</h2>
        <p className="text-[11px] text-slate-500">
          เบอร์โทรศัพท์สำคัญ สพ.ทร.บางนา และหน่วยงานสนับสนุนภายนอก
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาชื่อหน่วยงาน, เบอร์โทรศัพท์, หรือชื่อนายทหาร..."
          className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-2xs"
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

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar text-xs">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'all'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => setCategoryFilter('emergency')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'emergency'
              ? 'bg-red-700 text-white shadow-2xs'
              : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
          }`}
        >
          🚨 ฉุกเฉิน/ร.พ.
        </button>
        <button
          onClick={() => setCategoryFilter('internal')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'internal'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ภายใน สพ.ทร.
        </button>
        <button
          onClick={() => setCategoryFilter('support')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'support'
              ? 'bg-blue-900 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          หน่วยสนับสนุน
        </button>
        <button
          onClick={() => setCategoryFilter('spare_fire')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'spare_fire'
              ? 'bg-orange-600 text-white shadow-2xs'
              : 'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100'
          }`}
        >
          อะไหล่ดับเพลิง
        </button>
        <button
          onClick={() => setCategoryFilter('spare_util')}
          className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition-colors ${
            categoryFilter === 'spare_util'
              ? 'bg-cyan-700 text-white shadow-2xs'
              : 'bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100'
          }`}
        >
          อะไหล่ไฟฟ้า-ประปา
        </button>
      </div>

      {/* Highlight Top Emergency Card */}
      {(categoryFilter === 'all' || categoryFilter === 'emergency') && (
        <div className="bg-red-600 text-white rounded-xl p-3.5 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Hospital className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-100">
                  กรุณาแจ้งป่วยฉุกเฉิน
                </span>
                <h3 className="text-sm font-bold">นายทหารเวร ร.พ.กรุงเทพฯ(บางนา)</h3>
              </div>
            </div>
            <span className="text-[10px] bg-white text-red-700 font-bold px-2 py-0.5 rounded-full">
              24 ชั่วโมง
            </span>
          </div>

          <div className="bg-white/10 rounded-lg p-2.5 flex items-center justify-between backdrop-blur-xs">
            <div>
              <div className="text-[11px] text-red-100">เบอร์โทรศัพท์ตรง</div>
              <div className="text-lg font-bold font-mono tracking-widest">08-6067-777</div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="tel:0860677770"
                className="px-3.5 py-2 bg-white hover:bg-red-50 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>โทรด่วน</span>
              </a>
              <button
                onClick={() => handleCopy('08-6067-777', 'hosp-top')}
                className="p-2 text-white hover:bg-white/20 rounded-lg border border-white/30"
                title="คัดลอกเบอร์"
              >
                {copiedId === 'hosp-top' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Contact List */}
      {filteredEmergencyContacts.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
            เบอร์ประสานงานประจำ สพ.ทร.บางนา และหน่วยภายนอก
          </span>

          <div className="space-y-2">
            {filteredEmergencyContacts.map((contact) => {
              const isInternal = contact.ext || contact.category === 'internal';

              return (
                <div
                  key={contact.id}
                  className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-xs transition-all flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {contact.name}
                      </h4>
                      {contact.isEmergencyAlert && (
                        <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                          ฉุกเฉิน
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {contact.department}
                    </div>
                    <div className="text-xs font-mono font-bold text-blue-900 mt-1">
                      {contact.formattedPhone}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>โทร</span>
                    </a>
                    <button
                      onClick={() => handleCopy(contact.phone, contact.id)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-200 hover:bg-slate-100"
                      title="คัดลอกเบอร์"
                    >
                      {copiedId === contact.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {onEditContact && (
                      <button
                        onClick={() => onEditContact(contact)}
                        className="p-1.5 text-slate-500 hover:text-blue-700 rounded-lg border border-slate-200 hover:bg-slate-100"
                        title="แก้ไขเบอร์นี้"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Spare Fire Officers Section (อะไหล่นายทหารเวรดับเพลิง) */}
      {filteredSpareFire.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                อะไหล่นายทหารเวรดับเพลิง (5 ลำดับ)
              </span>
            </div>
            <span className="text-[10px] text-slate-500">แทนเฉพาะ ป่วยใน/เลื่อนยศ/ปลด/ย้าย</span>
          </div>

          <div className="space-y-1.5">
            {filteredSpareFire.map((officer, index) => (
              <div
                key={officer.id}
                className="bg-white rounded-lg border border-orange-100 p-2.5 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-900 px-1.5 py-0.2 rounded font-mono">
                      ลำดับ {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {officer.rank} {officer.name}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                    โทร: {formatPhoneNumber(officer.phone)}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`tel:${officer.phone}`}
                    className="p-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs font-medium"
                    title={`โทร ${officer.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(officer.phone, `fire-${officer.id}`)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md border border-slate-200"
                    title="คัดลอกเบอร์"
                  >
                    {copiedId === `fire-${officer.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spare Utility Officers Section (อะไหล่เวรไฟฟ้า-ประปา) */}
      {filteredSpareUtility.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                อะไหล่เวรไฟฟ้า - ประปา (3 ลำดับ)
              </span>
            </div>
            <span className="text-[10px] text-slate-500">แทนเฉพาะ ป่วยใน/เลื่อนยศ/ปลด/ย้าย</span>
          </div>

          <div className="space-y-1.5">
            {filteredSpareUtility.map((officer, index) => (
              <div
                key={officer.id}
                className="bg-white rounded-lg border border-cyan-100 p-2.5 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold bg-cyan-100 text-cyan-900 px-1.5 py-0.2 rounded font-mono">
                      ลำดับ {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {officer.rank} {officer.name}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                    โทร: {formatPhoneNumber(officer.phone)}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`tel:${officer.phone}`}
                    className="p-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md text-xs font-medium"
                    title={`โทร ${officer.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(officer.phone, `util-${officer.id}`)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md border border-slate-200"
                    title="คัดลอกเบอร์"
                  >
                    {copiedId === `util-${officer.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note about shift replacement rule */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-800">ระเบียบการเรียกใช้อะไหล่เวร:</p>
          <p>
            ตามคำสั่ง กผร.สพ.ทร. อะไหล่จะเข้าปฏิบัติหน้าที่แทนเฉพาะกรณี
            <strong className="text-slate-900"> ผู้ป่วยใน, เลื่อนยศ, ปลด, หรือย้าย </strong>
            เท่านั้น หากติดราชการอื่น ให้ดำเนินการขอเปลี่ยนเวรเสนอต่อ กผร.สพ.ทร. ล่วงหน้า
          </p>
        </div>
      </div>
    </div>
  );
};
