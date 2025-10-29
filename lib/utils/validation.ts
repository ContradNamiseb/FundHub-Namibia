// Validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (password.length > 72) {
    errors.push('Password must be less than 72 characters')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateAmount(amount: number | string): {
  valid: boolean
  error?: string
} {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' }
  }

  if (num <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' }
  }

  if (num > 1000000) {
    return { valid: false, error: 'Amount cannot exceed N$1,000,000' }
  }

  return { valid: true }
}

export function validateProjectTitle(title: string): {
  valid: boolean
  error?: string
} {
  if (title.trim().length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters long' }
  }

  if (title.length > 100) {
    return { valid: false, error: 'Title must be less than 100 characters' }
  }

  return { valid: true }
}

export function validateProjectDescription(description: string): {
  valid: boolean
  error?: string
} {
  if (description.trim().length < 50) {
    return {
      valid: false,
      error: 'Description must be at least 50 characters long',
    }
  }

  if (description.length > 5000) {
    return {
      valid: false,
      error: 'Description must be less than 5000 characters',
    }
  }

  return { valid: true }
}

