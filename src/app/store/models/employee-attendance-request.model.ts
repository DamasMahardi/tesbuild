import { ApprovalStatus, AttendanceStatus } from '../enums';
import { EmployeeWorkshift, Workshift, WorkshiftDetail } from './employee-attendance.model';
import { Employee } from './employee.model';

export class EmployeeAttendanceRequestWithNavigationProperties {
  employeeAttendanceRequest: EmployeeAttendanceRequest;
  employee: Employee;
  approved1: Employee;
  approved2: Employee;
  approved3: Employee;
  approved4: Employee;
  approved5: Employee;

  constructor(model?) {
    model = model || {};
    this.employeeAttendanceRequest = model.employeeAttendanceRequest || new EmployeeAttendanceRequest();
    this.employee = model.employee || new Employee();
    this.approved1 = model.approved1 || new Employee();
    this.approved2 = model.approved2 || new Employee();
    this.approved3 = model.approved3 || new Employee();
    this.approved4 = model.approved4 || new Employee();
    this.approved5 = model.approved5 || new Employee();
  }
}

export class EmployeeWorkshiftWithNavigationProperties {
  employeeWorkshift: EmployeeWorkshift;
  workshift: Workshift;
  employee: Employee;
  

  constructor(model?) {
    model = model || {};
    this.employeeWorkshift = model.employeeWorkshift || new EmployeeWorkshift();
    this.employee = model.employee || new Employee();
    this.workshift = model.workshift || new Workshift();
  }
}

export class EmployeeAttendanceRequest {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  employeeId: string;
  number: string;
  date: Date;
  dateTimeIn: Date;
  latIn: string;
  lngIn: string;
  locationIn: string;
  dateTimeOut: Date;
  latOut: string;
  lngOut: string;
  locationOut: string;
  employeeAttendanceId: string;
  attendanceStatus : AttendanceStatus;
  attendanceHrdStatus : AttendanceStatus;

  approved1ById: string;
  approved1DateTime: Date;
  approved1Status: ApprovalStatus;
  approved2ById: string;
  approved2DateTime: Date;
  approved2Status: ApprovalStatus;

  approved3ById : string;
  approved3DateTime : Date;
  approved3Status : ApprovalStatus;
  
  approved4ById : string;
  approved4DateTime : Date;
  approved4Status : ApprovalStatus;
  
  approved5ById : string;
  approved5DateTime : Date;
  approved5Status : ApprovalStatus;   
  description: string;
  comment: string;

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
    this.employeeId = model.employeeId || null;
    this.number = model.number || null;
    this.date = model.date || null;
    this.dateTimeIn = model.dateTimeIn || null;
    this.latIn = model.latIn || null;
    this.lngIn = model.lngIn || null;
    this.locationIn = model.locationIn || null;
    this.dateTimeOut = model.dateTimeOut || null;
    this.latOut = model.latOut || null;
    this.lngOut = model.lngOut || null;
    this.locationOut = model.locationOut || null;

    this.employeeAttendanceId = model.employeeAttendanceId || null;
    this.attendanceStatus = model.attendanceStatus || AttendanceStatus.AskApproval;
    this.attendanceHrdStatus = model.attendanceHrdStatus || AttendanceStatus.AskApproval;
    this.approved1ById = model.approved1ById || null;
    this.approved1DateTime = model.approved1DateTime || null;
    this.approved1Status = model.approved1Status || ApprovalStatus.AskApproval;
    this.approved2ById = model.approved2ById || null;
    this.approved2DateTime = model.approved2DateTime || null;
    this.approved2Status = model.approved2Status || ApprovalStatus.AskApproval;

    this.approved3ById = model.approved3ById || null;
    this.approved3DateTime = model.approved3DateTime || null;
    this.approved3Status = model.approved3Status || ApprovalStatus.AskApproval;

    this.approved4ById = model.approved4ById || null;
    this.approved4DateTime = model.approved4DateTime || null;
    this.approved4Status = model.approved4Status || ApprovalStatus.AskApproval;

