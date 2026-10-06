export type AppSheetTab = 'today' | 'line' | 'roster' | 'emergency' | 'incident' | 'order';

export interface IncidentLog {
  id: string;
  timestamp: string;
  dateThai: string;
  timeString: string;
  reporterName: string;
  reporterRank: string;
  dutyType: 'fire' | 'utility' | 'security' | 'other';
  category: 'normal' | 'fire_hazard' | 'power_issue' | 'water_issue' | 'medical_emergency' | 'security';
  title: string;
  details: string;
  location: string;
  status: 'resolved' | 'in_progress' | 'pending';
}

export interface ShiftSwapRequest {
  id: string;
  requesterRank: string;
  requesterName: string;
  requesterDutyType: 'fire' | 'utility';
  originalDate: number; // day in Oct 2569
  substituteRank: string;
  substituteName: string;
  substituteDate: number; // day in Oct 2569
  reason: string;
  createdAt: string;
  status: 'draft' | 'submitted' | 'approved';
}

export interface SafetyCheckItem {
  id: string;
  label: string;
  area: string;
  checked: boolean;
  checkedAt?: string;
}
