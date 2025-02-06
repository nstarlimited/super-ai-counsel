import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PLAN_URLS = {
  Basic: Deno.env.get('CREEM_BASIC_URL'),
  Professional: Deno.env.get('CREEM_PRO_URL'),
  Lifetime: Deno.env.get('CREEM_LIFETIME_URL'),
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { planName } = await req.json()
    console.log('Requested plan:', planName)

    const paymentUrl = PLAN_URLS[planName]
    if (!paymentUrl) {
      console.error('Payment URL not found for plan:', planName)
      return new Response(
        JSON.stringify({ error: 'Payment URL not configured' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ url: paymentUrl }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})