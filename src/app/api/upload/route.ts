import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import * as fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    
    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await ensureDir(uploadDir);
    
    // 写入文件
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    // 返回文件URL
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

async function ensureDir(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
} 