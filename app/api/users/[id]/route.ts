import { NextResponse, NextRequest } from 'next/server';
import { UserService } from '@/lib/services';

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const user = UserService.getById(id);
  
  if (!user) {
    return NextResponse.json(
      { error: `Пользователь с идентификатором ${id} не найден` }, 
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}
