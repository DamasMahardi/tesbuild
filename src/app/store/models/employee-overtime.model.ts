import { Employee } from './employee.model';
import { ApprovalStatus } from '../enums/approval-status';
import { OvertimeStatus } from '../enums/overtime-status';
import { WorkDays } from '../enums/WorkDays';

export class EmployeeOvertimeWithNavigationProperties {
    employeeOvertime: EmployeeOvertime;
    employee: Employee;
    approved1: Employee;
    approved2: Employee;
    approved3: Employee;
    approved4: Employee;
    approved5: Employee;

    constructor(model?) {
        model = model || {};
        this.employeeOvertime = model.employeeOvertime || new EmployeeOvertime();
        this.employee = model.employee || new Employee();
        this.approved1 = model.approved1 || new Employee();
        this.approved2 = model.approved2 || new Employee();
        this.approved3 = model.approved3 || new Employee();
        this.approved4 = model.approved4 || new Employee();
        this.approved5 = model.approved5 || new Employee();
    }
  }

export class EmployeeOvertime {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: Date;
    lastModifierId: string;

    tenantId: string;
    employeeId: string;
    number: string;
    overtimeType: number;
    description: string;
    comment: string;
    date: Date;
    dateTimeStart: Date;
    dateTimeEnd: Date;
    dayName: number;
    overtimeStatus: OvertimeStatus;
    overtimeHrdStatus : OvertimeStatus;

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

    actualDateTimeStart: Date;
    actualDateTimeEnd: Date;
    actualLengthHours: number;
    workDays: WorkDays;
    isWeekDay: boolean;
    isFriday: boolean;
    isCompensated: boolean;
    isDeducted: boolean;
    isCalculated: boolean;
    ratePerHour: number;
    first1: number;
    at2: number;
    at3: number;
    at4: number;
    at5: number;
    first5: number;
    at6: number;
    at7: number;
    first7: number;
    at8: number;
    at9: number;
    at10: number;
    at11: number;
    totalCalculated: number;
    isCompensate: boolean;
    totalCompensation: number;
    total: number;

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
        this.overtimeType = model.overtimeType || 0;
        this.description = model.description || null;
        this.comment = model.comment || null;
        this.date = model.date || null;
        this.dateTimeStart = model.dateTimeStart || null;
        this.dateTimeEnd = model.dateTimeEnd || null;
        this.dayName = model.dayName || 0;
        this.overtimeStatus = model.overtimeStatus || OvertimeStatus.AskApproval;
        this.overtimeHrdStatus = model.overtimeHrdStatus || OvertimeStatus.AskApproval;
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

        this.actualDateTimeStart = model.actualDateTimeStart || null;
        this.actualDateTimeEnd = model.actualDateTimeEnd || null;
        this.actualLengthHours = model.actualLengthHours || 0;
        this.workDays = model.workDays || WorkDays.Five;
        this.isWeekDay = model.isWeekDay || false;
        this.isFriday = model.isFriday || false;
        this.isCompensated = model.isCompensated || false;
        this.isDeducted = model.isDeducted || false;
        this.isCalculated = model.isCalculated || false;
        this.ratePerHour = model.ratePerHour || 0;
        this.first1 = model.first1 || 0;
        this.at2 = model.at2 || 0;
        this.at3 = model.at3 || 0;
        this.at4 = model.at4 || 0;
        this.at5 = model.at5 || 0;
        this.first5 = model.first5 || 0;
        this.at6 = model.at6 || 0;
        this.at7 = model.at7 || 0;
        this.first7 = model.first5 || 0;
        this.at8 = model.at8 || 0;
        this.at9 = model.at9 || 0;
        this.at10 = model.at10 || 0;
        this.at11 = model.at11 || 0;
        this.totalCalculated = model.totalCalculated || 0;
        this.isCompensate = model.isCompensate || false;
        this.totalCompensation = model.totalCompensation || 0;
        this.total = model.total || 0;
    }
}