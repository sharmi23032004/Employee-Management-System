/* ================================
   EMAIL SERVICE - EMAILJS
   Created: 2026-02-16
   Purpose: Handle all email notifications
   ================================ */

// Initialize EmailJS with your Public Key
(function() {
    // Replace with your actual EmailJS Public Key
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); 
})();

const EmailService = {
    // Configuration
    CONFIG: {
        SERVICE_ID: 'YOUR_SERVICE_ID',  // From EmailJS dashboard
        TEMPLATES: {
            WELCOME: 'template_welcome_employee',
            LEAVE_APPROVAL: 'template_leave_approved',
            LEAVE_REJECTION: 'template_leave_rejected',
            PASSWORD_RESET: 'template_password_reset',
            ATTENDANCE_ALERT: 'template_attendance_alert',
            SALARY_SLIP: 'template_salary_slip'
        }
    },
    
    // Send Welcome Email to New Employee
    async sendWelcomeEmail(employeeData) {
        try {
            const templateParams = {
                to_name: employeeData.name,
                to_email: employeeData.email,
                employee_id: employeeData.id,
                designation: employeeData.designation,
                department: employeeData.department,
                join_date: employeeData.joinDate,
                company_name: 'TechCorp Solutions Pvt. Ltd.',
                login_url: window.location.origin + '/login.html',
                hr_email: 'hr@company.com',
                hr_phone: '+91 44 1234 5678'
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.WELCOME,
                templateParams
            );
            
            console.log('✅ Welcome email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Welcome email failed:', error);
            return { success: false, error: error.text };
        }
    },
    
    // Send Leave Approval Email
    async sendLeaveApprovalEmail(leaveData) {
        try {
            const templateParams = {
                to_name: leaveData.employeeName,
                to_email: leaveData.employeeEmail,
                leave_type: leaveData.leaveType,
                start_date: leaveData.startDate,
                end_date: leaveData.endDate,
                total_days: leaveData.totalDays,
                approved_by: leaveData.approvedBy,
                approved_date: new Date().toLocaleDateString('en-IN'),
                comments: leaveData.comments || 'Approved'
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.LEAVE_APPROVAL,
                templateParams
            );
            
            console.log('✅ Leave approval email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Leave approval email failed:', error);
            return { success: false, error: error.text };
        }
    },
    
    // Send Leave Rejection Email
    async sendLeaveRejectionEmail(leaveData, reason) {
        try {
            const templateParams = {
                to_name: leaveData.employeeName,
                to_email: leaveData.employeeEmail,
                leave_type: leaveData.leaveType,
                start_date: leaveData.startDate,
                end_date: leaveData.endDate,
                rejection_reason: reason,
                rejected_by: leaveData.rejectedBy,
                rejected_date: new Date().toLocaleDateString('en-IN')
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.LEAVE_REJECTION,
                templateParams
            );
            
            console.log('✅ Leave rejection email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Leave rejection email failed:', error);
            return { success: false, error: error.text };
        }
    },
    
    // Send Password Reset Email
    async sendPasswordResetEmail(email, resetToken) {
        try {
            const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}&email=${encodeURIComponent(email)}`;
            
            const templateParams = {
                to_email: email,
                reset_link: resetLink,
                expiry_time: '1 hour',
                company_name: 'TechCorp Solutions'
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.PASSWORD_RESET,
                templateParams
            );
            
            console.log('✅ Password reset email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Password reset email failed:', error);
            return { success: false, error: error.text };
        }
    },
    
    // Send Attendance Alert Email
    async sendAttendanceAlertEmail(employeeData) {
        try {
            const templateParams = {
                to_name: employeeData.name,
                to_email: employeeData.email,
                absent_days: employeeData.absentDays,
                month: employeeData.month,
                hr_contact: 'hr@company.com'
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.ATTENDANCE_ALERT,
                templateParams
            );
            
            console.log('✅ Attendance alert email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Attendance alert email failed:', error);
            return { success: false, error: error.text };
        }
    },
    
    // Send Salary Slip Email
    async sendSalarySlipEmail(employeeData, month) {
        try {
            const templateParams = {
                to_name: employeeData.name,
                to_email: employeeData.email,
                month: month,
                year: new Date().getFullYear(),
                net_salary: employeeData.netSalary,
                payslip_link: `${window.location.origin}/employee/my-payslips.html`
            };
            
            const response = await emailjs.send(
                this.CONFIG.SERVICE_ID,
                this.CONFIG.TEMPLATES.SALARY_SLIP,
                templateParams
            );
            
            console.log('✅ Salary slip email sent:', response.status);
            return { success: true, status: response.status };
            
        } catch (error) {
            console.error('❌ Salary slip email failed:', error);
            return { success: false, error: error.text };
        }
    }
};

// Make globally available
window.EmailService = EmailService;