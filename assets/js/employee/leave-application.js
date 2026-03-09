/* ================================
   LEAVE APPLICATION FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Set minimum date to today
    setMinimumDates();
    
    // Get form elements
    const leaveApplicationForm = document.getElementById('leaveApplicationForm');
    const reasonTextarea = document.getElementById('reason');
    const fileInput = document.getElementById('attachment');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    // Form submit event
    if (leaveApplicationForm) {
        leaveApplicationForm.addEventListener('submit', handleLeaveSubmit);
    }
    
    // Character counter for reason
    if (reasonTextarea) {
        reasonTextarea.addEventListener('input', function() {
            updateCharCount(this.value.length);
        });
    }
    
    // File input change event
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFileSelect(this);
        });
    }
    
    // Date change events for multiple days
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', calculateTotalDays);
        endDateInput.addEventListener('change', calculateTotalDays);
    }
    
    // Clear error on input
    const formInputs = leaveApplicationForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this.id);
        });
    });
});

// Set minimum dates
function setMinimumDates() {
    const today = new Date().toISOString().split('T')[0];
    
    const dateInputs = ['leaveDate', 'startDate', 'endDate'];
    dateInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.setAttribute('min', today);
        }
    });
}

// Handle duration type change
function handleDurationChange() {
    const durationType = document.querySelector('input[name="durationType"]:checked').value;
    
    const halfDaySessionGroup = document.getElementById('halfDaySessionGroup');
    const singleDateGroup = document.getElementById('singleDateGroup');
    const multipleDateGroup = document.getElementById('multipleDateGroup');
    const totalDaysDisplay = document.getElementById('totalDaysDisplay');
    
    // Reset all
    halfDaySessionGroup.style.display = 'none';
    singleDateGroup.style.display = 'none';
    multipleDateGroup.style.display = 'none';
    totalDaysDisplay.style.display = 'none';
    
    if (durationType === 'full') {
        singleDateGroup.style.display = 'block';
    } else if (durationType === 'half') {
        halfDaySessionGroup.style.display = 'block';
        singleDateGroup.style.display = 'block';
    } else if (durationType === 'multiple') {
        multipleDateGroup.style.display = 'grid';
        totalDaysDisplay.style.display = 'flex';
        calculateTotalDays();
    }
}

// Calculate total days
function calculateTotalDays() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (end >= start) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            document.getElementById('totalDaysValue').textContent = diffDays;
        } else {
            document.getElementById('totalDaysValue').textContent = '0';
        }
    }
}

// Update character count
function updateCharCount(count) {
    const charCountElement = document.getElementById('charCount');
    if (charCountElement) {
        charCountElement.textContent = count;
        
        // Change color if approaching limit
        if (count > 450) {
            charCountElement.style.color = 'var(--error)';
        } else if (count > 400) {
            charCountElement.style.color = 'var(--warning)';
        } else {
            charCountElement.style.color = 'var(--gray-600)';
        }
    }
}

// Handle file select
function handleFileSelect(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Check file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size should not exceed 2MB');
            input.value = '';
            fileNameDisplay.textContent = 'Click to browse or drag and drop';
            return;
        }
        
        fileNameDisplay.textContent = file.name;
    } else {
        fileNameDisplay.textContent = 'Click to browse or drag and drop';
    }
}

// Handle leave application submit
function handleLeaveSubmit(event) {
    event.preventDefault();
    
    // Clear all errors
    clearAllErrors();
    
    // Validate form
    if (!validateLeaveForm()) {
        return;
    }
    
    // Collect form data
    const formData = collectLeaveFormData();
    
    // Show loading
    showButtonLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        submitLeaveApplication(formData);
    }, 1500);
}

// Validate leave form
function validateLeaveForm() {
    let isValid = true;
    
    // Leave Type
    const leaveType = document.getElementById('leaveType').value;
    if (!leaveType) {
        showFieldError('leaveType', 'Please select a leave type');
        isValid = false;
    }
    
    // Duration Type
    const durationType = document.querySelector('input[name="durationType"]:checked').value;
    
    // Date validation
    if (durationType === 'full' || durationType === 'half') {
        const leaveDate = document.getElementById('leaveDate').value;
        if (!leaveDate) {
            showFieldError('leaveDate', 'Please select a date');
            isValid = false;
        }
    } else if (durationType === 'multiple') {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (!startDate) {
            showFieldError('startDate', 'Please select start date');
            isValid = false;
        }
        
        if (!endDate) {
            showFieldError('endDate', 'Please select end date');
            isValid = false;
        }
        
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            showFieldError('endDate', 'End date must be after start date');
            isValid = false;
        }
    }
    
    // Reason
    const reason = document.getElementById('reason').value.trim();
    if (!reason) {
        showFieldError('reason', 'Please provide a reason for leave');
        isValid = false;
    } else if (reason.length < 10) {
        showFieldError('reason', 'Reason must be at least 10 characters');
        isValid = false;
    } else if (reason.length > 500) {
        showFieldError('reason', 'Reason cannot exceed 500 characters');
        isValid = false;
    }
    
    // Terms and conditions
    const agreeTerms = document.getElementById('agreeTerms').checked;
    if (!agreeTerms) {
        showFieldError('agreeTerms', 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

// Collect leave form data
function collectLeaveFormData() {
    const durationType = document.querySelector('input[name="durationType"]:checked').value;
    
    const data = {
        leaveType: document.getElementById('leaveType').value,
        durationType: durationType,
        reason: document.getElementById('reason').value.trim(),
        contactNumber: document.getElementById('contactNumber').value.trim(),
        attachment: document.getElementById('attachment').files[0] || null
    };
    
    if (durationType === 'full') {
        data.leaveDate = document.getElementById('leaveDate').value;
        data.totalDays = 1;
    } else if (durationType === 'half') {
        data.leaveDate = document.getElementById('leaveDate').value;
        data.halfDaySession = document.getElementById('halfDaySession').value;
        data.totalDays = 0.5;
    } else if (durationType === 'multiple') {
        data.startDate = document.getElementById('startDate').value;
        data.endDate = document.getElementById('endDate').value;
        data.totalDays = parseInt(document.getElementById('totalDaysValue').textContent);
    }
    
    return data;
}

// Submit leave application
function submitLeaveApplication(formData) {
    // In production, send to API
    console.log('Submitting leave application:', formData);
    
    // Hide loading
    showButtonLoading(false);
    
    // Show success message
    showAlert('Leave application submitted successfully! Your manager will review it soon.', 'success');
    
    // Reset form after short delay
    setTimeout(() => {
        resetForm();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Auto hide alert after 5 seconds
        setTimeout(() => {
            closeAlert();
        }, 5000);
    }, 1000);
    
    /*
    // Real implementation:
    const apiFormData = new FormData();
    Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
            apiFormData.append(key, formData[key]);
        }
    });
    
    fetch(CONFIG.API_BASE_URL + '/leaves/apply', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + Utils.getLocalStorage(CONFIG.STORAGE_KEYS.TOKEN)
        },
        body: apiFormData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Leave application submitted successfully!', 'success');
            resetForm();
        } else {
            showAlert(data.message || 'Failed to submit leave application', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred. Please try again later.', 'danger');
    })
    .finally(() => {
        showButtonLoading(false);
    });
    */
}

