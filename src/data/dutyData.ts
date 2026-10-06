export interface DutyOfficer {
  rank: string;
  name: string;
  phone: string;
  secondaryPhone?: string;
  ext?: string;
}

export interface DailyDutyRecord {
  id: number;
  day: number;
  dayOfWeek: string;
  fullDateThai: string;
  shortDateThai: string;
  isWeekend: boolean;
  fireDuty: DutyOfficer;
  utilityDuty: DutyOfficer;
  notes?: string;
}

export interface SpareOfficer {
  id: number;
  rank: string;
  name: string;
  phone: string;
  role: 'fire' | 'utility';
  roleLabel: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  department: string;
  phone: string;
  formattedPhone: string;
  ext?: string;
  category: 'internal' | 'support' | 'medical' | 'utility';
  description: string;
  isEmergencyAlert?: boolean;
}

// Complete October 2569 (ต.ค. 2569) duty schedule based on official naval order
export const OCTOBER_2569_SCHEDULE: DailyDutyRecord[] = [
  {
    id: 1,
    day: 1,
    dayOfWeek: 'พฤหัสบดี',
    fullDateThai: 'พฤหัสบดีที่ 1 ตุลาคม 2569',
    shortDateThai: '1 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.อ.', name: 'สานิกร ศรีปฏิมากร', phone: '0816429336' },
    utilityDuty: { rank: 'จ.อ.', name: 'ณัฐพงศ์ เพิ่มอาภรณ์', phone: '0803840289', ext: '52222' },
  },
  {
    id: 2,
    day: 2,
    dayOfWeek: 'ศุกร์',
    fullDateThai: 'ศุกร์ที่ 2 ตุลาคม 2569',
    shortDateThai: '2 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.อ.', name: 'เชวง กลับแก้ว', phone: '0850945359' },
    utilityDuty: { rank: 'จ.อ.', name: 'อนุวัฒน์ เงินเปีย', phone: '0977314936', ext: '52222' },
  },
  {
    id: 3,
    day: 3,
    dayOfWeek: 'เสาร์',
    fullDateThai: 'เสาร์ที่ 3 ตุลาคม 2569',
    shortDateThai: '3 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.ท.', name: 'ศิริวุฒิ ทองโชติ', phone: '0941581564' },
    utilityDuty: { rank: 'จ.อ.', name: 'ประสิทธิ์ พวงขจร', phone: '0955351655', ext: '52222' },
  },
  {
    id: 4,
    day: 4,
    dayOfWeek: 'อาทิตย์',
    fullDateThai: 'อาทิตย์ที่ 4 ตุลาคม 2569',
    shortDateThai: '4 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.ท.', name: 'วิภากร บุญตะนัย', phone: '0841338091' },
    utilityDuty: { rank: 'พ.จ.ต.', name: 'สุรสิทธิ์ บุษบา', phone: '0821727782', secondaryPhone: '0969233842', ext: '52222' },
  },
  {
    id: 5,
    day: 5,
    dayOfWeek: 'จันทร์',
    fullDateThai: 'จันทร์ที่ 5 ตุลาคม 2569',
    shortDateThai: '5 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'วัฒนา แสงทรัพย์', phone: '0971363761' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'รุ่งเพ็ชร์ หงษ์ทอง', phone: '0964562975', ext: '52222' },
  },
  {
    id: 6,
    day: 6,
    dayOfWeek: 'อังคาร',
    fullDateThai: 'อังคารที่ 6 ตุลาคม 2569',
    shortDateThai: '6 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'อรรถพล กลิ่นเกษร', phone: '0897991322' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สุภกิจ รุ่งเจริญ', phone: '0805202289', ext: '52222' },
  },
  {
    id: 7,
    day: 7,
    dayOfWeek: 'พุธ',
    fullDateThai: 'พุธที่ 7 ตุลาคม 2569',
    shortDateThai: '7 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'นรุตม์ เพ็ชรเจริญ', phone: '0843877920' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'กิตติศักดิ์ หุ่นสม', phone: '0642239947', ext: '52222' },
  },
  {
    id: 8,
    day: 8,
    dayOfWeek: 'พฤหัสบดี',
    fullDateThai: 'พฤหัสบดีที่ 8 ตุลาคม 2569',
    shortDateThai: '8 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'กิตติพร พุฒแย้ม', phone: '0863643761' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'ศศิพงศ์ พงษ์ทิพย์พาที', phone: '0898172532', ext: '52222' },
  },
  {
    id: 9,
    day: 9,
    dayOfWeek: 'ศุกร์',
    fullDateThai: 'ศุกร์ที่ 9 ตุลาคม 2569',
    shortDateThai: '9 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'จิรเดช พันธเสน', phone: '0615436022' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สันติชัย สิงหาพันธุ์', phone: '0641860701', ext: '52222' },
  },
  {
    id: 10,
    day: 10,
    dayOfWeek: 'เสาร์',
    fullDateThai: 'เสาร์ที่ 10 ตุลาคม 2569',
    shortDateThai: '10 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'ธนะวัตติ์ ภูริวิวัฒน์สกุล', phone: '0895048260' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'เศรษฐพงศ์ ศรีกุไฟ', phone: '0843233061', ext: '52222' },
  },
  {
    id: 11,
    day: 11,
    dayOfWeek: 'อาทิตย์',
    fullDateThai: 'อาทิตย์ที่ 11 ตุลาคม 2569',
    shortDateThai: '11 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'สามารถ ภักดีโสภา', phone: '0885235515' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'ธงชัย สระบัว', phone: '0823148793', ext: '52222' },
  },
  {
    id: 12,
    day: 12,
    dayOfWeek: 'จันทร์',
    fullDateThai: 'จันทร์ที่ 12 ตุลาคม 2569',
    shortDateThai: '12 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ท.', name: 'กฤษณะ ประจักษ์จิตร', phone: '0968869953' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สุภชัย วาพันสุ', phone: '0909750865', ext: '52222' },
  },
  {
    id: 13,
    day: 13,
    dayOfWeek: 'อังคาร',
    fullDateThai: 'อังคารที่ 13 ตุลาคม 2569',
    shortDateThai: '13 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.ต.', name: 'วุฒิชัย แสงเปล่งปลั่ง', phone: '0872278548' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'วิวัฒน์ เริ่มยินดี', phone: '0905912705', ext: '52222' },
  },
  {
    id: 14,
    day: 14,
    dayOfWeek: 'พุธ',
    fullDateThai: 'พุธที่ 14 ตุลาคม 2569',
    shortDateThai: '14 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.ต.', name: 'ณรงค์ศักดิ์ ผ่านพินิจ', phone: '0959549109' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'กัณภพ เปลี่ยนสุนทร', phone: '0646049603', ext: '52222' },
  },
  {
    id: 15,
    day: 15,
    dayOfWeek: 'พฤหัสบดี',
    fullDateThai: 'พฤหัสบดีที่ 15 ตุลาคม 2569',
    shortDateThai: '15 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.ต.', name: 'ทนงศักดิ์ ชุ่มช่วง', phone: '0861029735' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'กาย สุขวิลลี่', phone: '0820847315', ext: '52222' },
  },
  {
    id: 16,
    day: 16,
    dayOfWeek: 'ศุกร์',
    fullDateThai: 'ศุกร์ที่ 16 ตุลาคม 2569',
    shortDateThai: '16 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.ต.', name: 'เรืองเดช มาจวง', phone: '0952727645' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'เอกภโมสร มาสำราญ', phone: '0821327545', ext: '52222' },
  },
  {
    id: 17,
    day: 17,
    dayOfWeek: 'เสาร์',
    fullDateThai: 'เสาร์ที่ 17 ตุลาคม 2569',
    shortDateThai: '17 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.ต.', name: 'อดุล ค้ำคูณ', phone: '0842798024' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'ศุภชัย ทำมาก้อม', phone: '0652099576', ext: '52222' },
  },
  {
    id: 18,
    day: 18,
    dayOfWeek: 'อาทิตย์',
    fullDateThai: 'อาทิตย์ที่ 18 ตุลาคม 2569',
    shortDateThai: '18 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ว่าที่ ร.ต.', name: 'อภิเชษฐ ศรีทอง', phone: '0842365276' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สิทธิกรณ์ เชื้อโคกสูง', phone: '0625262113', ext: '52222' },
  },
  {
    id: 19,
    day: 19,
    dayOfWeek: 'จันทร์',
    fullDateThai: 'จันทร์ที่ 19 ตุลาคม 2569',
    shortDateThai: '19 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ต.', name: 'วิโรจน์ สิทธิมงคล', phone: '0640576138' },
    utilityDuty: { rank: 'พ.จ.ท.', name: 'ปัญญา ปราบพาล', phone: '0952209399', ext: '52222' },
  },
  {
    id: 20,
    day: 20,
    dayOfWeek: 'อังคาร',
    fullDateThai: 'อังคารที่ 20 ตุลาคม 2569',
    shortDateThai: '20 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ต.', name: 'วัชรพัฒน์ ขุนศรีจันทร์', phone: '0639493645' },
    utilityDuty: { rank: 'พ.จ.ต.', name: 'อภิสิทธิ์ ส่องเจริญ', phone: '0808352729', ext: '52222' },
  },
  {
    id: 21,
    day: 21,
    dayOfWeek: 'พุธ',
    fullDateThai: 'พุธที่ 21 ตุลาคม 2569',
    shortDateThai: '21 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.ต.', name: 'เอกชัย ทรัพย์ทิพย์', phone: '0859188827' },
    utilityDuty: { rank: 'จ.อ.', name: 'พิทักษ์ มีศิลป์', phone: '0888687299', ext: '52222' },
  },
  {
    id: 22,
    day: 22,
    dayOfWeek: 'พฤหัสบดี',
    fullDateThai: 'พฤหัสบดีที่ 22 ตุลาคม 2569',
    shortDateThai: '22 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.อ.', name: 'ธนกฤต อัครเดชนนท์', phone: '0899642673' },
    utilityDuty: { rank: 'จ.อ.', name: 'สุรพงศ์ จันทึก', phone: '0612325453', ext: '52222' },
  },
  {
    id: 23,
    day: 23,
    dayOfWeek: 'ศุกร์',
    fullDateThai: 'ศุกร์ที่ 23 ตุลาคม 2569 (วันปิยมหาราช)',
    shortDateThai: '23 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.อ.', name: 'ธงชัย วิริยะ', phone: '0988210419' },
    utilityDuty: { rank: 'จ.อ.', name: 'ณัฐพงศ์ เพิ่มอาภรณ์', phone: '0803840289', ext: '52222' },
  },
  {
    id: 24,
    day: 24,
    dayOfWeek: 'เสาร์',
    fullDateThai: 'เสาร์ที่ 24 ตุลาคม 2569',
    shortDateThai: '24 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.อ.', name: 'วิเชียร ป้อมน้อย', phone: '0867055888' },
    utilityDuty: { rank: 'จ.อ.', name: 'อนุวัฒน์ เงินเปีย', phone: '0977314936', ext: '52222' },
  },
  {
    id: 25,
    day: 25,
    dayOfWeek: 'อาทิตย์',
    fullDateThai: 'อาทิตย์ที่ 25 ตุลาคม 2569',
    shortDateThai: '25 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.อ.', name: 'มานะ ช่อทองดี', phone: '0817064417' },
    utilityDuty: { rank: 'จ.อ.', name: 'ประสิทธิ์ พวงขจร', phone: '0955351655', ext: '52222' },
  },
  {
    id: 26,
    day: 26,
    dayOfWeek: 'จันทร์',
    fullDateThai: 'จันทร์ที่ 26 ตุลาคม 2569',
    shortDateThai: '26 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.อ.', name: 'สนธยา พึ่งเกษม', phone: '0625059654' },
    utilityDuty: {
      rank: 'พ.จ.ต.',
      name: 'สุรสิทธิ์ บุษบา',
      phone: '0821727782',
      secondaryPhone: '0969233842',
      ext: '52222',
    },
    notes: 'เวรประจำวันตามคำร้องขอพิเศษ ตรวจตราความปลอดภัยอาคารและหัวจ่ายน้ำดับเพลิง',
  },
  {
    id: 27,
    day: 27,
    dayOfWeek: 'อังคาร',
    fullDateThai: 'อังคารที่ 27 ตุลาคม 2569',
    shortDateThai: '27 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ร.อ.', name: 'มีชัย อันตะโก', phone: '0834036838' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'รุ่งเพ็ชร์ หงษ์ทอง', phone: '0964562975', ext: '52222' },
  },
  {
    id: 28,
    day: 28,
    dayOfWeek: 'พุธ',
    fullDateThai: 'พุธที่ 28 ตุลาคม 2569',
    shortDateThai: '28 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.อ.', name: 'สัมฤทธิ์ ปั้นบุญชู', phone: '0819364330' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สุภกิจ รุ่งเจริญ', phone: '0805202289', ext: '52222' },
  },
  {
    id: 29,
    day: 29,
    dayOfWeek: 'พฤหัสบดี',
    fullDateThai: 'พฤหัสบดีที่ 29 ตุลาคม 2569',
    shortDateThai: '29 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.อ.', name: 'สานิกร ศรีปฏิมากร', phone: '0816429336' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'กิตติศักดิ์ หุ่นสม', phone: '0642239947', ext: '52222' },
  },
  {
    id: 30,
    day: 30,
    dayOfWeek: 'ศุกร์',
    fullDateThai: 'ศุกร์ที่ 30 ตุลาคม 2569',
    shortDateThai: '30 ต.ค. 69',
    isWeekend: false,
    fireDuty: { rank: 'ว่าที่ ร.อ.', name: 'เชวง กลับแก้ว', phone: '0850945359' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'ศศิพงศ์ พงษ์ทิพย์พาที', phone: '0898172532', ext: '52222' },
  },
  {
    id: 31,
    day: 31,
    dayOfWeek: 'เสาร์',
    fullDateThai: 'เสาร์ที่ 31 ตุลาคม 2569',
    shortDateThai: '31 ต.ค. 69',
    isWeekend: true,
    fireDuty: { rank: 'ร.ท.', name: 'ศิริวุฒิ ทองโชติ', phone: '0941581564' },
    utilityDuty: { rank: 'พ.จ.อ.', name: 'สันติชัย สิงหาพันธุ์', phone: '0641860701', ext: '52222' },
  },
];

