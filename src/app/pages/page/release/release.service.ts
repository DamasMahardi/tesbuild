import { Injectable } from "@angular/core";

export interface IRelease {
    no: number,
    date: Date,
    version: string,
    note: string[],
    roadmap: string[],
    userVoice: string[]
  }
  
@Injectable({
    providedIn: 'root'
})
export class ReleaseService {
    
    constructor() {
        //
    }

    releaseList() {
        let Release: IRelease[] = [
            {
                no : 18, 
                date: new Date(2021, 0, 18),
                version: "1.1.8", 
                note: [
                    'Remove Employee Data Change Request'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 17, 
                date: new Date(2021, 0, 12),
                version: "1.1.7", 
                note: [
                    'Disable Employee Data Change Request',
                    'Disable Employee Attendance Change Request'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 16, 
                date: new Date(2021, 0, 11),
                version: "1.1.6", 
                note: [
                    'Update Overtime',
                    'Update Attendance',
                    'Update Leave',
                    'Update Attendance Request',
                    'Monthly Workshift',
                    'Employee Leave Date Range',
                    'Open Validation Attendance Button'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 15, 
                date: new Date(2020, 10, 24),
                version: "1.1.5", 
                note: [
                    'Update Overtime',
                    'Role Overtime'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 14, 
                date: new Date(2020, 10, 13),
                version: "1.1.4", 
                note: [
                    'Renewal of Overtime Requests for Day Off'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 13, 
                date: new Date(2020, 10, 10),
                version: "1.1.3", 
                note: [
                    'Attendance Request'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 12, 
                date: new Date(2020, 9, 30),
                version: "1.1.2", 
                note: [
                    'Approval Overtime Add Reason when Rejected',
                    'Approval Leave Add Reason When Rejected',
                    'Attendance Request',
                    'Employee Data Change Request',
                    'Add Indonesian languages'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 11, 
                date: new Date(2020, 9, 21),
                version: "1.1.1", 
                note: [
                    'Sent reset password',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 10, 
                date: new Date(2020, 9, 21),
                version: "1.1.0", 
                note: [
                    'Minor bugs loading on the homepage',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 9, 
                date: new Date(2020, 9, 9),
                version: "1.0.9", 
                note: [
                    'Remember Login',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 8, 
                date: new Date(2020, 9, 1),
                version: "1.0.8", 
                note: [
                    'Add Attachment When Request Leave',
                    'Minor bugs login',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 7, 
                date: new Date(2020, 8, 12),
                version: "1.0.7", 
                note: [
                    'Thermoscan History',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 6, 
                date: new Date(2020, 7, 28),
                version: "1.0.6", 
                note: [
                    'Displays Body Temperature',
                    'Minor Bugs Authentication',
                    'Interceptor',
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 5, 
                date: new Date(2020, 7, 11),
                version: "1.0.5", 
                note: [
                    'Notification',
                    'Attendance Reminder',
                    'Redesign Contact Chat'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 4, 
                date: new Date(2020, 6, 27),
                version: "1.0.4", 
                note: [                    
                    'Notification Leave Request & Approval',
                    'Notification Overtime Request & Approval',
                    'Training'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 3, 
                date: new Date(2020, 6, 19),
                version: "1.0.3", 
                note: [                    
                    'Hide Button Request',
                    'Button Clock In/ Out at Home Page',
                    'Interceptor',
                    'Pay Slip'
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 2, 
                date: new Date(2020, 6, 15),
                version: "1.0.2", 
                note: [                    
                    'Employee Leave Approval',
                    'Employee Overtime Approval',
                    'Redirect Login Bugs',
                    'About page'       
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            },
            {
                no : 1, 
                date: new Date(2020, 6, 13),
                version: "1.0.1", 
                note: [                    
                    'Initial Release',
                    'Employee Attendance',
                    'Employee Workshift',
                    'Employee Leave',
                    'Employee Overtime'       
                ],
                roadmap: [
                    'Employee Payroll'
                ],
                userVoice: [
                    'N/A'
                ]
            }]
            return Release
        }
}