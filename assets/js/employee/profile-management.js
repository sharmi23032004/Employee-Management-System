/* ================================
   PROFILE MANAGEMENT FUNCTIONALITY
   ================================ */

let isEditMode = false;
let originalFormData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Load profile data
    loadProfileData();
    
    // Store original form data
    storeOriginalFormData();
    
    // Upload document form submit
    const uploadDocumentForm = document.getElementById('uploadDocumentForm');
    if (uploadDocumentForm) {
        uploadDocumentForm.addEventListener('submit', handleDocumentUpload);
    }
});

// Load profile data
function loadProfileData() {
    const user = Utils.getLocalStorage(CONFIG.STORAGE_KEYS.USER);
    
    if (user) {
        // Update profile header
        document.getElementById('profileName').textContent = user.name;
        
        // In production, fetch full profile from API
        console.log('Profile data loaded for:', user.email);
    }
}

// Store original form data
function storeOriginalFormData() {
    const forms = ['personalInfoForm', 'emergencyContactForm', 'bankDetailsForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            originalFormData[formId] = new FormData(form);
        }
    });
}

// Enable edit mode
function enableEdit() {
    isEditMode = true;
    
    // Show/hide buttons
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'inline-flex';
    document.getElementById('cancelEditBtn').style.display = 'inline-flex';
    
    // Enable all form fields except email and employee ID
    enableFormFields();
    
    // Show alert
    Utils.showAlert('Edit mode enabled. Make changes and click Save.', 'info');
}

// Cancel edit
function cancelEdit() {
    if (confirm('Are you sure you want to discard changes?')) {
        isEditMode = false;
        
        // Show/hide buttons
        document.getElementById('editProfileBtn').style.display = 'inline-flex';
        document.getElementById('saveProfileBtn').style.display = 'none';
        document.getElementById('cancelEditBtn').style.display = 'none';
        
        // Disable all form fields
        disableFormFields();
        
        // Restore original data
        restoreOriginalFormData();
        
        // Hide alert
        Utils.hideAlert();
    }
}

// Save profile
function saveProfile() {
    // Validate forms
    if (!validateForms()) {
        return;
    }
    
    // Collect form data
    const profileData = collectFormData();
    
    // Show loading
    const saveBtn = document.getElementById('saveProfileBtn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    // Simulate API call
    setTimeout(() => {
        // In production, send to API
        console.log('Saving profile data:', profileData);
        
        // Update original form data
        storeOriginalFormData();
        
        // Exit edit mode
        isEditMode = false;
        
        // Show/hide buttons
        document.getElementById('editProfileBtn').style.display = 'inline-flex';
        document.getElementById('saveProfileBtn').style.display = 'none';
        document.getElementById('cancelEditBtn').style.display = 'none';
        
        // Disable form fields
        disableFormFields();
        
        // Reset button
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        
        // Show success message
        showAlert('Profile updated successfully!', 'success');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            Utils.hideAlert();
        }, 3000);
    }, 1500);
}

// Enable form fields
function enableFormFields() {
    const forms = ['personalInfoForm', 'emergencyContactForm', 'bankDetailsForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                // Don't enable email field (read-only)
                if (input.id !== 'email') {
                    input.disabled = false;
                }
            });
        }
    });
}

// Disable form fields
function disableFormFields() {
    const forms = ['personalInfoForm', 'emergencyContactForm', 'bankDetailsForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.disabled = true;
            });
        }
    });
}

// Restore original form data
function restoreOriginalFormData() {
    Object.keys(originalFormData).forEach(formId => {
        const form = document.getElementById(formId);
        const formData = originalFormData[formId];
        
        if (form && formData) {
            for (let [key, value] of formData.entries()) {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = value;
                }
            }
        }
    });
}

// Validate forms
function validateForms() {
    // Basic validation - can be enhanced
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!firstName || !lastName) {
        Utils.showAlert('First name and last name are required', 'danger');
        return false;
    }
    
    if (!phone) {
        Utils.showAlert('Phone number is required', 'danger');
        return false;
    }
    
    return true;
}

// Collect form data
function collectFormData() {
    const data = {
        personalInfo: {},
        emergencyContact: {},
        bankDetails: {}
    };
    
    // Personal Info
    const personalForm = document.getElementById('personalInfoForm');
    if (personalForm) {
        const formData = new FormData(personalForm);
        for (let [key, value] of formData.entries()) {
            data.personalInfo[key] = value;
        }
    }
    
    // Emergency Contact
    const emergencyForm = document.getElementById('emergencyContactForm');
    if (emergencyForm) {
        const formData = new FormData(emergencyForm);
        for (let [key, value] of formData.entries()) {
            data.emergencyContact[key] = value;
        }
    }
    
    // Bank Details
    const bankForm = document.getElementById('bankDetailsForm');
    if (bankForm) {
        const formData = new FormData(bankForm);
        for (let [key, value] of formData.entries()) {
            data.bankDetails[key] = value;
        }
    }
    
    return data;
}

// Edit avatar
function editAvatar() {
    alert('Avatar upload functionality will be implemented here');
    console.log('Edit avatar clicked');
    
    // In production, show file upload dialog
}

// Edit cover
function editCover() {
    alert('Cover photo upload functionality will be implemented here');
    console.log('Edit cover clicked');
    
    // In production, show file upload dialog
}

// View document
function viewDocument(documentType) {
    alert('Viewing ' + documentType + ' document');
    console.log('View document:', documentType);
    
    // In production, open document in new tab or modal
}

// Download document
function downloadDocument(documentType) {
    alert('Downloading ' + documentType + ' document');
    console.log('Download document:', documentType);
    
    // In production, trigger download
}

// Upload document
function uploadDocument() {
    const modal = document.getElementById('uploadDocumentModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('uploadDocumentModal');
    if (modal) {
        modal.classList.remove('show');
        
        // Reset form
        const form = document.getElementById('uploadDocumentForm');
        if (form) {
            form.reset();
        }
    }
}

// Handle document upload
function handleDocumentUpload(event) {
    event.preventDefault();
    
    const documentType = document.getElementById('documentType').value;
    const documentFile = document.getElementById('documentFile').files[0];
    
    if (!documentType || !documentFile) {
        Utils.showAlert('Please select document type and file', 'danger');
        return;
    }
    
    // Check file size (5MB)
    if (documentFile.size > 5 * 1024 * 1024) {
        Utils.showAlert('File size should not exceed 5MB', 'danger');
        return;
    }
    
    console.log('Uploading document:', documentType, documentFile.name);
    
    // In production, upload to server
    // For demo, just close modal and show success
    closeModal();
    showAlert('Document uploaded successfully!', 'success');
    
    setTimeout(() => {
        Utils.hideAlert();
    }, 3000);
}

// Show alert
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('profileAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
    }
}

// Close alert
function closeAlert() {
    Utils.hideAlert();
}

// Make functions globally available
window.enableEdit = enableEdit;
window.cancelEdit = cancelEdit;
window.saveProfile = saveProfile;
window.editAvatar = editAvatar;
window.editCover = editCover;
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.uploadDocument = uploadDocument;
window.closeModal = closeModal;
window.closeAlert = closeAlert;