# Not

Bu projede jQuery kullanılmıştır. Ebebek sitesinde jQuery yüklü olmadığından `undefined` hatası alınmaktadır. Projenin sorunsuz çalışabilmesi için öncelikle jQuery’nin yüklenmesi gerekmektedir.

Örnek olarak jQuery’yi sayfaya eklemek için:

```javascript
// jQuery'yi sayfaya yükleme
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.head.appendChild(script);
