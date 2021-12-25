---
title: Ładny post
date: 2021-12-25
---
To jest testowy post, napisałem tutaj cokolwiek dla testu

Przeinżyniiirowałem mój projekt chyba... Znowu. I nie mam psychy robić refaktora.  
Ale teraz niejako mogę wykorzystać sporą część mojego kodu w innych częściach strony, gdyż sporo contentu na stronie mogę pisać w markdownie, a kod który napisałem pozwoli mi na renderowanie tego w prosty sposób, w zasadzie wystarczy utworzenie prostego komponenta który zaimportuje `PostComponent`.

Nie jestem pewny, czy routing będzie dobrze działał, żeby to sprawdzić możesz spróbować wejść tutaj: [Testowy post](./test-post.markdown "Testowy post napisany w markdownie, powinien się wyświetlić po kliknięciu")

## O kodzie trochę
Trochę o kodzie, który może trochę pogmatwałem, aczkolwiek ***tylko trochę!!***.

Generalnie stwierdziłem, że będę renderował inne rzeczy markdownem niż samą zawartość na podstronie /blog. Przykładowo /freedom będzie swego rodzaju blogiem, tak samo /projects. Mogę te podstrony bez problemu pisać w markdown. Więc dołączyłem *namespace'y*, którymi sobie oddzielam te poszczególne kategorie. Nie zaimplementowałem jeszcze ich na backendzie, ale to będzie stosunkowo proste do zrobienia. Kod ładujący listę plików markdown i samą zawartość jest uniwersalny, a wykorzystanie tego w komponencie route'a wygląda w zasadzie tak:

blog-post.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  key?: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
  }

}
```

blog-post.component.html
```html
<app-post namespace="blog" [key]="key">
</app-post>
```

Mógłbym uprościć to szczerze jeszcze bardziej, ładujący informację o kluczu na komponencie `app-post` i muszę to rozważyć.

## Markdown? Nie do końca
Okey, o ile same pliki są pisane w markdown o tyle nie są one kompilowanie po stronie klienta.  
Używam tutaj mocy **Cloudflare'owych funkcji i KV** oraz prostego skryptu, który podczas builda kompiluje wszystkie pliki markdown i wysyła je do **serverless funkcji**, która przechowuje post w **KV**, a także aktualizuje indeks postów, w celach wyszukiwania i sortowania. Indeks także jest przechowywany w **KV**.

> KV? Ale czym jest KV?  
> KV jest Cloudflare'ową bazą danych klucz-wartość. Jest bardzo prosta w użyciu, podobna do Redisa. Zapisy są drogie, ale odczyty tanie, jest perfekcyjna do przechowywania moich postów.

## Lista rzeczy do zrobienia
Muszę zrobić wiele rzeczy jeszcze na mojej stronie, przede wszystkim:
* podświetlanie składni renderowane przez skrypt budujący markdowna
* napisanie stylów do wyświetlania postów
  * muszą być proste i estetyczne
  * jako styl składni kodu wybiorę chyba One Dark Pro
* skończenie sekcji `/freedom` oraz `/projects`
* dodanie paginacji, sortowania i wyszukiwania po tagach moich postów
* chyba tyle póki co :3

A że to testowy post to jeszcze ordered list:
1. Jeden
2. Dwa
  1. Podpunkt 1
  2. Podpunkt 2
3. Angular jest kox

## Zakochałem się w Cloudflare Pages
Strona jest hostowana w Cloudflare Pages, a mini backend napisany jest w Cloudflare Functions, które działają używając Cloudflare Workers. Wszystko działa dosyć ładnie, aczkolwiek API jest trochę ograniczone. Niemniej jednak używanie ich jest bardzo proste jak zrozumiesz jak działają. Dokumentacja nie jest zbyt rozbudowana, co troszeczkę utrudnia sprawę, ale nie jest trudno wbić się w to. Jak się nauczysz możesz hostować strony za darmo, a do funkcji masz 100k requestów dziennie **za darmo!**. Wszystko jest hostowane na globalnej sieci Cloudflare, dzięki czemu każdy nie ważne gdzie się znajduje ładuje Twoją stronę w milisekundy! Tak samo działa to z KV, aczkolwiek ma to swój minus - **Po zmianie wartości w KV może zająć nawet do 60 sekund zanim zmiana będzie widoczna wszędzie!** Ogólnie KV nie nadaje się do wykorzystania zbytnio jak bazy danych, a że Cloudflare nie oferuje (przynajmniej jeszcze) żadnej *porządnej* bazy danych, to niestety przy większych projektach jesteśmy zmuszeni używać innych rozwiązań.

Nie mamy też SSR, co boli dodatkowo. Ale to są początki tych funkcjonalności na Cloudflare i mam nadzieję, że w przyszłości to się zmieni. Póki co proste projekty shostuję sobie tutaj, a bardziej rozbudowane na moim własnym słodkim serwerku uwu.
