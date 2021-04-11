import { Employee } from './employee.model';

export class EmployeeAttendanceSehatWithNavigationProperties {
  employeeAttendanceSehat: EmployeeAttendanceSehat;
  employee: Employee;

  constructor(model?) {
    model = model || {};
    this.employeeAttendanceSehat = model.employeeAttendanceSehat || new EmployeeAttendanceSehat();
    this.employee = model.employee || new Employee();
  }
}

export class EmployeeAttendanceSehat {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  date: string;
  userName: string;
  userNik: string;
  userFullName: string;
  imageBase64: string;
  checkInDeviceName: string;
  checkInTime: string;
  checkOutDeviceName: string;
  checkOutTime: string;
  tenantName: string;

  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.creationTime = model.creationTime || null;
    this.creatorId = model.creatorId || null;
    this.lastModificationTime = model.lastModificationTime || null;
    this.lastModifierId = model.lastModifierId || null;

    this.tenantId = model.tenantId || null;
    this.date = model.date || null;
    this.userName = model.userName || null;
    this.userNik = model.userNik || null;
    this.userFullName = model.userFullName || null;
    this.imageBase64 = model.imageBase64 || null;
    this.checkInDeviceName = model.checkInDeviceName || null;
    this.checkInTime = model.checkInTime || null;
    this.checkOutDeviceName = model.checkOutDeviceName || null;
    this.checkOutTime = model.checkOutTime || null;
    this.tenantName = model.tenantName || null;
  }
}