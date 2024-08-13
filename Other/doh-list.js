// ۱. یک شنونده رویداد به رویداد `fetch` اضافه می‌کنیم که هر زمان یک درخواست HTTP وارد شده توسط کارگر رخ می‌دهد، فعال می‌شود.
addEventListener('fetch', event => {
  // ۲. تابع `handleRequest` را برای مدیریت درخواست وارد شده فراخوانی می‌کنیم.
  event.respondWith(handleRequest(event.request))
});

// ۳. تابع `handleRequest` را تعریف می‌کنیم که یک شیء `request` را به عنوان آرگومان می‌گیرد.
async function handleRequest(request) {
  // ۴. فایل JSON را از آدرس مشخص شده با استفاده از API `fetch` دریافت می‌کنیم.
  const response = await fetch('https://raw.githubusercontent.com/cslev/encrypted_dns_resolvers/main/doh_resolvers_data_20230510.json');
  
  // ۵. پاسخ JSON را با استفاده از روش `json()` تجزیه می‌کنیم.
  const data = await response.json();
  
  // ۶. یک رشته خالی را برای ذخیره خروجی تعریف می‌کنیم.
  let output = '';
  
  // ۷. روی اشیاء در پاسخ با استفاده از `Object.entries()` تکرار می‌کنیم.
  for (const [key, value] of Object.entries(data)) {
    // ۸. ویژگی `uri` هر شیء را به رشته خروجی اضافه می‌کنیم، با جداکننده‌های کاراکتر جدید سطر (`\n`).
    output += `${value.uri}\n`;
  }
  
  // ۹. یک شیء پاسخ جدید با رشته خروجی به عنوان بدنه پاسخ ایجاد می‌کنیم.
  return new Response(output, {
    // ۱۰. هدر `Content-Type` را به `text/plain` تنظیم می‌کنیم تا نشان دهیم که بدنه پاسخ متنی ساده است.
    headers: { 'Content-Type': 'text/plain' },
  });
}
