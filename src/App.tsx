/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { AppSheetHeader } from './components/AppSheetHeader';
import { AppSheetTabBar } from './components/AppSheetTabBar';
import { TodayDutyView } from './components/TodayDutyView';
import { LineShareView } from './components/LineShareView';
import { MonthlyRosterView } from './components/MonthlyRosterView';
import { EmergencyDirectoryView } from './components/EmergencyDirectoryView';
import { IncidentLogView } from './components/IncidentLogView';
import { OfficialOrderView } from './components/OfficialOrderView';
import { DetailModal } from './components/DetailModal';
import { EditDailyDutyModal, EditEmergencyContactModal } from './components/EditPhoneModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { 
  OCTOBER_2569_SCHEDULE, 
  EMERGENCY_CONTACTS, 
  DailyDutyRecord, 
  DutyOfficer, 
  EmergencyContact, 
  formatPhoneNumber,
  getDefaultScheduleForMonth,
  AVAILABLE_MONTHS 
} from './data/dutyData';
import { AppSheetTab } from './types';
import { Wifi, Battery, Signal, Check } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppSheetTab>('today');
  // Active month: defaults to October 2569
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>('2569-10');
  // Default to day 26 (26 ตุลาคม 2569) as specifically requested
  const [selectedDay, setSelectedDay] = useState<number>(26);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Modals state
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<DailyDutyRecord | null>(null);
  const [editingDutyRecord, setEditingDutyRecord] = useState<DailyDutyRecord | null>(null);
  const [editingEmergencyContact, setEditingEmergencyContact] = useState<EmergencyContact | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // Persisted customizations from localStorage per month
  const [customScheduleByMonth, setCustomScheduleByMonth] = useState<Record<string, Record<number, { fireDuty: DutyOfficer; utilityDuty: DutyOfficer }>>>(() => {
    try {
      const saved = localStorage.getItem('bangna_custom_schedule_by_month');
      if (saved) return JSON.parse(saved);
      // Fallback/migration from previous single-month key
      const legacy = localStorage.getItem('bangna_custom_schedule');
      if (legacy) return { '2569-10': JSON.parse(legacy) };
      return {};
    } catch (e) {
      return {};
    }
  });

  const [customEmergencyMap, setCustomEmergencyMap] = useState<Record<string, { phone: string; name?: string }>>(() => {
    try {
      const saved = localStorage.getItem('bangna_custom_emergency');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Save customizations whenever they change
  useEffect(() => {
    localStorage.setItem('bangna_custom_schedule_by_month', JSON.stringify(customScheduleByMonth));
  }, [customScheduleByMonth]);

  useEffect(() => {
    localStorage.setItem('bangna_custom_emergency', JSON.stringify(customEmergencyMap));
  }, [customEmergencyMap]);

  // Handle switching months
  const handleSelectMonth = (newMonthKey: string) => {
    setSelectedMonthKey(newMonthKey);
    const monthObj = AVAILABLE_MONTHS.find(m => m.key === newMonthKey);
    const totalDays = monthObj?.totalDays || 30;
    
    // If switching to November, default to Day 1, or clamp existing day
    if (newMonthKey === '2569-11') {
      setSelectedDay(1);
    } else if (newMonthKey === '2569-10') {
      setSelectedDay(26);
    } else {
      setSelectedDay(prev => (prev > totalDays ? 1 : prev));
    }

    setSyncToast(`สลับไปดูข้อมูลเดือน ${monthObj?.name || newMonthKey} แล้ว`);
    setTimeout(() => setSyncToast(null), 2500);
  };

  // Current month's custom schedule map
  const currentMonthCustomMap = useMemo(() => {
    return customScheduleByMonth[selectedMonthKey] || {};
  }, [customScheduleByMonth, selectedMonthKey]);

  // Merge default schedule of the selected month with customizations
  const activeSchedule = useMemo(() => {
    const defaultRoster = getDefaultScheduleForMonth(selectedMonthKey);
    return defaultRoster.map(r => {
      const custom = currentMonthCustomMap[r.day];
      if (custom) {
        return {
          ...r,
          fireDuty: { ...r.fireDuty, ...custom.fireDuty },
          utilityDuty: { ...r.utilityDuty, ...custom.utilityDuty },
        };
      }
      return r;
    });
  }, [selectedMonthKey, currentMonthCustomMap]);

  // Merge default emergency contacts with customizations
  const activeEmergencyContacts = useMemo(() => {
    return EMERGENCY_CONTACTS.map(c => {
      const custom = customEmergencyMap[c.id];
      if (custom) {
        return {
          ...c,
          phone: custom.phone,
          formattedPhone: custom.phone.length === 5 ? `โทรภายใน ${custom.phone}` : formatPhoneNumber(custom.phone),
          name: custom.name || c.name,
        };
      }
      return c;
    });
  }, [customEmergencyMap]);

  // Get current record based on selectedDay
  const currentRecord = useMemo(() => {
    return activeSchedule.find(r => r.day === selectedDay) || activeSchedule[25];
  }, [selectedDay, activeSchedule]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSyncToast('ซิงค์ข้อมูลตารางเวรล่าสุดเรียบร้อย');
      setTimeout(() => setSyncToast(null), 2500);
    }, 600);
  };

  const handleOpenOrderModal = () => {
    setCurrentTab('order');
  };

  // Handlers for updating duty phone numbers & officers
  const handleSaveDailyDuty = (day: number, fireDuty: DutyOfficer, utilityDuty: DutyOfficer) => {
    setCustomScheduleByMonth(prev => ({
      ...prev,
      [selectedMonthKey]: {
        ...(prev[selectedMonthKey] || {}),
        [day]: { fireDuty, utilityDuty },
      },
    }));
    const monthObj = AVAILABLE_MONTHS.find(m => m.key === selectedMonthKey);
    setSyncToast(`บันทึกการแก้ไขเบอร์เวรประจำวันที่ ${day} ${monthObj?.shortName || ''} เรียบร้อย`);
    setTimeout(() => setSyncToast(null), 2500);
  };

  const handleResetDailyDuty = (day: number) => {
    setCustomScheduleByMonth(prev => {
      const monthMap = { ...(prev[selectedMonthKey] || {}) };
      delete monthMap[day];
      return {
        ...prev,
        [selectedMonthKey]: monthMap,
      };
    });
    setSyncToast(`คืนค่าเริ่มต้นเวรประจำวันที่ ${day} เรียบร้อย`);
    setTimeout(() => setSyncToast(null), 2500);
  };

  // Handlers for updating emergency contacts
  const handleSaveEmergencyContact = (id: string, phone: string, name?: string) => {
    setCustomEmergencyMap(prev => ({
      ...prev,
      [id]: { phone, name },
    }));
    setSyncToast('บันทึกการแก้ไขเบอร์โทรศัพท์ฉุกเฉินเรียบร้อย');
    setTimeout(() => setSyncToast(null), 2500);
  };

  const handleResetEmergencyContact = (id: string) => {
    setCustomEmergencyMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSyncToast('คืนค่าเริ่มต้นเบอร์ติดต่อเรียบร้อย');
    setTimeout(() => setSyncToast(null), 2500);
  };

  const handleResetAllEmergency = () => {
    if (confirm('ยืนยันคืนค่าเริ่มต้นเบอร์โทรศัพท์ฉุกเฉินทั้งหมด?')) {
      setCustomEmergencyMap({});
      setSyncToast('คืนค่าเริ่มต้นเบอร์ติดต่อทั้งหมดเรียบร้อย');
      setTimeout(() => setSyncToast(null), 2500);
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'today':
        return (
          <TodayDutyView
            currentRecord={currentRecord}
            allRecords={activeSchedule}
            onSelectDay={setSelectedDay}
            onOpenOrderModal={handleOpenOrderModal}
            onGoToLineTab={() => setCurrentTab('line')}
            onOpenEditDutyModal={(rec) => setEditingDutyRecord(rec)}
            onOpenEditEmergencyModal={(contact) => setEditingEmergencyContact(contact)}
            emergencyContacts={activeEmergencyContacts}
            isDayCustomized={!!currentMonthCustomMap[currentRecord.day]}
          />
        );
      case 'line':
        return (
          <LineShareView
            currentRecord={currentRecord}
            allRecords={activeSchedule}
            onSelectDay={setSelectedDay}
            emergencyContacts={activeEmergencyContacts}
            onOpenEditDutyModal={(rec) => setEditingDutyRecord(rec)}
          />
        );
      case 'roster':
        return (
          <MonthlyRosterView
            records={activeSchedule}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            onOpenDetailModal={(rec) => setSelectedRecordForDetail(rec)}
          />
        );
      case 'emergency':
        return (
          <EmergencyDirectoryView 
            emergencyContacts={activeEmergencyContacts}
            onEditContact={(contact) => setEditingEmergencyContact(contact)}
            onResetAll={handleResetAllEmergency}
          />
        );
      case 'incident':
        return <IncidentLogView />;
      case 'order':
        return <OfficialOrderView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/90 text-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 font-sans">
      {/* Container wrapper */}
      <div 
        className={`w-full transition-all duration-300 ${
          isMobileDeviceView 
            ? 'max-w-[430px] sm:shadow-2xl sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 sm:overflow-hidden bg-slate-100 flex flex-col min-h-screen sm:min-h-[844px] sm:max-h-[90vh]'
            : 'max-w-4xl bg-slate-100 shadow-xl rounded-none sm:rounded-2xl overflow-hidden min-h-screen flex flex-col'
        }`}
      >
        {/* Mobile Device Status Bar simulation (only visible on mobile mockup mode) */}
        {isMobileDeviceView && (
          <div className="bg-slate-950 text-slate-300 px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-medium tracking-tight select-none">
            <span className="font-semibold text-white">09:41</span>
            {/* Dynamic Island / Speaker notch simulation */}
            <div className="w-20 h-4 bg-slate-900 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* AppSheet Header */}
        <AppSheetHeader
          currentTab={currentTab}
          isMobileDeviceView={isMobileDeviceView}
          setIsMobileDeviceView={setIsMobileDeviceView}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          selectedDay={selectedDay}
          onOpenGuideModal={() => setIsGuideModalOpen(true)}
          selectedMonthKey={selectedMonthKey}
          onSelectMonth={handleSelectMonth}
        />

        {/* Sync Toast Notification */}
        {syncToast && (
          <div className="bg-blue-600 text-white text-xs px-4 py-2 flex items-center justify-center gap-1.5 animate-in slide-in-from-top duration-200 shadow-md z-40">
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-medium">{syncToast}</span>
          </div>
        )}

        {/* Main Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-slate-100 relative">
          {renderTabContent()}
        </main>

        {/* AppSheet Bottom Navigation Tab Bar */}
        <AppSheetTabBar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          unreadIncidentCount={3}
        />
      </div>

      {/* Detail Inspection Modal for any day */}
      <DetailModal
        record={selectedRecordForDetail}
        onClose={() => setSelectedRecordForDetail(null)}
        onSelectAsActive={(day) => {
          setSelectedDay(day);
          setCurrentTab('today');
        }}
        onOpenEdit={(rec) => setEditingDutyRecord(rec)}
      />

      {/* Edit Duty Officer & Numbers Modal */}
      {editingDutyRecord && (
        <EditDailyDutyModal
          isOpen={!!editingDutyRecord}
          record={editingDutyRecord}
          onClose={() => setEditingDutyRecord(null)}
          onSave={handleSaveDailyDuty}
          onResetDay={handleResetDailyDuty}
          isCustomized={!!currentMonthCustomMap[editingDutyRecord.day]}
        />
      )}

      {/* Edit Emergency Contact Modal */}
      {editingEmergencyContact && (
        <EditEmergencyContactModal
          isOpen={!!editingEmergencyContact}
          contact={editingEmergencyContact}
          onClose={() => setEditingEmergencyContact(null)}
          onSave={handleSaveEmergencyContact}
          onReset={handleResetEmergencyContact}
        />
      )}

      {/* Guide & Sharing Modal */}
      <InstallGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