// อะไหล่นายทหารเวร (Standby / Replacement Officers)
export const SPARE_OFFICERS: SpareOfficer[] = [
  // อะไหล่ นายทหารเวรดับเพลิง
  { id: 101, rank: 'ร.ท.', name: 'ศิริชัย อรุณสุข', phone: '0812345678', role: 'fire', roleLabel: 'อะไหล่เวรดับเพลิง ลำดับ 1' },
  { id: 102, rank: 'ร.ท.', name: 'วิภากร บุญตะนัย', phone: '0841338091', role: 'fire', roleLabel: 'อะไหล่เวรดับเพลิง ลำดับ 2' },
  { id: 103, rank: 'ว่าที่ ร.ท.', name: 'กิตติพร พุฒแย้ม', phone: '0863643761', role: 'fire', roleLabel: 'อะไหล่เวรดับเพลิง ลำดับ 3' },
  { id: 104, rank: 'ว่าที่ ร.ท.', name: 'จิรเดช พันธเสน', phone: '0615436022', role: 'fire', roleLabel: 'อะไหล่เวรดับเพลิง ลำดับ 4' },
  { id: 105, rank: 'ว่าที่ ร.ท.', name: 'ธนะวัตติ์ ภูริวิวัฒน์สกุล', phone: '0895048260', role: 'fire', roleLabel: 'อะไหล่เวรดับเพลิง ลำดับ 5' },
  // อะไหล่ เวรไฟฟ้า - ประปา
  { id: 201, rank: 'พ.จ.อ.', name: 'เศรษฐพงศ์ ศรีกุไฟ', phone: '0843233061', role: 'utility', roleLabel: 'อะไหล่เวรไฟฟ้า-ประปา ลำดับ 1' },
  { id: 202, rank: 'พ.จ.อ.', name: 'ธงชัย สระบัว', phone: '0823148793', role: 'utility', roleLabel: 'อะไหล่เวรไฟฟ้า-ประปา ลำดับ 2' },
  { id: 203, rank: 'พ.จ.อ.', name: 'สุภชัย วาพันสุ', phone: '0909750865', role: 'utility', roleLabel: 'อะไหล่เวรไฟฟ้า-ประปา ลำดับ 3' },
];

