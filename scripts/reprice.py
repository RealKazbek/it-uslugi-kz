"""One-off round-2 repricing: rewrites price_from_kzt in catalog fixtures and prints an old -> new markdown table."""
import glob
import json
import math

FACTOR = {
    'websites': 0.42, 'ecommerce': 0.42, 'apps': 0.45, 'design': 0.5,
    'bots': 0.55, 'ai': 0.55, 'automation': 0.55, 'seo-maps': 0.55,
    'devops': 0.6, 'support': 0.6, 'onsite': 0.65, 'education': 0.8,
}
OVERRIDE = {'lending': 40000, 'telegram-bot-zayavki': 25000, 'sait-vizitka': 55000}


def nice(value: float) -> int:
    """Round to a price-like number: step 500 below 10k, 1000 below 50k, 5000 below 200k, else 10000."""
    step = 500 if value < 10000 else 1000 if value < 50000 else 5000 if value < 200000 else 10000
    return max(2000, int(math.floor(value / step + 0.5) * step))


rows = []
for path in sorted(glob.glob('backend/catalog/fixtures/products/*.json')):
    with open(path, encoding='utf-8') as fh:
        data = json.load(fh)
    old = data['price_from_kzt']
    new = OVERRIDE.get(data['slug']) or nice(old * FACTOR[data['category']])
    data['price_from_kzt'] = new
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write('\n')
    rows.append((data['category'], data['slug'], old, new))

print('| Category | Product | Old, ₸ | New, ₸ | Change |\n|---|---|---:|---:|---:|')
for cat, slug, old, new in sorted(rows):
    print(f'| {cat} | {slug} | {old:,} | {new:,} | {round((new / old - 1) * 100)}% |'.replace(',', ' '))
