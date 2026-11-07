import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ROUTES = {
    'home': 'index.html',
    'services': 'services.html',
    'our-work': 'work.html',
    'work': 'work.html',
    'about-us': 'about.html',
    'about': 'about.html',
    'contact': 'contact.html'
}

for route, src_file in ROUTES.items():
    route_dir = os.path.join(BASE_DIR, route)
    os.makedirs(route_dir, exist_ok=True)
    src_path = os.path.join(BASE_DIR, src_file)
    dst_path = os.path.join(route_dir, 'index.html')
    shutil.copyfile(src_path, dst_path)
    print(f"Copied {src_file} -> {route}/index.html")

print("Route sync completed successfully.")

