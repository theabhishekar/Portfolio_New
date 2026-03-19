// Test your Supabase connection
// Create: /pages/api/test-connection.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    // Test database connection
    const { data: pixels, error: pixelError } = await supabase
      .from('pixel_grid')
      .select('count')
      .limit(1);

    if (pixelError) throw pixelError;

    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('count')
      .limit(1);

    if (subError) throw subError;

    res.status(200).json({
      success: true,
      message: 'Supabase connection successful!',
      tables: {
        pixel_grid: 'Connected ✅',
        newsletter_subscribers: 'Connected ✅'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      help: 'Check your SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local'
    });
  }
}