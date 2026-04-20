# HTML Admin Template

Nunjucks template engine + Vite build system ile çalışan admin dashboard template.

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
# Vite dev server (hot-reload, Nunjucks rendering)
npm run dev
```

## Production Build

```bash
# dist/ klasörüne derle
npm run build

# Derlenen çıktıyı önizle
npm run preview

# Veya statik sunucu ile serve et
npx serve dist
```

## Yapı

```
html/
├── index.html              → dashboard'a yönlendirme
├── vite.config.js          Vite + Nunjucks yapılandırması
├── package.json
├── public/
│   └── assets/             Statik dosyalar (build'de olduğu gibi kopyalanır)
│       ├── css/
│       │   ├── theme.css       CSS custom properties (light/dark/dim)
│       │   ├── layout.css      Layout stilleri
│       │   ├── components.css  Bileşen stilleri
│       │   ├── utilities.css   Yardımcı sınıflar
│       │   ├── page-styles.css Sayfaya özel stiller
│       │   └── auth.css        Auth sayfaları ortak stilleri
│       ├── js/
│       │   ├── theme.js        Tema geçişi
│       │   ├── sidebar.js      Sidebar davranışı
│       │   ├── i18n.js         Çoklu dil desteği
│       │   └── app.js          Sayfa etkileşimleri
│       └── vendors/
├── src/
│   ├── layouts/
│   │   ├── base.html       Ana admin layout (sidebar + header + footer)
│   │   ├── auth.html       Kimlik doğrulama sayfaları layout'u
│   │   └── error.html      Hata sayfaları minimal layout'u
│   └── partials/
│       ├── head.html        Ortak <head> içeriği
│       ├── sidebar.html     Sidebar navigasyonu
│       ├── header.html      Üst başlık çubuğu
│       ├── footer.html      Sayfa altlığı
│       ├── overlays.html    Panel ve modallar
│       └── scripts.html     Ortak script yüklemeleri
└── pages/
    ├── dashboard.html
    ├── analytics.html
    ├── auth/
    │   ├── login.html
    │   ├── register.html
    │   ├── forgot-password.html
    │   └── two-factor.html
    ├── errors/
    │   ├── 403.html
    │   ├── 404.html
    │   ├── 500.html
    │   └── maintenance.html
    ├── shop/
    │   ├── products.html
    │   ├── cart.html
    │   └── checkout.html
    └── ... (30+ sayfa)
```