// Reset form
function resetForm() {
    const form = document.getElementById('leaveApplicationForm');
    if (form) {
        form.reset();
        
        // Reset file name display
        document.getElementById('fileNameDisplay').textContent = 'Click to browse or drag and drop';
        
        // Reset character count
        updateCharCount(0);
        
        // Hide conditional fields
        document.getElementById('halfDaySessionGroup').style.display = 'none';
        document.getElementById('multipleDateGroup').style.display = 'none';
        document.getElementById('totalDaysDisplay').style.display = 'none';
        
        // Show single date group
        document.getElementById('singleDateGroup').style.display = 'block';
        
        // Clear all errors
        clearAllErrors();
    }
}

// Show field error
function showFieldError(fieldId, message) {
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

// Clear field error
function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (field) {
        field.classList.remove('error');
    }
}

// Clear all errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const fields = document.querySelectorAll('.form-control');
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    fields.forEach(field => {
        field.classList.remove('error');
    });
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

// Show alert
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('leaveAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
    }
}

// Close alert
function closeAlert() {
    const alertBox = document.getElementById('leaveAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Show leave policy
function showLeavePolicy(event) {
    event.preventDefault();
    const modal = document.getElementById('leavePolicyModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close policy modal
function closePolicyModal() {
    const modal = document.getElementById('leavePolicyModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Make functions globally available
window.handleDurationChange = handleDurationChange;
window.resetForm = resetForm;
window.closeAlert = closeAlert;
window.showLeavePolicy = showLeavePolicy;
window.closePolicyModal = closePolicyModal;