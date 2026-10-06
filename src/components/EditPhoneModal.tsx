import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Phone, User, Zap, Flame, ShieldAlert, Check } from 'lucide-react';
import { DailyDutyRecord, DutyOfficer, EmergencyContact } from '../data/dutyData';

interface EditDailyDutyModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DailyDutyRecord;
  onSave: (day: number, fireDuty: DutyOfficer, utilityDuty: DutyOfficer) => void;
  onResetDay: (day: number) => void;
  isCustomized?: boolean;
}

export const EditDailyDutyModal: React.FC<EditDailyDutyModalProps> = ({
  isOpen,
  onClose,
  record,
  onSave,
  onResetDay,
  isCustomized,
}) => {
  const [fireRank, setFireRank] = useState(record.fireDuty.rank);
  const [fireName, setFireName] = useState(record.fireDuty.name);
  const [firePhone, setFirePhone] = useState(record.fireDuty.phone);

  const [utilityRank, setUtilityRank] = useState(record.utilityDuty.rank);
  const [utilityName, setUtilityName] = useState(record.utilityDuty.name);
  const [utilityPhone, setUtilityPhone] = useState(record.utilityDuty.phone);
  const [utilitySecondaryPhone, setUtilitySecondaryPhone] = useState(record.utilityDuty.secondaryPhone || '');
  const [utilityExt, setUtilityExt] = useState(record.utilityDuty.ext || '52222');

  useEffect(() => {
    setFireRank(record.fireDuty.rank);
    setFireName(record.fireDuty.name);
    setFirePhone(record.fireDuty.phone);

    setUtilityRank(record.utilityDuty.rank);
    setUtilityName(record.utilityDuty.name);
    setUtilityPhone(record.utilityDuty.phone);
    setUtilitySecondaryPhone(record.utilityDuty.secondaryPhone || '');
    setUtilityExt(record.utilityDuty.ext || '52222');
  }, [record]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      record.day,
      {
        rank: fireRank.trim(),
        name: fireName.trim(),
        phone: firePhone.trim(),
      },
      {
        rank: utilityRank.trim(),
        name: utilityName.trim(),
        phone: utilityPhone.trim(),
        secondaryPhone: utilitySecondaryPhone.trim() || undefined,
        ext: utilityExt.trim() || '52222',
      }
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                แก้ไขเบอร์โทร & รายชื่อเวร
              </h3>
              {isCustomized && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  มีข้อมูลที่แก้ไขแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              วัน{record.dayOfWeek} ที่ {record.day} ตุลาคม 2569
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Fire Officer Section */}
          <div className="bg-red-50/50 border border-red-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center gap-1.5 text-red-700 text-xs font-bold uppercase">
              <Flame className="w-4 h-4" />
              <span>นายทหารเวรดับเพลิง</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ยศ
                </label>
                <input
                  type="text"
                  value={fireRank}
                  onChange={(e) => setFireRank(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ชื่อ - สกุล
                </label>
                <input
                  type="text"
                  value={fireName}
                  onChange={(e) => setFireName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                เบอร์โทรศัพท์เคลื่อนที่
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-red-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={firePhone}
                  onChange={(e) => setFirePhone(e.target.value)}
                  placeholder="เช่น 0625059654"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Utility Officer Section */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase">
              <Zap className="w-4 h-4" />
              <span>เวรไฟฟ้า - ประปา</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ยศ
                </label>
                <input
                  type="text"
                  value={utilityRank}
                  onChange={(e) => setUtilityRank(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  ชื่อ - สกุล
                </label>
                <input
                  type="text"
                  value={utilityName}
                  onChange={(e) => setUtilityName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  เบอร์โทรเคลื่อนที่ (หลัก)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-blue-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={utilityPhone}
                    onChange={(e) => setUtilityPhone(e.target.value)}
                    placeholder="เช่น 0821727782"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  เบอร์โทรเคลื่อนที่ (สำรอง - ถ้ามี)
                </label>
                <input
                  type="tel"
                  value={utilitySecondaryPhone}
                  onChange={(e) => setUtilitySecondaryPhone(e.target.value)}
                  placeholder="เช่น 0969233842"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                เบอร์ภายใน
              </label>
              <input
                type="text"
                value={utilityExt}
                onChange={(e) => setUtilityExt(e.target.value)}
                placeholder="52222"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onResetDay(record.day);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>คืนค่าเดิม</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกการแก้ไข</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for editing emergency contacts
interface EditEmergencyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: EmergencyContact | null;
  onSave: (id: string, updatedPhone: string, updatedName?: string) => void;
  onReset: (id: string) => void;
}

export const EditEmergencyContactModal: React.FC<EditEmergencyContactModalProps> = ({
  isOpen,
  onClose,
  contact,
  onSave,
  onReset,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
    }
  }, [contact]);

  if (!isOpen || !contact) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(contact.id, phone.trim(), name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold">แก้ไขเบอร์ฉุกเฉิน / ประสานงาน</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              ชื่อหน่วยงาน / รายการ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              เบอร์โทรศัพท์ (กดโทรได้)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="เช่น 08-6067-777 หรือ 52344"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              สามารถกรอกเบอร์โทรศัพท์ปกติ หรือเบอร์สายใน 5 หลักได้
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onReset(contact.id);
                onClose();
              }}
              className="py-2 px-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>คืนค่าเดิม</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 border border-slate-300 rounded-lg text-slate-700"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800"
              >
                บันทึก
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
