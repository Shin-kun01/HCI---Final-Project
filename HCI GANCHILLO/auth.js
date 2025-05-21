/**
 * Authentication Module for Ganchillo
 * Handles user registration, login, and session management
 */

// User storage keys
const USER_DATA_KEY = 'ganchillo_user_data';
const CURRENT_USER_KEY = 'ganchillo_current_user';

// Default users for testing
const defaultUsers = [
    {
        id: 1,
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123', // In a real app, these would be hashed
        firstName: 'John',
        lastName: 'Doe',
        isSeller: false,
        dateJoined: '2023-04-15',
        profileImage: 'https://via.placeholder.com/150?text=John'
    },
    {
        id: 2,
        username: 'sarahsmith',
        email: 'sarah@example.com',
        password: 'password123',
        firstName: 'Sarah',
        lastName: 'Smith',
        isSeller: true,
        dateJoined: '2023-03-22',
        profileImage: 'https://via.placeholder.com/150?text=Sarah'
    }
];

class AuthManager {
    constructor() {
        this.initializeUsers();
        this.currentUser = this.loadCurrentUser();
        this.updateUI();
    }
    
    // Initialize user data if none exists
    initializeUsers() {
        const userData = localStorage.getItem(USER_DATA_KEY);
        if (!userData) {
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(defaultUsers));
        }
    }
    
    // Get all users
    getUsers() {
        const userData = localStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : [];
    }
    
    // Save users to storage
    saveUsers(users) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));
    }
    
    // Get user by email
    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }
    
    // Get user by username
    getUserByUsername(username) {
        const users = this.getUsers();
        return users.find(user => user.username.toLowerCase() === username.toLowerCase());
    }
    
    // Get user by id
    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }
    
    // Register a new user
    register(userData) {
        // Check if email already exists
        if (this.getUserByEmail(userData.email)) {
            throw new Error('Email already registered');
        }
        
        // Check if username already exists
        if (this.getUserByUsername(userData.username)) {
            throw new Error('Username already taken');
        }
        
        // Get all users
        const users = this.getUsers();
        
        // Generate a new ID
        const newId = users.length > 0 
            ? Math.max(...users.map(user => user.id)) + 1 
            : 1;
        
        // Create new user object
        const newUser = {
            id: newId,
            username: userData.username,
            email: userData.email,
            password: userData.password, // In a real app, we'd hash this
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            isSeller: userData.isSeller || false,
            dateJoined: new Date().toISOString().split('T')[0],
            profileImage: `https://via.placeholder.com/150?text=${userData.username.charAt(0).toUpperCase()}`
        };
        
        // Add user to the array
        users.push(newUser);
        
        // Save updated users
        this.saveUsers(users);
        
        // Return the new user (without password)
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
    
    // Login a user
    login(email, password) {
        const user = this.getUserByEmail(email);
        
        // Check if user exists and password matches
        if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
        }
        
        // Save current user to session
        const { password: pwd, ...userWithoutPassword } = user;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        
        // Update current user
        this.currentUser = userWithoutPassword;
        
        // Update UI
        this.updateUI();
        
        return userWithoutPassword;
    }
    
    // Logout current user
    logout() {
        localStorage.removeItem(CURRENT_USER_KEY);
        this.currentUser = null;
        this.updateUI();
    }
    
    // Load current user from storage
    loadCurrentUser() {
        const userData = localStorage.getItem(CURRENT_USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }
    
    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    // Update user information
    updateUserInfo(userData) {
        if (!this.isLoggedIn()) {
            throw new Error('User not logged in');
        }
        
        // Get all users
        const users = this.getUsers();
        
        // Find current user
        const userIndex = users.findIndex(user => user.id === this.currentUser.id);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        
        // Check if username is being changed and is already taken
        if (userData.username && 
            userData.username !== this.currentUser.username && 
            this.getUserByUsername(userData.username)) {
            throw new Error('Username already taken');
        }
        
        // Update user
        users[userIndex] = {
            ...users[userIndex],
            ...userData
        };
        
        // Save updated users
        this.saveUsers(users);
        
        // Update current user
        const { password, ...userWithoutPassword } = users[userIndex];
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        this.currentUser = userWithoutPassword;
        
        // Update UI
        this.updateUI();
        
        return userWithoutPassword;
    }
    
    // Update User Interface based on authentication status
    updateUI() {
        const userDropdown = document.getElementById('user-dropdown-menu');
        
        if (!userDropdown) return;
        
        if (this.isLoggedIn()) {
            userDropdown.innerHTML = `
                <a href="profile.html" class="dropdown-item">My Profile</a>
                <a href="wishlist.html" class="dropdown-item">Wishlist</a>
                <a href="orders.html" class="dropdown-item">Orders</a>
                ${this.currentUser.isSeller ? 
                  '<a href="seller-dashboard.html" class="dropdown-item">Seller Dashboard</a>' : ''}
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="logout-link">Logout</a>
            `;
            
            // Add logout event listener
            const logoutLink = document.getElementById('logout-link');
            if (logoutLink) {
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                    
                    // Show notification
                    if (window.showNotification) {
                        window.showNotification('You have been logged out', 'info');
                    }
                    
                    // Redirect to homepage if on a protected page
                    const protectedPages = ['profile.html', 'wishlist.html', 'orders.html', 'seller-dashboard.html'];
                    const currentPage = window.location.pathname.split('/').pop();
                    
                    if (protectedPages.includes(currentPage)) {
                        window.location.href = 'index.html';
                    }
                });
            }
        } else {
            userDropdown.innerHTML = `
                <a href="login.html" class="dropdown-item">Sign In</a>
                <a href="register.html" class="dropdown-item">Register</a>
            `;
        }
    }
}

