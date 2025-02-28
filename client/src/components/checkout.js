import stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripeInstance = stripe('sk_test_51Nzqo6D2nKh5tDAkwQC64IwGRmHjkEU8ZiRJuCl7Io9U2AxfjhDwKa6snEuksbHiUteH5q3oOs2UrZf6pVPGAOkV009X1WqHFA');

(async () => {
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    custom_text: {
      shipping_address: {
        message: "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
      },
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
    ui_mode: 'embedded',
    return_url: 'https://example.com/return',
  });

  const shippingRate = await stripeInstance.shippingRates.create({
    display_name: 'Ground shipping',
    type: 'fixed_amount',
    fixed_amount: {
      amount: 500,
      currency: 'usd',
    },
    delivery_estimate: {
      minimum: {
        unit: 'business_day',
        value: 5,
      },
      maximum: {
        unit: 'business_day',
        value: 7,
      },
    },
  });

})();