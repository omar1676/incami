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
  "arg-away-26-27":      {"name": "Argentina Visitante 26-27",               "price": 30, "image": "https://photo.yupoo.com/dingyi-888/0967315c66/medium.jpeg"},
  "arg-training-26-27":  {"name": "Argentina Entrenamiento 26-27",           "price": 25, "image": "https://photo.yupoo.com/dingyi-888/8641b855/medium.jpeg"},
  "arg-goat-26-27":      {"name": "Argentina Edición GOAT 26-27",            "price": 35, "image": "https://photo.yupoo.com/dingyi-888/596ef4b3/medium.jpeg"},
  "bra-home-26-27":      {"name": "Brasil Local 26-27",                      "price": 30, "image": "https://photo.yupoo.com/dingyi-888/79cfe11ae0/medium.jpeg"},
  "bra-away-26-27":      {"name": "Brasil Visitante 26-27",                  "price": 30, "image": "https://photo.yupoo.com/dingyi-888/1ffb3b5679/medium.jpeg"},
  "bra-gk-green-26-27":  {"name": "Brasil Arquero Verde 26-27",              "price": 30, "image": "https://photo.yupoo.com/dingyi-888/b44a1ce869/medium.jpeg"},
  "fra-away-26-27":      {"name": "Francia Visitante 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/36d84951ec/medium.jpeg"},
  "eng-home-26-27":      {"name": "Inglaterra Local 26-27",                  "price": 30, "image": "https://photo.yupoo.com/dingyi-888/020adeab19/medium.jpeg"},
  "eng-special-26-27":   {"name": "Inglaterra Edición Especial 26-27",       "price": 35, "image": "https://photo.yupoo.com/dingyi-888/45982f11ed/medium.jpeg"},
  "eng-training-26-27":  {"name": "Inglaterra Entrenamiento 26-27",          "price": 25, "image": "https://photo.yupoo.com/dingyi-888/ca15dd62da/medium.jpeg"},
  "por-gk-green-26-27":  {"name": "Portugal Arquero Verde 26-27",            "price": 30, "image": "https://photo.yupoo.com/dingyi-888/a134f258be/medium.jpeg"},
  "por-gk-pink-26-27":   {"name": "Portugal Arquero Rosa 26-27",             "price": 30, "image": "https://photo.yupoo.com/dingyi-888/664274063f/medium.jpeg"},
  "por-gk-grey-26-27":   {"name": "Portugal Arquero Gris 26-27",             "price": 30, "image": "https://photo.yupoo.com/dingyi-888/2e2f8c4c5f/medium.jpeg"},
  "por-goat-26-27":      {"name": "Portugal Edición GOAT 26-27",             "price": 35, "image": "https://photo.yupoo.com/dingyi-888/70da1f21/medium.jpeg"},
  "esp-away-26-27":      {"name": "España Visitante 26-27",                  "price": 30, "image": "https://photo.yupoo.com/dingyi-888/a5ab5303/medium.jpeg"},
  "ger-home-26-27":      {"name": "Alemania Local 26-27",                    "price": 30, "image": "https://photo.yupoo.com/dingyi-888/f2bccb6c/medium.jpeg"},
  "col-home-26-27":      {"name": "Colombia Local 26-27",                    "price": 30, "image": "https://photo.yupoo.com/dingyi-888/d49e0b49/medium.jpeg"},
  "ned-home-26-27":      {"name": "Países Bajos Local 26-27",                "price": 30, "image": "https://photo.yupoo.com/dingyi-888/2609fc167a/medium.jpeg"},
  "ned-away-26-27":      {"name": "Países Bajos Visitante 26-27",            "price": 30, "image": "https://photo.yupoo.com/dingyi-888/03d09a2ad9/medium.jpeg"},
  "cro-home-26-27":      {"name": "Croacia Local 26-27",                     "price": 30, "image": "https://photo.yupoo.com/dingyi-888/00627423db/medium.jpeg"},
  "cro-away-26-27":      {"name": "Croacia Visitante 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/bc7f6492cb/medium.jpeg"},
  "jpn-away-26-27":      {"name": "Japón Visitante 26-27",                   "price": 30, "image": "https://photo.yupoo.com/dingyi-888/41a265f5e9/medium.jpeg"},
  "kor-away-26-27":      {"name": "Corea del Sur Visitante 26-27",           "price": 30, "image": "https://photo.yupoo.com/dingyi-888/2e55be0427/medium.jpeg"},
  "nor-home-26-27":      {"name": "Noruega Local 26-27",                     "price": 30, "image": "https://photo.yupoo.com/dingyi-888/0defe7613e/medium.jpeg"},
  "nor-away-26-27":      {"name": "Noruega Visitante 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/6f3914cf75/medium.jpeg"},
  "jam-away-26-27":      {"name": "Jamaica Visitante 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/78c715d1/medium.jpeg"},
  "rm-home-26-27":       {"name": "Real Madrid Local 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/c2d883ba/medium.jpeg"},
  "bar-home-26-27":      {"name": "Barcelona Local 26-27",                   "price": 30, "image": "https://photo.yupoo.com/dingyi-888/d5c7f05e/medium.jpeg"},
  "bar-special-26-27":   {"name": "Barcelona Edición Especial 26-27",        "price": 35, "image": "https://photo.yupoo.com/dingyi-888/1bf8878a22/medium.jpeg"},
  "bar-training-26-27":  {"name": "Barcelona Entrenamiento 26-27",           "price": 25, "image": "https://photo.yupoo.com/dingyi-888/6f3ebd7650/medium.jpeg"},
  "manu-home-26-27":     {"name": "Manchester United Local 26-27",           "price": 30, "image": "https://photo.yupoo.com/dingyi-888/049ef99bbc/medium.jpeg"},
  "manu-graffiti-26-27": {"name": "Manchester United Edición Grafiti 26-27", "price": 35, "image": "https://photo.yupoo.com/dingyi-888/63694e82/medium.jpeg"},
  "mancity-home-26-27":  {"name": "Manchester City Local 26-27",             "price": 30, "image": "https://photo.yupoo.com/dingyi-888/d7313125/medium.jpeg"},
  "ars-home-26-27":      {"name": "Arsenal Local 26-27",                     "price": 30, "image": "https://photo.yupoo.com/dingyi-888/15c5f6c2/medium.jpeg"},
  "ars-away-26-27":      {"name": "Arsenal Visitante 26-27",                 "price": 30, "image": "https://photo.yupoo.com/dingyi-888/7bfaa2d966/medium.jpeg"},
  "acm-home-26-27":      {"name": "AC Milan Local 26-27",                    "price": 30, "image": "https://photo.yupoo.com/dingyi-888/adb5b2121a/medium.jpeg"},
  "acm-away-26-27":      {"name": "AC Milan Visitante 26-27",                "price": 30, "image": "https://photo.yupoo.com/dingyi-888/17cbc13e/medium.jpeg"},
  "psg-white-26-27":     {"name": "PSG Blanco Edición Especial 26-27",       "price": 35, "image": "https://photo.yupoo.com/dingyi-888/ba81148d/medium.jpeg"},
  "psg-beige-training-26-27": {"name": "PSG Entrenamiento Beige 26-27",      "price": 25, "image": "https://photo.yupoo.com/dingyi-888/b0b0c0df/medium.jpeg"},
  "tot-training-26-27":  {"name": "Tottenham Entrenamiento 26-27",           "price": 25, "image": "https://photo.yupoo.com/dingyi-888/59cac678/medium.jpeg"},
  "ben-third-26-27":     {"name": "Benfica Tercera Equipación 26-27",        "price": 30, "image": "https://photo.yupoo.com/dingyi-888/17074256/medium.jpeg"},
  "cel-home-26-27":      {"name": "Celtic Local 26-27",                      "price": 30, "image": "https://photo.yupoo.com/dingyi-888/b0ac9617/medium.jpeg"},
  "lag-home-26-27":      {"name": "LA Galaxy Local 26-27",                   "price": 30, "image": "https://photo.yupoo.com/dingyi-888/006e0ece/medium.jpeg"},
  "fla-home-26-27":      {"name": "Flamengo Local 26-27",                    "price": 30, "image": "https://photo.yupoo.com/dingyi-888/dae50255/medium.jpeg"},
  "pal-home-26-27":      {"name": "Palmeiras Local 26-27",                   "price": 30, "image": "https://photo.yupoo.com/dingyi-888/078f3143/medium.jpeg"},
  "pal-away-26-27":      {"name": "Palmeiras Visitante 26-27",               "price": 30, "image": "https://photo.yupoo.com/dingyi-888/f097dc90/medium.jpeg"},
  "liv-training-24-26":  {"name": "Liverpool Entrenamiento 24-26",           "price": 25, "image": "https://photo.yupoo.com/dingyi-888/2c286b84/medium.jpeg"},
  "por-special-25-26":   {"name": "Portugal Edición Especial 25-26",         "price": 35, "image": "https://photo.yupoo.com/dingyi-888/2cb864a6/medium.jpeg"},
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