    this.approved5ById = model.approved5ById || null;
    this.approved5DateTime = model.approved5DateTime || null;
    this.approved5Status = model.approved5Status || ApprovalStatus.AskApproval;

    this.description = model.description || null;
    this.comment = model.comment || null;
  }
}

export class EmployeeAttendanceRequestCreateUpdateDto {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  date: Date;
  dateTimeIn: Date;
  latIn: string;
  lngIn: string;
  locationIn: string;
  dateTimeOut: Date;
  latOut: string;
  lngOut: string;
  locationOut: string;
  employeeId: string;
  employeeAttendanceId: string;
  attendanceStatus : AttendanceStatus;
  attendanceHrdStatus : AttendanceStatus;

  approved1ById: string;
  approved1DateTime: Date;
  approved1Status: ApprovalStatus;
  approved2ById: string;
  approved2DateTime: Date;
  approved2Status: ApprovalStatus;

  approved3ById : string;
  approved3DateTime : Date;
  approved3Status : ApprovalStatus;
  
  approved4ById : string;
  approved4DateTime : Date;
  approved4Status : ApprovalStatus;
  
  approved5ById : string;
  approved5DateTime : Date;
  approved5Status : ApprovalStatus;  
  description: string;
  comment: string;

  dateMin: string;
  dateMax: string;
  dateTimeInMin: string;
  dateTimeInMax: string;
  dateTimeOutMin: string;
  dateTimeOutMax: string;
  timezoneInfoIn: string;
  timezoneOffsetIn: number;
  timezoneInfoOut: string;
  timezoneOffsetOut: number;

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
    this.dateTimeIn = model.dateTimeIn || null;
    this.latIn = model.latIn || null;
    this.lngIn = model.lngIn || null;
    this.locationIn = model.locationIn || null;
    this.dateTimeOut = model.dateTimeOut || null;
    this.latOut = model.latOut || null;
    this.lngOut = model.lngOut || null;
    this.locationOut = model.locationOut || null;

    this.employeeId = model.employeeId || null;
    this.employeeAttendanceId = model.employeeAttendanceId || null;
    this.attendanceStatus = model.attendanceStatus || AttendanceStatus.AskApproval;
    this.attendanceHrdStatus = model.attendanceHrdStatus || AttendanceStatus.AskApproval;
    this.approved1ById = model.approved1ById || null;
    this.approved1DateTime = model.approved1DateTime || null;
    this.approved1Status = model.approved1Status || ApprovalStatus.AskApproval;
    this.approved2ById = model.approved2ById || null;
    this.approved2DateTime = model.approved2DateTime || null;
    this.approved2Status = model.approved2Status || ApprovalStatus.AskApproval;

    this.approved3ById = model.approved3ById || null;
    this.approved3DateTime = model.approved3DateTime || null;
    this.approved3Status = model.approved3Status || ApprovalStatus.AskApproval;

    this.approved4ById = model.approved4ById || null;
    this.approved4DateTime = model.approved4DateTime || null;
    this.approved4Status = model.approved4Status || ApprovalStatus.AskApproval;

    this.approved5ById = model.approved5ById || null;
    this.approved5DateTime = model.approved5DateTime || null;
    this.approved5Status = model.approved5Status || ApprovalStatus.AskApproval;
    this.description = model.description || null;
    this.comment = model.comment || null;

    this.dateMin = model.dateMin || null;
    this.dateMax = model.dateMax || null;
    this.dateTimeInMin = model.dateTimeInMin || null;
    this.dateTimeInMax = model.dateTimeInMax || null;
    this.dateTimeOutMin = model.dateTimeOutMin || null;
    this.dateTimeOutMax = model.dateTimeOutMax || null;
    this.timezoneOffsetIn = model.timezoneOffsetIn || 0;
    this.timezoneOffsetOut = model.timezoneOffsetOut || 0;
    this.timezoneInfoIn = model.timezoneInfoIn || null;
    this.timezoneInfoOut = model.timezoneInfoOut || null;
  }
}
