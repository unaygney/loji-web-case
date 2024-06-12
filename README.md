# Borç Yönetim Sistemi Uygulaması

## Proje Hakkında

Bu proje, kullanıcıların borçlarını yönetmelerine, ödeme planlarını görüntülemelerine ve borç detaylarını güncellemelerine olanak tanıyan bir borç yönetim sistemidir. Proje, React ve Next.js kullanılarak geliştirilmiştir ve veri doğrulama, form işleme ve API çağrılarını içermektedir.

## Kullanılan Teknolojiler

- **Next.js:** Projenin iskeletini oluşturan , React Tabanla Framework.
- **TypeScript:** Tip güvenliği için typescript kullandım.
- **Yup:** Form doğrulama ve şema tanımları için yup kullandım
- **React Hook Form:** Form işleme ve yönetimi için
- **Tailwind CSS:** Stil ve tasarım için.
- **ui.shadcn** Componentler için shadcn'un komponentlerinden faydalandım.
- **JWT:** Kimlik doğrulama ve yetkilendirme için.
- **Jose** Tokenları imzalamak ve dogrulamak için kullandığım popüler bir paket

## Proje Dosya Yapısı

```
loji-web-case/
├── public/                 # Proje dosyasındaki statik dosyalar için
├── src/
│   ├── app/
│   │   ├── api/           # API route sayfaları
│   │   ├── (dashboard)/   # Dashboard sayfaları
│   │   └── (login)/       # Login sayfaları
│   ├── components/
│   │   ├── ui/            # Componentler içeriyor
│   │   └── icons/         # Iconları içeriyor
│   ├── containers/        # Sayfa seviyesinde kullanılan bileşenlerin yer aldığı klasör
│   ├── lib/
│   │   ├── api.ts         # API çağrıları için
│   │   ├── definitions.ts # Tip tanımlamaları
│   │   ├── utils.ts       # Kullanılan yardımcı fonksiyonlar
│   │   └── validations.ts # Form validasyonları için
│   ├── middleware.ts      # Ara Yazılım / Token Kontrolu İçin
├── README.md
└── package.json


```

### Önemli Dosya ve Klasörler

- **components/ui:** Kullanıcı arayüz bileşenleri (butonlar, kartlar, dialoglar vb.).
- **components/icons:** Proje içinde kullanılan ikonlar.
- **containers:** Sayfa seviyesinde kullanılan bileşenlerin yer aldığı klasör.
- **app:** Next.js sayfaları ve API rotalarının bulunduğu klasör.
- **lib:** Yardımcı fonksiyonlar, tip tanımları ve validasyon şemalarının bulunduğu klasör.
- **public:** Proje içinde kullanılan statik dosyalar (örneğin logo).

## Kurulum ve Başlatma

Projeyi localde çalıştırmak için:

```bash
git clone https://github.com/unaygney/loji-web-case.git
cd loji-web-case
pnpm i
```

## Canlı Proje

Projenin canlı halini [buradan](https://loji-web-case.vercel.app/login) ulaşabilirsiniz.
