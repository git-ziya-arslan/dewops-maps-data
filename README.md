setup,
git clone https://github.com/dewops/maps-data.git
cd dewops-maps-data
cp .env.example .env
npm install
npm run dev

🇬🇧 Project Purpose

DewOps Maps Data is a map-powered business data search platform that allows users to quickly query local businesses based on neighborhood and sector.
With its user-friendly interface and Google Maps integration, it helps users access detailed company information within specific regions.
It is designed especially for marketing, field research, and local business intelligence needs.
 How to Get Your API Key (EN)

To use this app, you need a Google Maps API key. Follow these steps to obtain it:

Go to Google Cloud Console
 and log in.

Create a new project or select an existing one.

Navigate to APIs & Services > Library.

Enable the following APIs:

Places API

Maps JavaScript API

Go to Credentials from the left menu.

Click "Create API Key".

Copy the key and paste it into the .env file under GOOGLE_API_KEY=.

 Security tip: Set usage limits and IP restrictions for your key.



🇹🇷 Proje Amacı

DewOps Maps Data, mahalle ve sektör bazlı iş yerlerini hızlıca sorgulayıp, kolayca erişmenizi sağlayan harita destekli veri arama platformudur.
Kullanıcı dostu arayüzü sayesinde Google Maps altyapısını kullanarak belirli bölgelere dair detaylı firma verilerine ulaşmanızı sağlar.
Özellikle pazarlama, saha araştırması veya yerel işletme analizlerinde kullanılmak üzere tasarlanmıştır.
 API Anahtarı Nasıl Alınır? (TR)

Bu uygulamayı kullanabilmek için bir Google Maps API anahtarına ihtiyacınız vardır. Aşağıdaki adımları takip ederek kolayca oluşturabilirsiniz:

Google Cloud Console
 adresine gidin ve giriş yapın.

Yeni bir proje oluşturun veya var olan bir projeyi seçin.

Sol menüden API'ler ve Hizmetler > Kitaplık bölümüne gidin.

Places API ve Maps JavaScript API hizmetlerini etkinleştirin.

Sol menüden Kimlik Bilgileri (Credentials) bölümüne geçin.

“API anahtarı oluştur” butonuna tıklayın.

Oluşan anahtarı .env dosyasındaki GOOGLE_API_KEY= satırına yapıştırın.

 Güvenlik önerisi: Kullanım kotası ve IP kısıtlaması ekleyerek anahtarınızı koruyun.
