# SGK İşsizlik Ödeneği Hesaplama Aracı

4447 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu'na uygun olarak işsizlik ödeneğini hesaplayan web uygulaması.

## 🚀 Özellikler

- ✅ Son 4 ayın brüt kazancı girişi (Prime esas kazancı)
- ✅ Son 3 yılda sigortalı gün sayısı hesaplaması
- ✅ Günlük ve aylık işsizlik ödeneği hesaplaması
- ✅ Asgari ücretin %80 sınırı uygulaması
- ✅ Ödeneği alma süresi belirlemesi (180/240/300 gün)
- ✅ Toplam ödeneği tutarı hesaplaması
- ✅ Hukuki çerçeve bilgilendirmesi

## 📋 Hukuki Dayanak

### Madde 50
Günlük işsizlik ödeneği, sigortalının son dört aylık prime esas kazançları dikkate alınarak hesaplanan günlük ortalama brüt kazancının yüzde kırkıdır. Bu şekilde hesaplanan işsizlik ödeneği miktarı, 4857 sayılı İş Kanununun 39 uncu maddesine göre onaltı yaşından büyük işçiler için uygulanan aylık asgari ücretin brüt tutarının yüzde seksenini geçemez.

Hizmet akdinin sona ermesinden önceki son 120 gün hizmet akdine tabi olanlardan, son üç yıl içinde:
- **a)** 600 gün sigortalı: 180 gün
- **b)** 900 gün sigortalı: 240 gün
- **c)** 1080 gün sigortalı: 300 gün

### Madde 51
Sigortalı sayılanlardan hizmet akitleri sona erenlerin, işsizlik ödeneği almaya hak kazanabilmesi için:
- Kuruma süresi içinde şahsen başvurması
- Yeni bir iş almaya hazır olduğunu kaydettirmesi
- Bu Kanunda yer alan prim ödeme koşullarını sağlaması gerekir

### Madde 52
İşsizlik ödeneği almakta iken:
- Uygun işi haklı nedene dayanmaksızın reddeden
- Çalıştığı tespit edilen
- Eğitimi reddeden veya devam etmeyen
- Kurum çağrılarına cevap vermeyen

bu kişilerin ödeneği kesilir.

## 🛠️ Teknoloji Stack

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📦 Kurulum

```bash
# Repoyu klonlayın
git clone https://github.com/yourusername/sgk-issizlik-hesap.git
cd sgk-issizlik-hesap

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

## 🚀 Vercel'e Deployment

1. GitHub repository'sini Vercel'e bağlayın
2. Vercel otomatik olarak deploy edecektir
3. Veya manuel olarak:

```bash
npm install -g vercel
vercel
```

## 📊 Hesaplama Mantığı

### 1. Günlük Ortalama Kazanç
```
Günlük Ortalama = Son 4 Ayın Brüt Kazancı Toplamı / Toplam Gün Sayısı
```

### 2. Günlük Ödeneği
```
Günlük Ödeneği = Günlük Ortalama × %40
```

### 3. Aylık Ödeneği (Sınırsız)
```
Aylık Ödeneği = Günlük Ödeneği × 30
```

### 4. Maksimum Günlük Ödeneği
```
Max Günlük = (Asgari Ücret Aylık × %80) / 30
```

### 5. Ödenen Günlük Ödeneği
```
Ödenen Günlük = Min(Günlük Ödeneği, Max Günlük)
```

### 6. Ödeneği Alma Süresi
- 600 gün altı: Ödeme yapılmaz
- 600-899 gün: 180 gün
- 900-1079 gün: 240 gün
- 1080+ gün: 300 gün

### 7. Toplam Ödeneği Tutarı
```
Toplam = Ödenen Aylık × (Ödeneği Gün Sayısı / 30)
```

## 📝 Notlar

- Asgari ücret veritabanı, 1950'den günümüze kadar tüm tarihi değerleri içermektedir
- Tarih seçimi yapılırken, en yakın geçerli asgari ücret otomatik olarak uygulanır
- Tüm hesaplamalar, 4447 sayılı Kanunun 50., 51. ve 52. maddelerine uygun olarak yapılmaktadır

## 👨‍💻 Geliştirme

Kod değişiklikleri yapmak için:

```bash
# Yeni branch oluşturun
git checkout -b feature/yeni-ozellik

# Değişiklikleri yapın ve commit edin
git add .
git commit -m "feat: yeni özellik açıklaması"

# Branch'ı push edin
git push origin feature/yeni-ozellik
```

## 📄 Lisans

MIT

## 📞 İletişim

Sorularınız veya önerileriniz için issue açabilir veya pull request gönderebilirsiniz.

---

**Dikkat:** Bu araç bilgi amaçlı sunulmaktadır. Resmi işlemler için lütfen SGK ile iletişime geçiniz.
