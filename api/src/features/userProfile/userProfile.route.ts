import express from 'express'
import { validate } from '@src/middlewares/validate'
import catchAsync from '@src/utils/catchAsync'
import { authenticate } from '@src/features/auth/auth.middleware';
import { updateUserProfileValidation } from '@src/features/userProfile/userProfile.validation'
import userProfileController from '@src/features/userProfile/userProfile.controller';

const router = express.Router()

// update profile route
router.post('/update', authenticate, validate(updateUserProfileValidation), catchAsync(userProfileController?.updateUserProfileHandler))

export default router