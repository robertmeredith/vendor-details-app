import * as yup from 'yup'

const passwordRules =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character

export const registrationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
})

export const vendorSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  instagram: yup.string().max(30, 'Too Long!'),
  website: yup.string().url('Website must be a valid URL'),
  email: yup.string().email('Invalid email'),
})
