/* ================================
   ADD EMPLOYEE FUNCTIONALITY
   ================================ */

let currentStep = 1;
const totalSteps = 4;
let uploadedPhoto = null;
let uploadedDocuments = {};

document.addEventListener('DOMContentLoaded', function() {
    // Form submit
    const form = document.getElementById('addEmployeeForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Set max date for DOB (18 years ago)
    const dobInput = document.getElementById('dateOfBirth');
    if (dobInput) {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        dobInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Set min date for join date (today)
    const joinDateInput = document.getElementById('joinDate');
    if (joinDateInput) {
        joinDateInput.min = new Date().toISOString().split('T')[0];
    }
});

// Next step
function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
    }
}

// Previous step
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Update step display
function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Update content
    document.querySelectorAll('.form-step-content').forEach((content, index) => {
        if (index + 1 === currentStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// Validate step
function validateStep(step) {
    clearAllErrors();
    
    let isValid = true;
    
    if (step === 1) {
        // Personal Information
        isValid = validatePersonalInfo() && isValid;
    } else if (step === 2) {
        // Employment Information
        isValid = validateEmploymentInfo() && isValid;
    } else if (step === 3) {
        // Salary Information
        isValid = validateSalaryInfo() && isValid;
    }
    
    return isValid;
}

// Validate personal info
function validatePersonalInfo() {
    let isValid = true;
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dateOfBirth').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    
    if (!firstName) {
        showError('firstName', 'First name is required');
        isValid = false;
    }
    
    if (!lastName) {
        showError('lastName', 'Last name is required');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!dob) {
        showError('dateOfBirth', 'Date of birth is required');
        isValid = false;
    }
    
    if (!gender) {
        showError('gender', 'Gender is required');
        isValid = false;
    }
    
    if (!address) {
        showError('address', 'Address is required');
        isValid = false;
    }
    
    if (!city) {
        showError('city', 'City is required');
        isValid = false;
    }
    
    if (!state) {
        showError('state', 'State is required');
        isValid = false;
    }
    
    if (!pincode) {
        showError('pincode', 'PIN code is required');
        isValid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
        showError('pincode', 'PIN code must be 6 digits');
        isValid = false;
    }
    
    return isValid;
}

// Validate employment info
function validateEmploymentInfo() {
    let isValid = true;
    
    const employeeId = document.getElementById('employeeId').value.trim();
    const joinDate = document.getElementById('joinDate').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value.trim();
    const employmentType = document.getElementById('employmentType').value;
    const workLocation = document.getElementById('workLocation').value;
    
    if (!employeeId) {
        showError('employeeId', 'Employee ID is required');
        isValid = false;
    }
    
    if (!joinDate) {
        showError('joinDate', 'Join date is required');
        isValid = false;
    }
    
    if (!department) {
        showError('department', 'Department is required');
        isValid = false;
    }
    
    if (!designation) {
        showError('designation', 'Designation is required');
        isValid = false;
    }
    
    if (!employmentType) {
        showError('employmentType', 'Employment type is required');
        isValid = false;
    }
    
    if (!workLocation) {
        showError('workLocation', 'Work location is required');
        isValid = false;
    }
    
    return isValid;
}

// Validate salary info
function validateSalaryInfo() {
    let isValid = true;
    
    const basicSalary = document.getElementById('basicSalary').value.trim();
    const bankName = document.getElementById('bankName').value.trim();
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const ifscCode = document.getElementById('ifscCode').value.trim();
    const panNumber = document.getElementById('panNumber').value.trim();
    
    if (!basicSalary || parseFloat(basicSalary) <= 0) {
        showError('basicSalary', 'Please enter a valid basic salary');
        isValid = false;
    }
    
    if (!bankName) {
        showError('bankName', 'Bank name is required');
        isValid = false;
    }
    
    if (!accountNumber) {
        showError('accountNumber', 'Account number is required');
        isValid = false;
    }
    
    if (!ifscCode) {
        showError('ifscCode', 'IFSC code is required');
        isValid = false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase())) {
        showError('ifscCode', 'Please enter a valid IFSC code');
        isValid = false;
    }
    
    if (!panNumber) {
        showError('panNumber', 'PAN number is required');
        isValid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber.toUpperCase())) {
        showError('panNumber', 'Please enter a valid PAN number');
        isValid = false;
    }
    
    return isValid;
}

// Calculate gross salary
function calculateGrossSalary() {
    const basic = parseFloat(document.getElementById('basicSalary').value) || 0;
    const hra = parseFloat(document.getElementById('hra').value) || 0;
    const special = parseFloat(document.getElementById('specialAllowance').value) || 0;
    const other = parseFloat(document.getElementById('otherAllowances').value) || 0;
    
    const grossMonthly = basic + hra + special + other;
    const annualCTC = grossMonthly * 12;
    
    document.getElementById('grossMonthlySalary').textContent = '₹' + grossMonthly.toLocaleString('en-IN');
    document.getElementById('annualCTC').textContent = '₹' + annualCTC.toLocaleString('en-IN');
}

// Handle photo upload
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('photoPreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
        document.getElementById('removePhotoBtn').style.display = 'inline-flex';
        uploadedPhoto = file;
    };
    reader.readAsDataURL(file);
}

// Remove photo
function removePhoto() {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = '<i class="fas fa-user"></i>';
    document.getElementById('profilePhoto').value = '';
    document.getElementById('removePhotoBtn').style.display = 'none';
    uploadedPhoto = null;
}

// Handle document upload
function handleDocumentUpload(event, docType) {
    const file = event.target.files[0];
    if (!file) return;
    
    const maxSize = (docType === 'aadhaar' || docType === 'pan') ? 2 : 5;
    
    if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
    }
    
    uploadedDocuments[docType] = file;
    const statusElement = document.getElementById(docType + 'Status');
    statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Uploaded';
    statusElement.classList.add('show');
}

// Handle form submit
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Show loading
    showButtonLoading(true);
    
    // Collect form data
    const formData = new FormData(event.target);
    
    // Add uploaded files
    if (uploadedPhoto) {
        formData.append('photo', uploadedPhoto);
    }
    
    Object.keys(uploadedDocuments).forEach(key => {
        formData.append(key, uploadedDocuments[key]);
    });
    
    // Simulate API call
    setTimeout(() => {
        console.log('Adding employee...');
        
        // In production, make API call
        showButtonLoading(false);
        showAlert('Employee added successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'employees.html';
        }, 2000);
    }, 2000);
}

// Show button loading
function showButtonLoading(show) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (show) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
    }
}

// Utility functions
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (field) {
        field.classList.add('error');
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    document.querySelectorAll('.form-control').forEach(el => {
        el.classList.remove('error');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[0-9\s\-()]+$/.test(phone) && phone.replace(/[^\d]/g, '').length >= 10;
}

function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('addEmployeeAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function closeAlert() {
    const alertBox = document.getElementById('addEmployeeAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.nextStep = nextStep;
window.previousStep = previousStep;
window.calculateGrossSalary = calculateGrossSalary;
window.handlePhotoUpload = handlePhotoUpload;
window.removePhoto = removePhoto;
window.handleDocumentUpload = handleDocumentUpload;
window.closeAlert = closeAlert;