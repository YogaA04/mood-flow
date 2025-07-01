'use server';
import { SignupFormSchema, LoginFormSchema } from '@/libs/definitions';
import { prisma } from '@/libs/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/libs/session';

export const signup = async (state, formData) => {
    // Validate the form data against the SignupFormSchema
    const validateDFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // if any form fields are invalid, return early
    if (!validateDFields.success) {
        return {
            errors: validateDFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validateDFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database using Prisma

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: { id: true },
        });
        await createSession(user.id);

        return {
            message: 'Your account has been created successfully! restart the app to see the changes.',
            success: true,
        }
    } catch (error) {
        return {
            message: 'An error occurred while creating your account.',
            error: error.message,
            success: false,
        };
    }
}

export const login = async (state, formData) => {
    const validateDFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // Validate the email and password
    if (!validateDFields.success) {
        return {
            errors: validateDFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validateDFields.data;

    // Find the user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return {
            message: 'User not found.',
            success: false,
        };
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            message: 'Invalid password.',
            success: false,
        };
    }

    // Create a session for the user (not implemented here)
    await createSession(user.id);
    redirect("/dashboard");

    return {
        message: 'Login successful!',
        success: true,
    };
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}