// เบอร์โทรศัพท์สำคัญ & ฉุกเฉิน
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'hospital-bangna',
    name: 'นายทหารเวร ร.พ.กรุงเทพฯ (บางนา)',
    department: 'บริการการแพทย์ฉุกเฉิน / กรุณาแจ้งป่วย',
    phone: '0860677770',
    formattedPhone: '08-6067-777',
    category: 'medical',
    description: 'เบอร์ฉุกเฉินสำหรับกำลังพลแจ้งป่วย นำส่งโรงพยาบาลตลอด 24 ชั่วโมง',
    isEmergencyAlert: true,
  },
  {
    id: 'fire-duty-today',
    name: 'นายทหารเวรดับเพลิง (ร.อ.สนธยา พึ่งเกษม)',
    department: 'เวรประจำวัน จันทร์ที่ 26 ต.ค. 69',
    phone: '0625059654',
    formattedPhone: '062-505-9654',
    category: 'internal',
    description: 'ควบคุมดูแล ป้องกันอัคคีภัย สพ.ทร.บางนา 24 ชม.',
    isEmergencyAlert: true,
  },
  {
    id: 'utility-duty-today',
    name: 'เวรไฟฟ้า - ประปา (พ.จ.ต.สุรสิทธิ์ บุษบา)',
    department: 'เวรประจำวัน จันทร์ที่ 26 ต.ค. 69',
    phone: '0821727782',
    formattedPhone: '082-172-7782 / 096-923-3842',
    ext: '52222',
    category: 'internal',
    description: 'แก้ไขเหตุขัดข้องระบบไฟฟ้าและประปา สพ.ทร.บางนา (โทรภายใน 52222)',
  },
  {
    id: 'utility-ext',
    name: 'เวรไฟฟ้า - ประปา (เบอร์ภายใน)',
    department: 'สพ.ทร.บางนา',
    phone: '52222',
    formattedPhone: '52222 (โทรภายใน)',
    ext: '52222',
    category: 'internal',
    description: 'ศูนย์ควบคุมและรับแจ้งเหตุระบบไฟฟ้าและประปาขัดข้อง',
  },
  {
    id: 'security-guard',
    name: 'น.เวรกองรปภฯ สพ.ทร.',
    department: 'กองรักษาความปลอดภัย สพ.ทร.บางนา',
    phone: '52344',
    formattedPhone: '52344 (โทรภายใน)',
    ext: '52344',
    category: 'internal',
    description: 'นายทหารเวรกองรักษาความปลอดภัย ดูแลจุดตรวจทางเข้าออกและพื้นที่รอบค่าย',
  },
  {
    id: 'transport-div',
    name: 'เวรมว.ขนส่งฯ สพ.ทร.',
    department: 'หมวดขนส่ง สพ.ทร.บางนา',
    phone: '52205',
    formattedPhone: '52205 (โทรภายใน)',
    ext: '52205',
    category: 'internal',
    description: 'เวรหมวดขนส่ง ขอรับการสนับสนุนรถยนต์และยานพาหนะราชการ',
  },
  {
    id: 'transport-riverine',
    name: 'ขนส่ง กลน.กร.',
    department: 'กองเรือลำน้ำ กองเรือยุทธการ',
    phone: '024752491',
    formattedPhone: '0 2475 2491',
    category: 'support',
    description: 'ประสานงานขนส่งทางน้ำและยานยนต์สนับสนุนราชการทหารเรือ',
  },
  {
    id: 'mea-electric',
    name: 'การไฟฟ้านครหลวง (สาขาบางนา)',
    department: 'การไฟฟ้าฯ รับแจ้งเหตุไฟฟ้าดับ/ฉุกเฉิน',
    phone: '027693333',
    formattedPhone: '02-769-3333',
    category: 'utility',
    description: 'แจ้งเหตุไฟฟ้าดับ หม้อแปลงระเบิด สายไฟขาดในพื้นที่บางนา',
  },
  {
    id: 'admin-dept',
    name: 'กองแผนและโครงการ (กผร.สพ.ทร.)',
    department: 'ส่วนราชการ กผร.สพ.ทร.',
    phone: '52216',
    formattedPhone: '52216 (โทรภายใน)',
    ext: '52216',
    category: 'internal',
    description: 'หน่วยงานธุรการจัดทำคำสั่งตารางเวรและการขออนุมัติเปลี่ยนเวรฯ',
  },
  {
    id: 'navy-call-center',
    name: 'สายด่วนกู้ชีพ/ศูนย์ปฏิบัติการ ทร.',
    department: 'กองทัพเรือ',
    phone: '1696',
    formattedPhone: '1696 (สายด่วน ทร.)',
    category: 'support',
    description: 'ศูนย์แจ้งเหตุฉุกเฉินและช่วยเหลือผู้ประสบภัยกองทัพเรือ',
  },
];

