# Vue OP.GG Clone

Minimalistyczna aplikacja webowa inspirowana OP.GG

Wyszukuj graczy League of Legends i przeglądaj ich statystyki meczowe

## Opis projektu

Vue OP.GG Clone to minimalistyczna aplikacja webowa napisana we Vue 3 z użyciem Options API. Projekt umożliwia wyszukiwanie graczy League of Legends po Riot ID oraz podgląd podstawowych informacji o ich profilach. Aplikacja została stworzona w celach edukacyjnych, demonstrując integrację z Riot Games API.

## Stack technologiczny

- **Vue 3** - Framework JavaScript
- **Vite** - Build tool i dev server
- **Options API** - Składnia Vue.js
- **Vue Router** - Routing w aplikacji
- **Riot Games API** - Źródło danych o graczach
- **Fetch API** - Komunikacja z API
- **JavaScript ES6+** - Język programowania

## Funkcjonalności

### MVP (Minimum Viable Product)
- Wyszukiwanie gracza po Riot ID (nazwa + tag)
- Pobieranie i wyświetlanie `puuid`
- Obsługa błędów i statusów ładowania
- Routing między ekranami

## Instalacja

### Wymagania
- Node.js (wersja 16 lub wyższa)
- npm lub yarn

### Kroki instalacji

1. **Klonowanie repozytorium**
```bash
git clone https://github.com/m4jorskyy/Vue_OPGG.git
cd Vue_OPGG
```

2. **Instalacja zależności**
```bash
npm install
```

## Konfiguracja

### Plik środowiskowy

Utwórz plik `.env` w katalogu głównym projektu:

```env
VITE_RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Ważne:** Nie commituj pliku `.env` do repozytorium. Znajduje się on w `.gitignore`.

Możesz utworzyć plik `.env.example` z pustym kluczem:

```env
VITE_RIOT_API_KEY=
```

### Uzyskanie klucza API

1. Przejdź do [Riot Developer Portal](https://developer.riotgames.com/)
2. Zaloguj się kontem Riot Games
3. Stwórz nową aplikację
4. Skopiuj klucz API do pliku `.env`

## Uruchomienie

### Tryb deweloperski
```bash
npm run dev
```

### Build produkcyjny
```bash
npm run build
```

### Podgląd buildu
```bash
npm run preview
```

## Struktura projektu

```
src/
├── components/
│   └── SearchBar.vue          # Komponent wyszukiwania
├── views/
│   ├── HomeView.vue           # Strona główna
│   └── SummonerView.vue       # Profil gracza
├── services/
│   └── riotApi.js             # Komunikacja z Riot API
├── router/
│   └── index.js               # Konfiguracja routingu
├── assets/                    # Zasoby statyczne
├── App.vue                    # Główny komponent
└── main.js                    # Punkt wejścia aplikacji
```

## W planach

### Funkcjonalności do implementacji
- Historia ostatnich 5–10 meczów
- Statystyki meczowe (KDA, wynik, champion, itemy)
- Najczęściej grane postacie
- Rankingi i poziomy
- Ulepszone UI/UX
- Responsywność mobilna

### Ulepszenia techniczne
- Testy jednostkowe
- TypeScript
- Tailwind CSS
- Pinia (store management)

## Bezpieczeństwo

- Klucz API nie trafia do repozytorium
- Wrażliwe dane ładowane z `.env`
- `.env` jest zignorowany w `.gitignore`
- Walidacja danych wejściowych
- Obsługa błędów API

## Licencja

Projekt jest dostępny na licencji MIT - szczegóły w pliku [LICENSE].

## Autor

- GitHub: [@m4jorskyy](https://github.com/m4jorskyy)
- Kontakt: igor.suchodolskii@gmail.com

---

*Projekt stworzony w celach edukacyjnych.*
