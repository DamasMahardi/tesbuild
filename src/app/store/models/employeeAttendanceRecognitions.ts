import { Employee } from './employee.model';

export class EmployeeAttendanceRecognitionWithNavigationProperties {
  employeeAttendanceRecognition: EmployeeAttendanceRecognition;
  employee: Employee;

  constructor(model?) {
    model = model || {};
    this.employeeAttendanceRecognition = model.employeeAttendanceRecognition || new EmployeeAttendanceRecognition();
    this.employee = model.employee || new Employee();
  }
}

export class EmployeeAttendanceRecognition {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  serialNumber: string;
  list: string;
  bodyTemp: string;
  status: string;
  ic: string;
  isWearingMask: boolean;
  snapTime: string;
  detailedSituation: string;
  userFullName: string;
  deviceName: string;
  workArea: string;
  createdDate: string;
  imageBase64: string;
  name: string;
  tenantName: string;

  constructor(model?) {
    model = model || {};
    this.id = model.id || null;
    this.creationTime = model.creationTime || null;
    this.creatorId = model.creatorId || null;
    this.lastModificationTime = model.lastModificationTime || null;
    this.lastModifierId = model.lastModifierId || null;

    this.tenantId = model.tenantId || null;
    this.serialNumber = model.serialNumber || null;
    this.list = model.list || null;
    this.bodyTemp = model.bodyTemp || null;
    this.status = model.status || null;
    this.ic = model.ic || null;
    this.isWearingMask = model.isWearingMask || false;
    this.snapTime = model.snapTime || null;
    this.detailedSituation = model.detailedSituation || null;
    this.userFullName = model.userFullName || null;
    this.deviceName = model.deviceName || null;
    this.workArea = model.workArea || null;
    this.createdDate = model.createdDate || null;
    this.imageBase64 = model.imageBase64 || null;
    this.name = model.name || null;
    this.tenantName = model.tenantName || null;
  }
}