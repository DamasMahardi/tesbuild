import { EmployeeLeaveDetail } from './employee-leave-detail.model';
import { Employee } from './employee.model';
import { LeaveType } from '../enums/leave-type';
import { LeaveStatus } from '../enums/leave-status';
import { ApprovalStatus } from '../enums/approval-status';

export class EmployeeLeaveWithNavigationProperties {
  employeeLeave: EmployeeLeave;
  employeeLeaveDetails: EmployeeLeaveDetail[];
  employee: Employee;
  approved1: Employee;
  approved2: Employee;
  approved3: Employee;
  approved4: Employee;
  approved5: Employee;

  constructor(model?) {
    model = model || {};
    this.employeeLeave = model.employeeLeave || new EmployeeLeave();
    this.employeeLeaveDetails = model.employeeLeaveDetails || new EmployeeLeaveDetail();
    this.employee = model.employee || new Employee();
    this.approved1 = model.approved1 || new Employee();
    this.approved2 = model.approved2 || new Employee();
    this.approved3 = model.approved3 || new Employee();
    this.approved4 = model.approved4 || new Employee();
    this.approved5 = model.approved5 || new Employee();
  }
}

export class EmployeeLeave {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;

  tenantId: string;
  employeeId: string;
  number: string;
  leaveType: LeaveType;
  description: string;
  comment: string;
  isCompensated: true;
  isDeducted: true;
  leaveStatus: LeaveStatus;
  leaveHrdStatus : LeaveStatus;

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

  file : string;
  fileName : string;
  employeeLeaveDetails: EmployeeLeaveDetail[];

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
    this.leaveType = model.leaveType || LeaveType.Annual;
    this.description = model.description || null;
    this.comment = model.comment || null;
    this.isCompensated = model.isCompensated || false;
    this.isDeducted = model.isDeducted || false;
    this.leaveStatus = model.leaveStatus || LeaveStatus.AskApproval;
    this.leaveHrdStatus = model.leaveHrdStatus || LeaveStatus.AskApproval;
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

    this.file = model.file || null;
    this.fileName = model.fileName || null;
    this.employeeLeaveDetails = model.employeeLeaveDetails || [];
  }
}
