# Password Authentication QA Testing Guide

## Overview

This document provides comprehensive testing instructions for the newly implemented password authentication system in OpenForm. The system includes user registration, login, password reset functionality, and security validations.

## Environment Setup

### Prerequisites

1. **Resend API Key**: Required for email functionality
    - Sign up at [resend.com](https://resend.com) if you don't have an account
    - Generate an API key from your Resend dashboard
    - Add to `.env.local`: `RESEND_API_KEY=your_api_key_here`

2. **Development Server**

    ```bash
    pnpm dev
    ```

3. **Convex Backend**
    - Ensure Convex is running locally or connected to development deployment
    - Check Convex dashboard for user data during testing

### Test Accounts

Create these test accounts for comprehensive testing:

- `test@example.com` - Regular user account
- `admin@example.com` - Admin user account (if applicable)
- `invalid-email` - For email validation testing
- `short@ex.co` - For email validation testing

## Test Scenarios

### 1. User Registration (Sign-Up)

#### Happy Path Tests

- [ ] **Valid Registration**
    - Navigate to `/signin`
    - Click "Create account" toggle
    - Enter valid email and strong password
    - Click "Create account"
    - Verify: User redirected to dashboard, success message shown
    - Verify: Confirmation email sent (check Resend logs)

- [ ] **Email Verification**
    - Complete registration with valid credentials
    - Check email inbox for verification link
    - Click verification link
    - Verify: Account activated, can sign in successfully

#### Validation Tests

- [ ] **Email Validation**
    - Test invalid emails: `invalid-email`, `test@`, `@example.com`, `test..test@example.com`
    - Verify: Appropriate error messages displayed
    - Test valid emails: `test@example.com`, `user.name+tag@example.co.uk`

- [ ] **Password Strength Validation**
    - Test weak passwords: `123`, `password`, `abc123`
    - Verify: Password strength indicator shows weak/medium
    - Test strong passwords: `MySecureP@ssw0rd123!`, `C0mpl3xP@ss2024`
    - Verify: Password strength indicator shows strong

- [ ] **Required Fields**
    - Attempt registration with empty email field
    - Attempt registration with empty password field
    - Verify: Form validation prevents submission, shows required field errors

- [ ] **Duplicate Email**
    - Register with an email that already exists
    - Verify: Error message "Account already exists" or similar
    - Verify: Cannot create duplicate account

### 2. User Login (Sign-In)

#### Happy Path Tests

- [ ] **Valid Login**
    - Navigate to `/signin`
    - Enter registered email and correct password
    - Click "Sign in"
    - Verify: User redirected to dashboard
    - Verify: User session persists across page refreshes

- [ ] **Remember Me Functionality**
    - Login with "Remember me" checked
    - Close browser completely
    - Reopen and navigate to app
    - Verify: User still logged in (session persists)

#### Error Handling Tests

- [ ] **Invalid Credentials**
    - Enter wrong password for valid email
    - Verify: Error message "Invalid email or password"
    - Enter valid password for non-existent email
    - Verify: Same error message (security: don't reveal if email exists)

- [ ] **Account Lockout** (if implemented)
    - Attempt multiple failed logins
    - Verify: Account temporarily locked after X attempts
    - Verify: Appropriate error message and lockout duration

- [ ] **Unverified Account**
    - Try to login with unverified email
    - Verify: Error message about email verification required
    - Verify: Option to resend verification email

### 3. Password Reset

#### Happy Path Tests

- [ ] **Initiate Password Reset**
    - On sign-in page, click "Forgot password?"
    - Enter registered email address
    - Click "Send reset email"
    - Verify: Success message "Check your email for reset instructions"
    - Verify: Reset email sent (check Resend logs)

- [ ] **Complete Password Reset**
    - Open reset email, click reset link
    - Verify: Redirected to `/reset-password` with valid token
    - Enter new strong password
    - Confirm password
    - Click "Reset password"
    - Verify: Success message, redirected to sign-in
    - Verify: Can login with new password

#### Edge Case Tests

- [ ] **Invalid Reset Token**
    - Use expired or tampered reset link
    - Verify: Error message "Invalid or expired reset token"
    - Verify: Cannot proceed with password reset

- [ ] **Non-existent Email**
    - Request password reset for email that doesn't exist
    - Verify: Success message (security: don't reveal if email exists)
    - Verify: No email sent

- [ ] **Password Confirmation Mismatch**
    - Enter different passwords in password and confirm fields
    - Verify: Error message "Passwords do not match"
    - Verify: Cannot submit form

- [ ] **Weak New Password**
    - Attempt to reset with weak password
    - Verify: Password strength validation applies
    - Verify: Cannot submit with weak password

### 4. Security & Edge Cases

#### Session Management

- [ ] **Session Timeout**
    - Login and wait for session to expire
    - Verify: Automatically logged out, redirected to sign-in
    - Verify: Protected routes require re-authentication

- [ ] **Multiple Device Login**
    - Login from different browsers/devices
    - Verify: All sessions remain valid
    - Verify: Logout from one device doesn't affect others (if implemented)

#### Cross-Site Issues

- [ ] **CSRF Protection**
    - Attempt to submit forms from external domains
    - Verify: Requests rejected

- [ ] **XSS Prevention**
    - Attempt to inject scripts in email/password fields
    - Verify: Input properly sanitized, no script execution

#### Rate Limiting

- [ ] **Brute Force Protection**
    - Attempt rapid login attempts
    - Verify: Requests throttled or blocked after threshold
    - Test on registration and password reset endpoints

### 5. UI/UX Testing

#### Responsive Design

- [ ] **Mobile Responsiveness**
    - Test registration/login on mobile devices
    - Verify: Forms adapt properly to small screens
    - Verify: Touch targets are appropriately sized

- [ ] **Form Accessibility**
    - Test with keyboard navigation only
    - Verify: All form fields accessible via Tab
    - Verify: Screen reader compatibility
    - Verify: Proper ARIA labels and error announcements

#### Error States

- [ ] **Network Errors**
    - Simulate network disconnection during form submission
    - Verify: Appropriate error messages
    - Verify: Form state preserved

- [ ] **Server Errors**
    - Simulate 500 errors from backend
    - Verify: User-friendly error messages
    - Verify: No sensitive information leaked

### 6. Integration Testing

#### With Existing Features

- [ ] **Dashboard Access**
    - After login, verify access to protected dashboard routes
    - Verify: User data loads correctly
    - Verify: Logout functionality works from dashboard

- [ ] **Form Creation** (if applicable)
    - Login and attempt to create/edit forms
    - Verify: Authentication state maintained during form operations

#### Email Integration

- [ ] **Email Delivery**
    - Monitor Resend dashboard for email delivery status
    - Verify: Emails delivered successfully
    - Verify: Email content is correct and professional

- [ ] **Email Templates**
    - Check formatting of verification emails
    - Check formatting of password reset emails
    - Verify: Links are properly formatted and functional

## Test Data Management

### Cleanup Procedures

- **Remove Test Users**: After testing, clean up test accounts from Convex dashboard
- **Reset Environment**: Clear any test data that might affect production
- **Log Review**: Check Convex logs for any errors or security events

### Test Data Creation

```javascript
// Example: Create test user via Convex dashboard or direct database insertion
// Use this for setting up specific test scenarios
```

## Performance Testing

### Load Testing

- [ ] **Concurrent Registrations**
    - Simulate multiple users registering simultaneously
    - Verify: No race conditions or duplicate accounts

- [ ] **Login Performance**
    - Measure login response times
    - Verify: Authentication completes within 2 seconds

### Memory/Resource Usage

- [ ] **Session Storage**
    - Monitor memory usage with multiple active sessions
    - Verify: No memory leaks in authentication state

## Security Audit Checklist

### Data Protection

- [ ] **Password Storage**: Verify passwords are properly hashed (not stored in plain text)
- [ ] **Token Security**: Ensure reset tokens expire appropriately
- [ ] **HTTPS Only**: Verify all auth endpoints require HTTPS in production

### Compliance

- [ ] **GDPR Compliance**: Verify data processing consent and right to deletion
- [ ] **Password Policies**: Ensure compliance with security standards
- [ ] **Audit Logging**: Verify authentication events are logged appropriately

## Bug Reporting Template

When reporting bugs, include:

1. **Steps to Reproduce**: Detailed steps
2. **Expected Behavior**: What should happen
3. **Actual Behavior**: What actually happened
4. **Environment**: Browser, OS, device
5. **Screenshots/Logs**: If applicable
6. **Severity**: Critical, High, Medium, Low

## Sign-Off Criteria

- [ ] All happy path tests pass
- [ ] All validation tests pass
- [ ] All error handling tests pass
- [ ] Security audit completed
- [ ] Performance requirements met
- [ ] UI/UX requirements met
- [ ] Integration with existing features verified
- [ ] Documentation updated
- [ ] Code review completed

## Additional Notes

- **Test Environment Isolation**: Use separate test environment to avoid affecting production data
- **Backup Data**: Backup production data before deploying authentication changes
- **Rollback Plan**: Have rollback procedures ready in case of critical issues
- **Monitoring**: Set up monitoring for authentication failures and security events

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Tested By**: [QA Team Member Name]
**Approval**: [Date]
