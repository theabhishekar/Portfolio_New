import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET() {
  try {
    // Test database connection by counting pixels
    const { count: pixelCount, error: pixelError } = await supabase
      .from('pixel_grid')
      .select('*', { count: 'exact', head: true });

    if (pixelError) {
      console.error('Pixel grid error:', pixelError);
      return NextResponse.json({
        success: false,
        error: pixelError.message,
        help: 'Make sure you ran the SQL script in Supabase SQL Editor'
      }, { status: 500 });
    }

    // Test newsletter table
    const { count: subCount, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true });

    if (subError) {
      console.error('Newsletter error:', subError);
      return NextResponse.json({
        success: false,
        error: subError.message,
        help: 'Make sure you ran the SQL script in Supabase SQL Editor'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful! 🚀',
      tables: {
        pixel_grid: `Connected ✅ (${pixelCount} pixels initialized)`,
        newsletter_subscribers: `Connected ✅ (${subCount || 0} subscribers)`
      },
      environment: {
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
        service_key: process.env.SUPABASE_SERVICE_KEY ? '✅ Set' : '❌ Missing'
      }
    });

  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      help: 'Check your SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local'
    }, { status: 500 });
  }
}