import { LeaveType, LeaveStatus } from '@app-models';

export class LeaveCreateUpdateDto  {
  number: string;
  employeeId?: string;
  leaveType: LeaveType;
  dateTimeStart?: string;
  dateTimeEnd?: string;
  lengthHours: number;
  lengthDays: number;
  description: string;
  isApprove: boolean;
  approvedBy?: string;
  dateApproved?: string;
  isRejected: boolean;
  rejectedBy?: string;
  dateRejected?: string;
  comment: string;
  leaveStatus: LeaveStatus;

  constructor(initialValues: Partial<LeaveCreateUpdateDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}
