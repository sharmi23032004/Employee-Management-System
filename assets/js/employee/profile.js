/* ================================
   PROFILE PAGE FUNCTIONALITY
   ================================ */

let selectedAvatarFile = null;

/* ---- AVATAR UPLOAD ---- */
function openAvatarUpload() {
    document.getElementById('avatarUploadModal').classList.add('show');
}

function closeAvatarUpload() {
    document.getElementById('avatarUploadModal').classList.remove('show');
    selectedAvatarFile = null;
    document.getElementById('avatarPreview').innerHTML = '<i class="fas fa-user"></i>';
}

function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('avatarDropZone').classList.add('drag-over');
}

function handleDragLeave(e) {
    document.getElementById('avatarDropZone').classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    handleDragLeave(e);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processAvatarFile(files[0]);
    }
}

function previewAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        processAvatarFile(file);
    }
}

function processAvatarFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5 MB');
        return;
    }

    selectedAvatarFile = file;

    // Preview image
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('avatarPreview').innerHTML =
            `<img src="${e.target.result}" alt="Avatar Preview">`;
    };
    reader.readAsDataURL(file);
}

function uploadAvatar() {
    if (!selectedAvatarFile) {
        alert('Please select an image first');
        return;
    }

    // In production: Upload to server
    console.log('Uploading avatar:', selectedAvatarFile.name);

    // Simulate upload
    const btn = document.getElementById('uploadAvatarBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    btn.disabled = true;

    setTimeout(() => {
        // Update main avatar
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.profile-avatar-large').innerHTML =
                `<img src="${e.target.result}" alt="Profile">`;
        };
        reader.readAsDataURL(selectedAvatarFile);

        btn.innerHTML = originalText;
        btn.disabled = false;
        closeAvatarUpload();
        alert('Profile picture updated successfully!');
    }, 1500);
}

/* ---- GLOBAL ---- */
window.openAvatarUpload  = openAvatarUpload;
window.closeAvatarUpload = closeAvatarUpload;
window.handleDragOver    = handleDragOver;
window.handleDragLeave   = handleDragLeave;
window.handleDrop        = handleDrop;
window.previewAvatar     = previewAvatar;
window.uploadAvatar      = uploadAvatar;