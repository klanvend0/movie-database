Projeyi çalıştırmak için:

1. Projeyi klonlayın.

2. Klasörü açın.

3. .env dosyasını oluşturun ve içine `VITE_API_KEY` değişkenini ekleyin.

4. Root directory de `npm install` komutunu çalıştırın.

5. Root directory de `npm run dev` komutunu çalıştırın.

Notlar:

    Projenin deploy edilmiş halini movie-database-vert.vercel.app adresinden görebilirsiniz.
    .env dosyasını .gitignore'a ekledim. Bu yüzden .env dosyası oluşturmanız gerekiyor. .env dosyası içine `VITE_API_KEY` değişkenini ekleyin ve değerine 3a5e050a yazın.
    Kullanılan omdb api search methodu kötü çalışıyor, arama sonuçları çok az geliyor. Belirli karakter sayısına kadar too many results harici bir şey döndürmüyor.
