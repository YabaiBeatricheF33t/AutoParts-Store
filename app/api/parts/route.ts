import { NextResponse } from 'next/server';
import { PartService } from '@/lib/services';

export async function GET() {
  const parts = PartService.getAll();
  return NextResponse.json(parts);
}
