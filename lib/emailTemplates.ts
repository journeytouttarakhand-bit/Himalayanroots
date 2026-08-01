type OrderEmailProps = {
  customerName: string;
  orderId: string;
  amount: number;
};

export function orderConfirmedTemplate({
  customerName,
  orderId,
  amount,
}: OrderEmailProps) {
  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

<div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:40px;">

<h1 style="color:#166534;">
🏔 Himalayan Roots
</h1>

<h2>
Order Confirmed 🎉
</h2>

<p>
Hello <strong>${customerName}</strong>,
</p>

<p>

Thank you for shopping with Himalayan Roots.

Your order has been confirmed successfully.

</p>

<hr>

<p>

<b>Order ID:</b>
${orderId}

</p>

<p>

<b>Total Amount:</b>
₹${amount}

</p>

<hr>

<p>

We'll notify you once your order is packed and shipped.

</p>

<p>

Thank you ❤️

</p>

</div>

</body>

</html>
`;
}

export function orderShippedTemplate({
  customerName,
  orderId,
  amount,
}: OrderEmailProps) {
  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

<div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:40px;">

<h1 style="color:#166534;">
🏔 Himalayan Roots
</h1>

<h2>

📦 Your Order has been Shipped

</h2>

<p>

Hello <strong>${customerName}</strong>,

</p>

<p>

Great news!

Your order is now on the way.

</p>

<hr>

<p>

<b>Order ID:</b>

${orderId}

</p>

<p>

<b>Amount:</b>

₹${amount}

</p>

<hr>

<p>

It will reach you soon.

</p>

</div>

</body>

</html>
`;
}

export function orderDeliveredTemplate({
  customerName,
  orderId,
  amount,
}: OrderEmailProps) {
  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

<div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:40px;">

<h1 style="color:#166534;">
🏔 Himalayan Roots
</h1>

<h2>

✅ Order Delivered

</h2>

<p>

Hello <strong>${customerName}</strong>,

</p>

<p>

Your order has been delivered successfully.

We hope you enjoy authentic Himalayan products.

</p>

<hr>

<p>

<b>Order ID:</b>

${orderId}

</p>

<p>

<b>Total:</b>

₹${amount}

</p>

<hr>

<p>

Thank you for choosing Himalayan Roots ❤️

</p>

</div>

</body>

</html>
`;
}