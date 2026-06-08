import { NextResponse } from 'next/server';
import { UserService } from '@/lib/services';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  email: z.string().email('Указан некорректный формат email'),
  age: z.number().optional(),
  role: z.enum(['admin', 'customer']).optional().default('customer'),
});

export async function GET() {
  const users = UserService.getAll();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const result = userSchema.safeParse(body);
    
    if (!result.success) {
      const errorMessage = result.error.issues.map(err => err.message).join(', ');
      return NextResponse.json(
        { error: errorMessage }, 
        { status: 400 }
      );
    }
    
    const validatedData = result.data;
    
    const newUser = UserService.create({
      name: validatedData.name,
      email: validatedData.email,
      age: validatedData.age,
      role: validatedData.role
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера при создании пользователя' }, 
      { status: 500 }
    );
  }
}