// ข้อมูลหนังสือคำสั่ง
export const ORDER_DOCUMENT_INFO = {
  memoNumber: 'ที่ กห 0423.4 / 334',
  date: 'วันที่ 29 ก.ย. 69',
  department: 'ส่วนราชการ กผร.สพ.ทร. (โทร. 52216)',
  subject: 'ขออนุมัติแต่งตั้งผู้ปฏิบัติหน้าที่นายทหารเวรดับเพลิงและผู้ปฏิบัติหน้าที่เวรไฟฟ้า - ประปา สพ.ทร.บางนา',
  period: 'ประจำเดือน ตุลาคม 2569 (ต.ค. 69)',
  approver: 'น.อ. ผอ.กผร.สพ.ทร. / หน.สพ.ทร.พื้นที่บางนา (รับคำสั่ง จก.สพ.ทร.)',
  rules: [
    'กรณีจัดเวรฯ แล้วหากมีผู้ปฏิบัติราชการตรงกับวันที่เข้าเวรฯ ดำเนินการเปลี่ยนเวรฯ โดยให้เสนอถึง กผร.สพ.ทร.',
    'อะไหล่แทนเฉพาะกรณี ผู้ป่วยใน, เลื่อนยศ, ปลด, หรือย้าย เท่านั้น',
    'นายทหารเวรดับเพลิง มีหน้าที่ควบคุม กำกับดูแล และรักษาความปลอดภัย ป้องกันอัคคีภัยในพื้นที่ สพ.ทร.บางนา',
    'ผู้ปฏิบัติหน้าที่เวรไฟฟ้า - ประปา มีหน้าที่แก้ไขเหตุขัดข้องเกี่ยวกับระบบไฟฟ้าและประปาภายในพื้นที่ สพ.ทร.บางนา ตลอด 24 ชั่วโมง',
  ],
};

