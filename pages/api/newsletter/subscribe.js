// /pages/api/newsletter/subscribe.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_active')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Database check error:', checkError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (existing) {
      if (existing.is_active) {
        return res.status(200).json({ 
          success: true, 
          message: 'You are already subscribed to updates!',
          alreadySubscribed: true 
        });
      } else {
        // Re-activate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ is_active: true, subscribed_at: new Date().toISOString() })
          .eq('email', email.toLowerCase().trim());

        if (updateError) {
          console.error('Reactivation error:', updateError);
          return res.status(500).json({ error: 'Failed to reactivate subscription' });
        }

        return res.status(200).json({ 
          success: true, 
          message: 'Welcome back! Your subscription has been reactivated.',
          reactivated: true 
        });
      }
    }

    // Create new subscription
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        is_active: true,
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Subscription error:', error);
      return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
    }

    // TODO: Send welcome email (optional)
    
    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to portfolio updates!',
      subscriber: { id: data.id, email: data.email }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      error: 'Something went wrong. Please try again.',
      details: error.message 
    });
  }
}