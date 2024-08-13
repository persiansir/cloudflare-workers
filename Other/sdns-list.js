// این خط کد یک listener را به event "fetch" اضافه می‌کند. این listener هر بار که یک درخواست HTTP به سرور ارسال می‌شود، اجرا می‌شود.
addEventListener('fetch', event => {
  // این خط کد پاسخی را به درخواست HTTP ارسال می‌کند. پاسخی که توسط تابع handleRequest تولید می‌شود.
  event.respondWith(handleRequest(event.request))
});

// این تابع async را تعریف می‌کند که درخواست HTTP را به عنوان ورودی می‌گیرد.
async function handleRequest(request) {
  // این خط کد یک درخواست HTTP را به URL ارسال می‌کند و پاسخی را دریافت می‌کند.
  const response = await fetch('https://raw.githubusercontent.com/DNSCrypt/dnscrypt-resolvers/master/v3/public-resolvers.md');
  
  // این خط کد پاسخی را به عنوان یک رشته متنی دریافت می‌کند.
  const text = await response.text();
  
  // این خط کد رشته متنی را به لیستی از خطوط تقسیم می‌کند.
  const lines = text.split('\n');
  
  // این خط کد یک لیست خالی را برای ذخیره رزولورهای DNS ایجاد می‌کند.
  const resolvers = [];
  
  // این حلقه برای هر خط در لیست خطوط اجرا می‌شود.
  for (let line of lines) {
    // این خط کد چک می‌کند که آیا خط شروع با "sdns:" می‌شود یا نه.
    if (line.startsWith('sdns:')) {
      // اگر خط شروع با "sdns:" می‌شود، آن را به لیست رزولورهای DNS اضافه می‌کند.
      resolvers.push(line.trim());
    }
  }
  
  // این خط کد لیست رزولورهای DNS را به صورت رشته متنی با جداکننده "\n" در می‌آورد.
  const output = resolvers.join('\n');
  
  // این خط کد پاسخی را به درخواست HTTP ارسال می‌کند.
  return new Response(output, {
    // این خط کد هدرهای پاسخی را تعریف می‌کند.
    headers: { 
      // این خط کد هدر "Content-Type" را تعریف می‌کند.
      'Content-Type': 'text/plain' 
    },
  });
}
