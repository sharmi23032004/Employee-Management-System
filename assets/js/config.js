/* ================================
   CONFIGURATION - API Endpoints & Constants
   ================================ */

const CONFIG = {
    // API Base URLs
    API_BASE_URL: 'http://localhost:8080/api',
    
    // API Endpoints
    ENDPOINTS: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        
        // Employee Endpoints
        EMPLOYEES: '/employees',
        EMPLOYEE_PROFILE: '/employees/profile',
        
        // Leave Endpoints
        LEAVES: '/leaves',
        LEAVE_APPLY: '/leaves/apply',
        LEAVE_APPROVE: '/leaves/approve',
        
        // Attendance Endpoints
        ATTENDANCE: '/attendance',
        MARK_ATTENDANCE: '/attendance/mark',
        
        // Payroll Endpoints
        PAYROLL: '/payroll',
        PAYSLIPS: '/payroll/payslips',
    },
    
    // User Roles
    ROLES: {
        ADMIN: 'admin',
        HR: 'hr',
        EMPLOYEE: 'employee'
    },
    
    // Dashboard URLs based on roles
    DASHBOARD_URLS: {
        admin: 'admin/dashboard.html',
        hr: 'hr/dashboard.html',
        employee: 'employee/dashboard.html'
    },
    
    // Demo Credentials (for testing)
    DEMO_USERS: {
        admin: {
            email: 'admin@company.com',
            password: 'admin123',
            role: 'admin',
            name: 'Admin User'
        },
        hr: {
            email: 'hr@company.com',
            password: 'hr123',
            role: 'hr',
            name: 'HR Manager'
        },
        employee: {
            email: 'employee@company.com',
            password: 'emp123',
            role: 'employee',
            name: 'John Doe'
        }
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        USER: 'ems_user',
        TOKEN: 'ems_token',
        REMEMBER_ME: 'ems_remember'
    },
    
    // Validation Rules
    VALIDATION: {
        EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PASSWORD_MIN_LENGTH: 6,
        PASSWORD_MAX_LENGTH: 20
    },
    
    // App Settings
    APP_NAME: 'Employee Management System',
    SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
};

// Make CONFIG globally available
window.CONFIG = CONFIG;
