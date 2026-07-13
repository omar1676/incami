EXTRA_PRICE = 5

ORDERED_IDS = [
  'arg-away-26-27','arg-training-26-27','arg-goat-26-27',
  'bra-home-26-27','bra-away-26-27','bra-gk-green-26-27',
  'fra-away-26-27','eng-home-26-27','eng-special-26-27','eng-training-26-27',
  'por-gk-green-26-27','por-gk-pink-26-27','por-gk-grey-26-27','por-goat-26-27',
  'esp-away-26-27','ger-home-26-27','col-home-26-27',
  'ned-home-26-27','ned-away-26-27','cro-home-26-27','cro-away-26-27',
  'jpn-away-26-27','kor-away-26-27','nor-home-26-27','nor-away-26-27',
  'jam-away-26-27','rm-home-26-27','bar-home-26-27','bar-special-26-27',
  'bar-training-26-27','manu-home-26-27','manu-graffiti-26-27','mancity-home-26-27',
  'ars-home-26-27','ars-away-26-27','acm-home-26-27','acm-away-26-27',
  'psg-white-26-27','psg-beige-training-26-27','tot-training-26-27',
  'ben-third-26-27','cel-home-26-27','lag-home-26-27','fla-home-26-27',
  'pal-home-26-27','pal-away-26-27','liv-training-24-26','por-special-25-26',
]

def get_product_by_index(idx):
    if 0 <= idx < len(ORDERED_IDS):
        pid = ORDERED_IDS[idx]
        return pid, CATALOG.get(pid)
    return None, None

CATALOG = {
  "arg-away-26-27":      {"name": "Argentina Visitante 26-27",               "price": 30},
  "arg-training-26-27":  {"name": "Argentina Entrenamiento 26-27",           "price": 25},
  "arg-goat-26-27":      {"name": "Argentina Edición GOAT 26-27",            "price": 35},
  "bra-home-26-27":      {"name": "Brasil Local 26-27",                      "price": 30},
  "bra-away-26-27":      {"name": "Brasil Visitante 26-27",                  "price": 30},
  "bra-gk-green-26-27":  {"name": "Brasil Arquero Verde 26-27",              "price": 30},
  "fra-away-26-27":      {"name": "Francia Visitante 26-27",                 "price": 30},
  "eng-home-26-27":      {"name": "Inglaterra Local 26-27",                  "price": 30},
  "eng-special-26-27":   {"name": "Inglaterra Edición Especial 26-27",       "price": 35},
  "eng-training-26-27":  {"name": "Inglaterra Entrenamiento 26-27",          "price": 25},
  "por-gk-green-26-27":  {"name": "Portugal Arquero Verde 26-27",            "price": 30},
  "por-gk-pink-26-27":   {"name": "Portugal Arquero Rosa 26-27",             "price": 30},
  "por-gk-grey-26-27":   {"name": "Portugal Arquero Gris 26-27",             "price": 30},
  "por-goat-26-27":      {"name": "Portugal Edición GOAT 26-27",             "price": 35},
  "esp-away-26-27":      {"name": "España Visitante 26-27",                  "price": 30},
  "ger-home-26-27":      {"name": "Alemania Local 26-27",                    "price": 30},
  "col-home-26-27":      {"name": "Colombia Local 26-27",                    "price": 30},
  "ned-home-26-27":      {"name": "Países Bajos Local 26-27",                "price": 30},
  "ned-away-26-27":      {"name": "Países Bajos Visitante 26-27",            "price": 30},
  "cro-home-26-27":      {"name": "Croacia Local 26-27",                     "price": 30},
  "cro-away-26-27":      {"name": "Croacia Visitante 26-27",                 "price": 30},
  "jpn-away-26-27":      {"name": "Japón Visitante 26-27",                   "price": 30},
  "kor-away-26-27":      {"name": "Corea del Sur Visitante 26-27",           "price": 30},
  "nor-home-26-27":      {"name": "Noruega Local 26-27",                     "price": 30},
  "nor-away-26-27":      {"name": "Noruega Visitante 26-27",                 "price": 30},
  "jam-away-26-27":      {"name": "Jamaica Visitante 26-27",                 "price": 30},
  "rm-home-26-27":       {"name": "Real Madrid Local 26-27",                 "price": 30},
  "bar-home-26-27":      {"name": "Barcelona Local 26-27",                   "price": 30},
  "bar-special-26-27":   {"name": "Barcelona Edición Especial 26-27",        "price": 35},
  "bar-training-26-27":  {"name": "Barcelona Entrenamiento 26-27",           "price": 25},
  "manu-home-26-27":     {"name": "Manchester United Local 26-27",           "price": 30},
  "manu-graffiti-26-27": {"name": "Manchester United Edición Grafiti 26-27", "price": 35},
  "mancity-home-26-27":  {"name": "Manchester City Local 26-27",             "price": 30},
  "ars-home-26-27":      {"name": "Arsenal Local 26-27",                     "price": 30},
  "ars-away-26-27":      {"name": "Arsenal Visitante 26-27",                 "price": 30},
  "acm-home-26-27":      {"name": "AC Milan Local 26-27",                    "price": 30},
  "acm-away-26-27":      {"name": "AC Milan Visitante 26-27",                "price": 30},
  "psg-white-26-27":     {"name": "PSG Blanco Edición Especial 26-27",       "price": 35},
  "psg-beige-training-26-27": {"name": "PSG Entrenamiento Beige 26-27",      "price": 25},
  "tot-training-26-27":  {"name": "Tottenham Entrenamiento 26-27",           "price": 25},
  "ben-third-26-27":     {"name": "Benfica Tercera Equipación 26-27",        "price": 30},
  "cel-home-26-27":      {"name": "Celtic Local 26-27",                      "price": 30},
  "lag-home-26-27":      {"name": "LA Galaxy Local 26-27",                   "price": 30},
  "fla-home-26-27":      {"name": "Flamengo Local 26-27",                    "price": 30},
  "pal-home-26-27":      {"name": "Palmeiras Local 26-27",                   "price": 30},
  "pal-away-26-27":      {"name": "Palmeiras Visitante 26-27",               "price": 30},
  "liv-training-24-26":  {"name": "Liverpool Entrenamiento 24-26",           "price": 25},
  "por-special-25-26":   {"name": "Portugal Edición Especial 25-26",         "price": 35},
}

def get_product(product_id):
    return CATALOG.get(product_id)

def calculate_item_price(product_id, extras=None):
    product = get_product(product_id)
    if not product:
        return 0
    base = product["price"]
    if extras:
        if extras.get("parche"):  base += EXTRA_PRICE
        if extras.get("numero"):  base += EXTRA_PRICE
        if extras.get("nombre"):  base += EXTRA_PRICE
    return base

def calculate_total(items):
    total = 0
    for item in items:
        unit = calculate_item_price(item["id"], item.get("extras"))
        total += unit * item.get("qty", 1)
    return total