export interface MonthOption {
  key: string;
  name: string;
  shortName: string;
  monthNumber: number;
  yearBuddhist: number;
  totalDays: number;
  startDayOfWeekIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export const AVAILABLE_MONTHS: MonthOption[] = [
  {
    key: '2569-10',
    name: 'ตุลาคม 2569',
    shortName: 'ต.ค. 69',
    monthNumber: 10,
    yearBuddhist: 2569,
    totalDays: 31,
    startDayOfWeekIndex: 4, // Thursday (Day 1 of Oct 2569 was Thursday)
  },
  {
    key: '2569-11',
    name: 'พฤศจิกายน 2569',
    shortName: 'พ.ย. 69',
    monthNumber: 11,
    yearBuddhist: 2569,
    totalDays: 30,
    startDayOfWeekIndex: 0, // Sunday (Day 1 of Nov 2569 is Sunday)
  },
  {
    key: '2569-12',
    name: 'ธันวาคม 2569',
    shortName: 'ธ.ค. 69',
    monthNumber: 12,
    yearBuddhist: 2569,
    totalDays: 31,
    startDayOfWeekIndex: 2, // Tuesday (Day 1 of Dec 2569 is Tuesday)
  },
];

// Thai days of week array (index 0 = Sunday)
export const THAI_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

// Generate default schedule for any month
export function getDefaultScheduleForMonth(monthKey: string): DailyDutyRecord[] {
  if (monthKey === '2569-10') {
    return OCTOBER_2569_SCHEDULE;
  }

  const month = AVAILABLE_MONTHS.find(m => m.key === monthKey) || AVAILABLE_MONTHS[1];
  const totalDays = month.totalDays;
  const startDayIndex = month.startDayOfWeekIndex;

  // Roster officer pool from October to rotate as initial default
  const fireOfficersPool = OCTOBER_2569_SCHEDULE.map(r => r.fireDuty);
  const utilityOfficersPool = OCTOBER_2569_SCHEDULE.map(r => r.utilityDuty);

  const result: DailyDutyRecord[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const dayOfWeekIndex = (startDayIndex + day - 1) % 7;
    const dayOfWeek = THAI_DAYS[dayOfWeekIndex];
    const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;

    // Pick rotating officer
    const poolIndex = (day - 1) % fireOfficersPool.length;
    const fireOfficer = { ...fireOfficersPool[poolIndex] };
    const utilityOfficer = { ...utilityOfficersPool[poolIndex] };

    result.push({
      id: day,
      day,
      dayOfWeek,
      fullDateThai: `${dayOfWeek}ที่ ${day} ${month.name}`,
      shortDateThai: `${day} ${month.shortName}`,
      isWeekend,
      fireDuty: fireOfficer,
      utilityDuty: utilityOfficer,
      notes: `เวรประจำวัน ${day} ${month.shortName} (รอคำสั่งแต่งตั้งอย่างเป็นทางการ หรือแก้ไขได้ในแอป)`,
    });
  }

  return result;
}

// Helper: Format phone number for pretty display
export function formatPhoneNumber(num: string): string {
  const cleaned = num.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  }
  if (cleaned.length === 5) {
    return `โทรภายใน ${cleaned}`;
  }
  return num;
}
