// این خط کد یک listener را به event "fetch" اضافه می‌کند. این listener هر بار که یک درخواست HTTP به سرور ارسال می‌شود، اجرا می‌شود.
addEventListener("fetch", (event) => {
  // این خط کد پاسخی را به درخواست HTTP ارسال می‌کند. پاسخی که توسط تابع handleRequest تولید می‌شود.
  event.respondWith(handleRequest(event.request));
});

// این تابع async را تعریف می‌کند که درخواست HTTP را به عنوان ورودی می‌گیرد.
async function handleRequest(request) {
  // این خط کد یک URL را تعریف می‌کند که به یک فایل متنی در GitHub اشاره می‌کند.
  const url = "https://raw.githubusercontent.com/coldwater-10/clash_rules/main/List%20of%20clean%20IPs.txt";
  
  // این خط کد یک درخواست HTTP را به URL ارسال می‌کند و پاسخی را دریافت می‌کند.
  const response = await fetch(url);
  
  // این خط کد پاسخی را به عنوان یک رشته متنی دریافت می‌کند.
  const text = await response.text();
  
  // این خط کد یک regex را تعریف می‌کند که IP های IPv4 را تشخیص می‌دهد.
  const ipv4Regex = /\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
  
  // این خط کد لیستی از IP های IPv4 را از رشته متنی دریافت می‌کند.
  const ipv4Addresses = text.match(ipv4Regex) || [];
  
  // این خط کد لیستی از IP های IPv4 را به صورت فرمت شده در می‌آورد.
  const formattedAddresses = ipv4Addresses.map((ip) => `0 - 0 - ${ip}`);
  
  // این خط کد پاسخی را به درخواست HTTP ارسال می‌کند.
  return new Response(formattedAddresses.join("\n"), {
    // این خط کد هدرهای پاسخی را تعریف می‌کند.
    headers: {
      // این خط کد هدر "content-type" را تعریف می‌کند.
      "content-type": "text/plain; charset=utf-8",
      // این خط کد هدر "cache-control" را تعریف می‌کند.
      "cache-control": "max-age=3600"
    }
  });
}
