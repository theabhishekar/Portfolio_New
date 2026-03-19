import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Using service key for now
);

export async function GET() {
  try {
    const { data: pixels, error } = await supabase
      .from('pixel_grid')
      .select('pixel_id, color')
      .order('pixel_id', { ascending: true });

    if (error) {
      console.error('Get pixels error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pixels' },
        { status: 500 }
      );
    }

    // Convert to format expected by frontend
    const pixelMap: { [key: number]: string } = {};
    pixels?.forEach(pixel => {
      if (pixel.color !== '#1a1a2e') { // Only include non-default colors
        pixelMap[pixel.pixel_id] = pixel.color;
      }
    });

    return NextResponse.json({ 
      success: true, 
      pixels: pixelMap,
      total: pixels?.length || 0
    });

  } catch (error) {
    console.error('Get pixels error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pixels' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { pixel_id, color } = await request.json();

    if (typeof pixel_id !== 'number' || pixel_id < 0 || pixel_id > 399) {
      return NextResponse.json(
        { error: 'Invalid pixel_id (must be 0-399)' },
        { status: 400 }
      );
    }

    if (!color || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return NextResponse.json(
        { error: 'Invalid color format (must be #RRGGBB)' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('pixel_grid')
      .update({ 
        color,
        updated_at: new Date().toISOString()
      })
      .eq('pixel_id', pixel_id)
      .select()
      .single();

    if (error) {
      console.error('Update pixel error:', error);
      return NextResponse.json(
        { error: 'Failed to update pixel' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pixel updated successfully! 🎨',
      pixel: data
    });

  } catch (error) {
    console.error('Update pixel error:', error);
    return NextResponse.json(
      { error: 'Failed to update pixel' },
      { status: 500 }
    );
  }
}