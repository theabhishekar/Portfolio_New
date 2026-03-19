// /pages/api/pixels/index.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Using anon key for public access
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all pixels
    try {
      const { data: pixels, error } = await supabase
        .from('pixel_grid')
        .select('pixel_id, color')
        .order('pixel_id', { ascending: true });

      if (error) {
        console.error('Get pixels error:', error);
        return res.status(500).json({ error: 'Failed to fetch pixels' });
      }

      // Convert to format expected by frontend
      const pixelMap = {};
      pixels?.forEach(pixel => {
        if (pixel.color !== '#1a1a2e') { // Only include non-default colors
          pixelMap[pixel.pixel_id] = pixel.color;
        }
      });

      res.status(200).json({ success: true, pixels: pixelMap });

    } catch (error) {
      console.error('Get pixels error:', error);
      res.status(500).json({ error: 'Failed to fetch pixels' });
    }
  } 
  else if (req.method === 'POST') {
    // Update a pixel
    const { pixel_id, color } = req.body;

    if (typeof pixel_id !== 'number' || pixel_id < 0 || pixel_id > 399) {
      return res.status(400).json({ error: 'Invalid pixel_id (must be 0-399)' });
    }

    if (!color || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return res.status(400).json({ error: 'Invalid color format (must be #RRGGBB)' });
    }

    try {
      const { data, error } = await supabase
        .from('pixel_grid')
        .upsert({ 
          pixel_id, 
          color,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Update pixel error:', error);
        return res.status(500).json({ error: 'Failed to update pixel' });
      }

      res.status(200).json({ 
        success: true, 
        message: 'Pixel updated successfully',
        pixel: data
      });

    } catch (error) {
      console.error('Update pixel error:', error);
      res.status(500).json({ error: 'Failed to update pixel' });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}