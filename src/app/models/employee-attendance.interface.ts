export interface EmployeeAttendance {
    id: number;
    employeeId: number;
    trainingId: number;
    date: Date;
    attended: boolean;
}