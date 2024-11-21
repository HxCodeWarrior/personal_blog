import { NextRequest, NextResponse } from 'next/server';
import { getArticleBySlug } from '@/data/articlesData';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
      include: { tags: true }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { title, summary, content, tags } = body;

    const article = await prisma.article.update({
      where: { slug: params.slug },
      data: {
        title,
        summary,
        content,
        tags: {
          set: tags.map((tag: string) => ({ type: tag }))
        }
      },
      include: { tags: true }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Update article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.article.delete({
      where: { slug: params.slug }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 