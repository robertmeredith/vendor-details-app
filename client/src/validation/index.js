import * as yup from 'yup'

const passwordRules =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character

export const registrationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8)
    // .matches(passwordRules, {
    //   message:
    //     'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    // })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Required'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
})

export const vendorSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  instagram: yup.string().max(30, 'Too Long!'),
  website: yup.string(),
  email: yup.string().email('Invalid email'),
})

export const clientFormSchema = yup.object().shape({
  client: yup.string().required('Required'),
  partner: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
})
