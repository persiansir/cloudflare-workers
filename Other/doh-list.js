// ۱. یک شنونده رویداد به رویداد `fetch` اضافه می‌کنیم که هر زمان یک درخواست HTTP وارد شده توسط کارگر رخ می‌دهد، فعال می‌شود.
addEventListener('fetch', async event => {
  // ۲. درخواست وارد شده را مستقیماً به تابع `handleRequest` می‌دهیم.
  event.respondWith(handleRequest(event.request));
});

// ۳. تابع `handleRequest` را تعریف می‌کنیم که یک شیء `request` را به عنوان آرگومان می‌گیرد.
async function handleRequest(request) {
  // ۴. فایل JSON را از آدرس مشخص شده با استفاده از API `fetch` دریافت می‌کنیم و مستقیماً آن را تجزیه می‌کنیم.
  const data = await (await fetch('https://raw.githubusercontent.com/cslev/encrypted_dns_resolvers/main/doh_resolvers_data_20230510.json')).json();
  
  // ۵. یک رشته خالی را برای ذخیره خروجی تعریف می‌کنیم.
  let output = '';
  
  // ۶. روی اشیاء در پاسخ با استفاده از `Object.values()` تکرار می‌کنیم که سریع‌تر از `Object.entries()` است.
  for (const value of Object.values(data)) {
    // ۷. ویژگی `uri` هر شیء را به رشته خروجی اضافه می‌کنیم، با جداکننده‌های کاراکتر جدید سطر (`\n`).
    output += `${value.uri}\n`;
  }
  
  // ۸. یک شیء پاسخ جدید با رشته خروجی به عنوان بدنه پاسخ ایجاد می‌کنیم.
  return new Response(output, {
    // ۹. هدر `Content-Type` را به `text/plain` تنظیم می‌کنیم تا نشان دهیم که بدنه پاسخ متنی ساده است.
    headers: { 'Content-Type': 'text/plain' },
  });
}
