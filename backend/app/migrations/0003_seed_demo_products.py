from django.db import migrations


PRODUCTS = [
    {
        'id': 'cam-dart-01', 'slug': 'camzon-dart-basin-mixer', 'title': 'CAMZON DART',
        'subtitle': 'Aerodynamic single lever basin mixer in solid brass.', 'category': 'DART',
        'price': 1599, 'original_price': 2280, 'rating': 4.9, 'reviews_count': 134,
        'is_sale': True, 'is_featured': True, 'badge': 'Popular', 'stock_count': 40,
        'sku': 'CMZ-DRT-01', 'images': ['faucet_aurelia', 'featured_faucet', 'our_design_faucet'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Matte Graphite', 'hex': '#1C1917'}, {'name': 'Brushed Gold', 'hex': '#D4AF37'}],
        'description': 'Precision aerodynamic contours and a forward-raked stance meet a solid brass core and ceramic disc cartridge.',
        'story': 'A streamlined profile designed to bring architectural movement to the vanity.',
        'details': ['Solid forged brass body', 'Ceramic disc cartridge', 'Deck-mounted installation', '10-year manufacturer warranty'],
        'specs': {'dimensions': 'Height: 185mm | Spout reach: 140mm', 'materials': 'Solid forged brass', 'finish': 'Chrome / graphite / gold', 'weight': '1.85 kg', 'assembly': 'Single-hole deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-drt-1', 'author': 'Arjun S.', 'rating': 5, 'date': 'March 2026', 'title': 'Solid finish', 'comment': 'The finish is excellent and the lever feels smooth.', 'verified': True}],
    },
    {
        'id': 'cam-dart-02', 'slug': 'camzon-dart-tall-mixer', 'title': 'CAMZON DART TALL',
        'subtitle': 'Elevated mixer designed for countertop vessel basins.', 'category': 'DART',
        'price': 1849, 'original_price': 2640, 'rating': 4.8, 'reviews_count': 88,
        'is_sale': True, 'is_featured': True, 'stock_count': 28, 'sku': 'CMZ-DRT-02',
        'images': ['our_design_faucet', 'faucet_aurelia'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Matte Graphite', 'hex': '#1C1917'}],
        'description': 'A taller version of the DART silhouette with clearance for vessel bowls and a smooth single-lever control.',
        'story': 'Designed to pair with above-counter stone basins.',
        'details': ['Vessel basin clearance', 'Water-saving aerator', 'Braided inlet hoses'],
        'specs': {'dimensions': 'Height: 295mm | Spout reach: 165mm', 'materials': 'Heavy cast brass', 'finish': 'Polished chrome', 'weight': '2.3 kg', 'assembly': 'Deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-drt-2', 'author': 'Pooja K.', 'rating': 5, 'date': 'February 2026', 'title': 'Great height', 'comment': 'The height is a good fit for our vessel basin.', 'verified': True}],
    },
    {
        'id': 'cam-deck-01', 'slug': 'camzon-deck-three-hole-mixer', 'title': 'CAMZON DECK 3-HOLE',
        'subtitle': 'Widespread deck mixer with independent hot and cold handles.', 'category': 'DECK',
        'price': 2199, 'original_price': 3140, 'rating': 4.8, 'reviews_count': 94,
        'is_sale': True, 'is_featured': True, 'badge': 'Executive', 'stock_count': 25,
        'sku': 'CMZ-DCK-01', 'images': ['featured_faucet', 'our_design_faucet'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Brushed Gold', 'hex': '#D4AF37'}, {'name': 'Matte Black', 'hex': '#1C1917'}],
        'description': 'A three-hole faucet set with dual independent controls and a gently arched spout.',
        'story': 'A classic widespread layout for larger vanity tops.',
        'details': ['Three-hole installation', 'Ceramic disc valves', 'Brass pop-up waste included'],
        'specs': {'dimensions': 'Spout height: 160mm | Reach: 155mm', 'materials': 'Solid brass', 'finish': 'Chrome / gold', 'weight': '2.95 kg', 'assembly': 'Three-hole deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-deck-1', 'author': 'Meera N.', 'rating': 5, 'date': 'January 2026', 'title': 'Beautiful on marble', 'comment': 'The widespread layout fits our vanity well.', 'verified': True}],
    },
    {
        'id': 'cam-duero-01', 'slug': 'camzon-duero-wall-mixer', 'title': 'CAMZON DUERO',
        'subtitle': 'Minimal wall mixer with clean lines and precise control.', 'category': 'DUERO',
        'price': 2499, 'original_price': 3490, 'rating': 4.7, 'reviews_count': 52,
        'is_sale': True, 'stock_count': 19, 'sku': 'CMZ-DUR-01',
        'images': ['featured_faucet', 'why_faucet_water'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Brushed Gold', 'hex': '#D4AF37'}],
        'description': 'A compact wall-mounted mixer with smooth ceramic control and a durable brass construction.',
        'story': 'A restrained silhouette that keeps the countertop clear.',
        'details': ['Wall-mounted installation', 'Ceramic disc control', 'Corrosion-resistant finish'],
        'specs': {'dimensions': 'Projection: 180mm', 'materials': 'Brass', 'finish': 'Chrome / gold', 'weight': '2.1 kg', 'assembly': 'Wall mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-duero-1', 'author': 'Nikhil R.', 'rating': 5, 'date': 'February 2026', 'title': 'Clean design', 'comment': 'Looks neat and is easy to operate.', 'verified': True}],
    },
    {
        'id': 'cam-dune-01', 'slug': 'camzon-dune-rain-shower', 'title': 'CAMZON DUNE',
        'subtitle': 'Wide rainfall shower head for a balanced water flow.', 'category': 'DUNE',
        'price': 3299, 'original_price': 4590, 'rating': 4.8, 'reviews_count': 71,
        'is_sale': True, 'is_featured': True, 'stock_count': 17, 'sku': 'CMZ-DUN-01',
        'images': ['featured_shower', 'why_rain_shower'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Matte Graphite', 'hex': '#1C1917'}],
        'description': 'A broad overhead shower plate designed to distribute water evenly across the spray face.',
        'story': 'A calm rainfall experience with a simple architectural profile.',
        'details': ['Easy-clean silicone nozzles', 'Wide spray coverage', 'Wall or ceiling compatible'],
        'specs': {'dimensions': '300mm diameter', 'materials': 'Stainless steel and brass', 'finish': 'Chrome / graphite', 'weight': '2.6 kg', 'assembly': 'Wall or ceiling mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-dune-1', 'author': 'Rohan M.', 'rating': 5, 'date': 'March 2026', 'title': 'Even coverage', 'comment': 'The spray feels evenly distributed.', 'verified': True}],
    },
    {
        'id': 'cam-facet-01', 'slug': 'camzon-facet-basin-mixer', 'title': 'CAMZON FACET',
        'subtitle': 'Geometric basin mixer with crisp faceted surfaces.', 'category': 'FACET',
        'price': 1999, 'original_price': 2790, 'rating': 4.6, 'reviews_count': 36,
        'is_sale': True, 'stock_count': 22, 'sku': 'CMZ-FCT-01',
        'images': ['featured_basin', 'our_design_faucet'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Matte Black', 'hex': '#1C1917'}],
        'description': 'Defined edges and a compact footprint give this basin mixer a distinctive geometric character.',
        'story': 'Inspired by precision-cut architectural forms.',
        'details': ['Solid brass construction', 'Single-lever ceramic cartridge', 'Anti-splash aerator'],
        'specs': {'dimensions': 'Height: 175mm | Reach: 135mm', 'materials': 'Solid brass', 'finish': 'Chrome / black', 'weight': '1.9 kg', 'assembly': 'Single-hole deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-facet-1', 'author': 'Anjali P.', 'rating': 5, 'date': 'January 2026', 'title': 'Sharp details', 'comment': 'The clean geometry looks great in our bathroom.', 'verified': True}],
    },
    {
        'id': 'cam-kore-01', 'slug': 'camzon-kore-pillar-tap', 'title': 'CAMZON KORE',
        'subtitle': 'Compact pillar tap with a tactile quarter-turn handle.', 'category': 'KORE',
        'price': 999, 'original_price': 1390, 'rating': 4.5, 'reviews_count': 28,
        'is_sale': True, 'stock_count': 48, 'sku': 'CMZ-KOR-01',
        'images': ['why_faucet_water', 'faucet_aurelia'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}],
        'description': 'A straightforward cold-water tap with a compact brass body for utility and guest basins.',
        'story': 'Simple, reliable control for everyday spaces.',
        'details': ['Quarter-turn ceramic valve', 'Compact profile', 'Easy deck installation'],
        'specs': {'dimensions': 'Height: 145mm | Reach: 115mm', 'materials': 'Lead-free brass', 'finish': 'Chrome', 'weight': '1.2 kg', 'assembly': 'Pillar mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-kore-1', 'author': 'Vikram R.', 'rating': 5, 'date': 'February 2026', 'title': 'Easy to use', 'comment': 'The handle turns smoothly and feels sturdy.', 'verified': True}],
    },
    {
        'id': 'cam-quadra-01', 'slug': 'camzon-quadra-basin-mixer', 'title': 'CAMZON QUADRA',
        'subtitle': 'Right-angle silhouette for contemporary vanity spaces.', 'category': 'QUADRA',
        'price': 2399, 'original_price': 3390, 'rating': 4.8, 'reviews_count': 43,
        'is_sale': True, 'is_featured': True, 'stock_count': 15, 'sku': 'CMZ-QDR-01',
        'images': ['featured_basin', 'featured_faucet'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Brushed Gold', 'hex': '#D4AF37'}],
        'description': 'Planar surfaces and a square profile pair with modern stone and ceramic basins.',
        'story': 'A study in crisp lines and proportion.',
        'details': ['Solid brass body', 'Ceramic disc cartridge', 'Water-saving aerator'],
        'specs': {'dimensions': 'Height: 190mm | Reach: 145mm', 'materials': 'Solid brass', 'finish': 'Chrome / gold', 'weight': '2.0 kg', 'assembly': 'Single-hole deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-quadra-1', 'author': 'Sanjay K.', 'rating': 5, 'date': 'March 2026', 'title': 'Great proportions', 'comment': 'The squared shape works well with our basin.', 'verified': True}],
    },
    {
        'id': 'cam-ridge-01', 'slug': 'camzon-ridge-knurled-mixer', 'title': 'CAMZON RIDGE',
        'subtitle': 'Textured control detail with a sculpted brass form.', 'category': 'RIDGE',
        'price': 2799, 'original_price': 3890, 'rating': 4.7, 'reviews_count': 31,
        'is_sale': True, 'stock_count': 12, 'sku': 'CMZ-RDG-01',
        'images': ['our_design_faucet', 'our_tech_valve'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Brushed Gold', 'hex': '#D4AF37'}],
        'description': 'A tactile mixer with linear detailing and a smooth ceramic cartridge.',
        'story': 'Machined texture adds grip and visual depth to a familiar form.',
        'details': ['Textured lever detail', 'Solid brass construction', 'Ceramic disc cartridge'],
        'specs': {'dimensions': 'Height: 185mm | Reach: 140mm', 'materials': 'Solid brass', 'finish': 'Chrome / gold', 'weight': '2.1 kg', 'assembly': 'Single-hole deck mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-ridge-1', 'author': 'Leena S.', 'rating': 5, 'date': 'January 2026', 'title': 'Nice tactile finish', 'comment': 'The handle detail feels premium.', 'verified': True}],
    },
    {
        'id': 'cam-showers-01', 'slug': 'camzon-showers-hand-shower-set', 'title': 'CAMZON SHOWERS',
        'subtitle': 'Hand shower set with flexible hose and adjustable spray.', 'category': 'SHOWERS',
        'price': 1899, 'original_price': 2690, 'rating': 4.9, 'reviews_count': 107,
        'is_sale': True, 'is_featured': True, 'badge': 'Best Seller', 'stock_count': 33,
        'sku': 'CMZ-SHW-01', 'images': ['why_hand_shower', 'featured_shower', 'why_rain_shower'],
        'colors': [{'name': 'Mirror Chrome', 'hex': '#E5E7EB'}, {'name': 'Matte Graphite', 'hex': '#1C1917'}],
        'description': 'A versatile hand shower with a flexible hose and easy-clean spray face.',
        'story': 'Flexible coverage for daily rinsing and shower routines.',
        'details': ['Flexible stainless hose', 'Adjustable spray modes', 'Wall bracket included'],
        'specs': {'dimensions': 'Handset: 220mm | Hose: 1.5m', 'materials': 'ABS handset and stainless hose', 'finish': 'Chrome / graphite', 'weight': '1.1 kg', 'assembly': 'Wall bracket mount', 'origin': 'Karamana, India'},
        'reviews': [{'id': 'rev-shw-1', 'author': 'Afrin', 'rating': 5, 'date': 'March 2026', 'title': 'Comfortable spray', 'comment': 'Good coverage and easy to hold.', 'verified': True}],
    },
]


def seed_products(apps, schema_editor):
    Product = apps.get_model('app', 'Product')
    for product in PRODUCTS:
        Product.objects.update_or_create(id=product['id'], defaults=product)


def remove_seed_products(apps, schema_editor):
    Product = apps.get_model('app', 'Product')
    Product.objects.filter(id__in=[product['id'] for product in PRODUCTS]).delete()


class Migration(migrations.Migration):
    dependencies = [('app', '0002_product')]

    operations = [migrations.RunPython(seed_products, remove_seed_products)]