// Initialize authentication manager
const authManager = new AuthManager();

// Setup login form if it exists
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                authManager.login(email, password);
                
                // Show success notification
                if (window.showNotification) {
                    window.showNotification('Successfully logged in!', 'success');
                }
                
                // Redirect to homepage
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } catch (error) {
                // Show error
                const emailError = document.getElementById('email-error');
                if (emailError) {
                    emailError.textContent = error.message;
                }
                
                // Show error notification
                if (window.showNotification) {
                    window.showNotification(error.message, 'error');
                }
            }
        });
    }
    
    // Setup registration form if it exists
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;
            const isSeller = document.getElementById('is_seller').checked;
            
            // Clear previous errors
            ['username-error', 'email-error', 'password-error', 'password2-error'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = '';
            });
            
            // Validate passwords match
            if (password !== password2) {
                const password2Error = document.getElementById('password2-error');
                if (password2Error) {
                    password2Error.textContent = 'Passwords do not match';
                }
                return;
            }
            
            try {
                authManager.register({
                    username,
                    email,
                    password,
                    isSeller
                });
                
                // Show success notification
                if (window.showNotification) {
                    window.showNotification('Registration successful! You can now log in.', 'success');
                }
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } catch (error) {
                // Show specific error based on message
                if (error.message.includes('Email')) {
                    const emailError = document.getElementById('email-error');
                    if (emailError) {
                        emailError.textContent = error.message;
                    }
                } else if (error.message.includes('Username')) {
                    const usernameError = document.getElementById('username-error');
                    if (usernameError) {
                        usernameError.textContent = error.message;
                    }
                }
                
                // Show error notification
                if (window.showNotification) {
                    window.showNotification(error.message, 'error');
                }
            }
        });
    }
    
    // Setup edit profile form if it exists
    const editProfileForm = document.getElementById('edit-profile-form');
    
    if (editProfileForm && authManager.isLoggedIn()) {
        // Pre-fill form with current user data
        const usernameInput = document.getElementById('edit-username');
        const firstNameInput = document.getElementById('edit-first-name');
        const lastNameInput = document.getElementById('edit-last-name');
        
        if (usernameInput) usernameInput.value = authManager.currentUser.username;
        if (firstNameInput) firstNameInput.value = authManager.currentUser.firstName || '';
        if (lastNameInput) lastNameInput.value = authManager.currentUser.lastName || '';
        
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = usernameInput.value;
            const firstName = firstNameInput.value;
            const lastName = lastNameInput.value;
            
            try {
                authManager.updateUserInfo({
                    username,
                    firstName,
                    lastName
                });
                
                // Show success notification
                if (window.showNotification) {
                    window.showNotification('Profile updated successfully!', 'success');
                }
                
                // Close modal if it exists
                const modal = document.getElementById('edit-profile-modal');
                if (modal && window.closeModal) {
                    window.closeModal(modal);
                }
                
                // Reload page to show updated info
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                // Show error notification
                if (window.showNotification) {
                    window.showNotification(error.message, 'error');
                }
            }
        });
    }
    
    // Check if on protected pages and redirect if not logged in
    const protectedPages = ['profile.html', 'wishlist.html', 'orders.html', 'seller-dashboard.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !authManager.isLoggedIn()) {
        window.location.href = 'login.html';
    }
    
    // Check if on seller dashboard but not a seller
    if (currentPage === 'seller-dashboard.html' && 
        authManager.isLoggedIn() && 
        !authManager.currentUser.isSeller) {
        window.location.href = 'profile.html';
    }
});