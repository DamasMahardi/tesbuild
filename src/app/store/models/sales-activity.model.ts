export interface SalesActivityDto {
    id?: string;
    creationTime?: Date;
    checkinTime?: string;
    checkInLocation?: string;
    checkInSelfiePhoto?: string;
    day?: string;
    week?: string;
    month?: string;
    quarter?: string;
    year?: string;
    picName?: string;
    picJabatan?: string;
    picTelp1?: string;
    picTelp2?: string;
    visitCount?: number;
    remarks?: string;
    activityStatus?: SalesActivityStatus;
    checkOutTime?: string;
    checkOutLocation?: string;
    checkOutSelfiePhoto?: string;
    totalTime?: number;
    title: string;
    no?: string;
    checkInLat?: string;
    checkInLng?: string;
    checkOutLat?: string;
    checkOutLng?: string;
    isApprove?: boolean;
    approveDateTime?: string;
    description?: string;
    nextActivityDate?: string;
    picEmail?: string;
    employeeId?: string;
    activityTypeId?: string;
    approveById?: string;
    nextActivityTypeId?: string;
    customerId?: string;
  }

export interface SalesActivitiesDto {
    filterText: string;
    checkinTimeMin?: string;
    checkinTimeMax?: string;
    checkInLocation?: string;
    checkInSelfiePhoto?: string;
    day?: string;
    week?: string;
    month?: string;
    quarter?: string;
    year?: string;
    picName?: string;
    picJabatan?: string;
    picTelp1?: string;
    picTelp2?: string;
    visitCountMin?: number;
    visitCountMax?: number;
    remarks?: string;
    activityStatus?: SalesActivityStatus;
    checkOutTimeMin?: string;
    checkOutTimeMax?: string;
    checkOutLocation?: string;
    checkOutSelfiePhoto?: string;
    totalTimeMin?: number;
    totalTimeMax?: number;
    title?: string;
    no?: string;
    checkInLat?: string;
    checkInLng?: string;
    checkOutLat?: string;
    checkOutLng?: string;
    isApprove?: boolean;
    approveDateTimeMin?: string;
    approveDateTimeMax?: string;
    description?: string;
    nextActivityDateMin?: string;
    nextActivityDateMax?: string;
    picEmail?: string;
    employeeId?: string;
    activityTypeId?: string;
    approveById?: string;
    nextActivityTypeId?: string;
    customerId?: string;
}

export interface SalesActivityCreateDto {
    checkinTime?: string;
    checkInLocation?: string;
    checkInSelfiePhoto?: string;
    day?: string;
    week?: string;
    month?: string;
    quarter?: string;
    year?: string;
    picName?: string;
    picJabatan?: string;
    picTelp1?: string;
    picTelp2?: string;
    visitCount?: number;
    remarks?: string;
    activityStatus?: SalesActivityStatus;
    checkOutTime?: string;
    checkOutLocation?: string;
    checkOutSelfiePhoto?: string;
    totalTime?: number;
    title: string;
    no?: string;
    checkInLat?: string;
    checkInLng?: string;
    checkOutLat?: string;
    checkOutLng?: string;
    isApprove?: boolean;
    approveDateTime?: string;
    description?: string;
    nextActivityDate?: string;
    picEmail?: string;
    employeeId?: string;
    activityTypeId?: string;
    approveById?: string;
    nextActivityTypeId?: string;
    customerId?: string;
}

export interface SalesActivityWithNavigationPropertiesDto {
    salesActivity: SalesActivitiesDto;
    employee: any;
    employee1: any;
    activityType: any;
    activityType1: any;
    customer: any
}

export enum SalesActivityStatus {
    Cold = 0,
    Warm = 1,
    Hot = 2,
    Deal = 3
}