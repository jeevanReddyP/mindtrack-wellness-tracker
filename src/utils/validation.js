// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const validatePhone = (phone) => {
  // Basic phone number validation (10 digits)
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value.trim() !== '';
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field] || '';
    const fieldRules = rules[field];

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = fieldRules.requiredMessage || 'This field is required';
      return;
    }

    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
      return;
    }

    if (fieldRules.password && !validatePassword(value)) {
      errors[field] =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
      return;
    }

    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = 'Please enter a valid phone number';
      return;
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters long`;
      return;
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Must be no more than ${fieldRules.maxLength} characters long`;
      return;
    }

    if (fieldRules.match && value !== formData[fieldRules.match]) {
      errors[field] = fieldRules.matchMessage || 'Values do not match';
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Example usage:
/*
const formData = {
  email: 'test@example.com',
  password: 'Password123',
  confirmPassword: 'Password123',
  phone: '1234567890',
};

const rules = {
  email: {
    required: true,
    email: true,
    requiredMessage: 'Email is required',
  },
  password: {
    required: true,
    minLength: 8,
    password: true,
  },
  confirmPassword: {
    required: true,
    match: 'password',
    matchMessage: 'Passwords do not match',
  },
  phone: {
    required: true,
    phone: true,
  },
};

const { isValid, errors } = validateForm(formData, rules);
*/