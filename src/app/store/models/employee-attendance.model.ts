import { DaysOfWeek } from '../enums';

export class EmployeeAttendance {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  date: Date;
  workshiftTimeIn: string;
  workshiftTimeOut: string;
  dateTimeIn: Date;
  latIn: string;
  lngIn: string;
  locationIn: string;
  timezoneInfoIn: string;
  timezoneOffsetIn: number;
  selfiePhotoIn: string;
  deviceIdIn: string;
  dateTimeOut: Date;
  latOut: string;
  lngOut: string;
  locationOut: string;
  timezoneInfoOut: string;
  timezoneOffsetOut: number;
  selfiePhotoOut: string;
  deviceIdOut: string;
  isHoliday: boolean;
  isLeave: boolean;
  employeeLeaveDetailId: string;
  isLate: boolean;
  lateLong: number;
  isOvertime: boolean;
  employeeOvertimeDetailId: string;
  isOutOffice: boolean;
  employeeId: string;
  employeeWorkshiftId: string;
  companyId: string
  attendanceStatus: number;
  approved1ById: string;
  approved1DateTime: string;
  approved1Status: number;
  approved2ById: string;
  approved2DateTime: string;
  approved2Status: number;

  /**
   * 
   * @param model 
   */
  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.creationTime = model.creationTime || null;
    this.creatorId = model.creatorId || null;
    this.lastModificationTime = model.lastModificationTime || null;
    this.lastModifierId = model.lastModifierId || null;

    this.tenantId = model.tenantId || null;
    this.date = model.date || null;
    this.workshiftTimeIn = model.workshiftTimeIn || null;
    this.workshiftTimeOut = this.workshiftTimeOut || null;
    this.dateTimeIn = model.dateTimeIn || null;
    this.latIn = model.latIn || null;
    this.lngIn = model.lngIn || null;
    this.locationIn = model.locationIn || null;
    this.timezoneInfoIn = model.timezoneInfoIn || null;
    this.timezoneOffsetIn = model.timezoneOffsetIn || 0;
    this.selfiePhotoIn = model.selfiePhotoIn || null;
    this.deviceIdIn = model.deviceIdIn || null;
    this.dateTimeOut = model.dateTimeOut || null;
    this.latOut = model.latOut || null;
    this.lngOut = model.lngOut || null;
    this.locationOut = model.locationOut || null;  
    this.timezoneInfoOut = model.timezoneInfoOut || null;  
    this.timezoneOffsetOut = model.timezoneOffsetOut || 0;
    this.selfiePhotoOut = model.selfiePhotoOut || null;
    this.deviceIdOut = model.deviceIdOut || null;
    this.isHoliday = model.isHoliday || false;
    this.isLeave = model.isLeave || false;
    this.employeeLeaveDetailId = model.employeeLeaveDetailId || null;
    this.isLate = model.isLate || false;
    this.lateLong = model.lateLong || 0;
    this.isOvertime = model.isOvertime || false;
    this.employeeOvertimeDetailId = model.employeeOvertimeDetailId || null;
    this.isOutOffice = model.isOutOffice || false;

    this.employeeId = model.employeeId || null;
    this.employeeWorkshiftId = model.employeeWorkshiftId || null;
    this.companyId = model.companyId || null;
    this.attendanceStatus = model.attendanceStatus || 0;
    this.approved1ById = model.approved1ById || null;
    this.approved1DateTime = model.approved1DateTime || null;
    this.approved1Status = model.approved1Status || 0;
    this.approved2ById = model.approved2ById || null;
    this.approved2DateTime = model.approved2DateTime || null;
    this.approved2Status = model.approved2Status || 0;    
  }
}

export class AttendanceByEmployee {
  employeeAttendance: EmployeeAttendance;
  employeeWorkshift: EmployeeWorkshift;
  workShiftDetail: WorkshiftDetail;
  attendanceRecognition: AttendanceRecognition;

  constructor(model?) {
    model = model || {};
    this.employeeAttendance = model.employeeAttendance || new EmployeeAttendance();
    this.employeeWorkshift = model.employeeWorkshift || new EmployeeWorkshift();
    this.workShiftDetail = model.workShiftDetail || new WorkshiftDetail();
    this.attendanceRecognition = model.attendanceRecognition || new AttendanceRecognition();
  }
}

export class AttendanceRecognition {
  bodyTemp: string;

  constructor(model?) {
    model = model || {};
    this.bodyTemp = model.bodyTemp || null;
  }
}

export class Workshift {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  description: string;
  totalWorkingHour: number;
  isActive: boolean;
  isDefault: boolean;

  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.tenantId = model.tenantId ||null;
    this.code = model.code || null;
    this.name = model.name || null;
    this.description = model.description || null;
    this.totalWorkingHour = model.totalWorkingHour || null;
    this.isActive = model.isActive || true;
    this.isDefault = model.isDefault || true;
  }
}

export class EmployeeWorkshift {
  id: string;
  tenantId: string;
  employeeId: string;
  workshiftId: string;
  effectiveDate: string;

  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.tenantId = model.tenantId ||null;
    this.employeeId = model.employeeId || null;
    this.workshiftId = model.workshiftId || null;
    this.effectiveDate = model.effectiveDate || null;
  }
}

export class WorkshiftDetail {
  id: string;
  tenantId: string;
  dayName: DaysOfWeek;
  timeIn: string;
  breakTimeStart: string;
  breakTimeEnd: string;
  timeOut: string;
  totalBreakHour: number;
  totalWorkingHour: number;
  isActive: boolean;

  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.tenantId = model.tenantId ||null;
    this.dayName = model.dayName || 0;
    this.timeIn = model.timeIn || null;
    this.breakTimeStart = model.breakTimeStart || null;
    this.breakTimeEnd = model.breakTimeEnd || null;
    this.timeOut = model.timeOut || null;
    this.totalBreakHour = model.totalBreakHour || null;
    this.totalWorkingHour = model.totalWorkingHour || null;
    this.isActive = model.isActive || false;
  }
}