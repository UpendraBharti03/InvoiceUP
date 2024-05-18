import express from 'express'
import { validate } from '@src/middlewares/validate'
import { loginUserValidation, logoutUserValidation, signUpUserValidation } from '@src/features/auth/auth.validation'
import authController from '@src/features/auth/auth.controller'
import catchAsync from '@src/utils/catchAsync'
import { authenticate } from '@src/features/auth/auth.middleware';

const router = express.Router()

// Signup route
router.post('/signup', validate(signUpUserValidation), catchAsync(authController?.signUpHandler))

// login route
router.post('/login', validate(loginUserValidation), catchAsync(authController?.loginHandler))

// logout route
router.post('/logout', validate(logoutUserValidation), catchAsync(authController?.logoutHandler))

// get profile route
router.get('/get-profile', authenticate, catchAsync(authController?.getProfileHandler))

export default router