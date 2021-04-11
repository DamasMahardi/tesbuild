import { EmployeeLeave } from './employee-leave.model';
import { EmployeeOvertime } from './employee-overtime.model';
import { Employee } from './employee.model';

export class EmployeeNotificationWithNavigationProperties {
    employeeNotification: Notification;
    employeeLeave: EmployeeLeave;
    employeeOvertime: EmployeeOvertime;
    employee: Employee

    constructor(model?) {
        model = model || {};
        this.employeeNotification = model.employeeNotification || new Notification();
        this.employeeLeave = model.employeeLeave || new EmployeeLeave();
        this.employeeOvertime = model.employeeOvertime || new EmployeeOvertime();
        this.employee = model.employee || new Employee();
    }
}

export class Notification {
    id: string;
    creationTime: Date;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;
    tenantId: string;
    code: string
    notificationType: number;
    leaveStatus: number;
    overtimeStatus: number;
    messages: string;
    dataId: string;
    approvedId: string;
    employeeId: string;
    markAsRead: boolean;

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
        this.code = model.code || null;
        this.notificationType = model.notificationType || 0;
        this.leaveStatus = model.leaveStatus || 0;
        this.overtimeStatus = model.overtimeStatus || 0;
        this.messages = model.messages || null;
        this.dataId = model.dataId || null;
        this.approvedId = model.approvedId || null;
        this.employeeId = model.employeeId || null;
        this.markAsRead = model.markAsRead || false;
    }
}