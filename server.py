import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

ROUTE_MAP = {
    "": "index.html",
    "/": "index.html",
    "/home": "index.html",
    "/services": "services.html",
    "/our-work": "work.html",
    "/work": "work.html",
    "/about-us": "about.html",
    "/about": "about.html",
    "/contact": "contact.html",
}

class CleanURLHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Extract path without query parameters
        parts = self.path.split("?")
        req_path = parts[0].rstrip("/")
        query = ("?" + parts[1]) if len(parts) > 1 else ""

        # Check route map
        if req_path in ROUTE_MAP:
            target = ROUTE_MAP[req_path]
            self.path = "/" + target + query
        elif not os.path.splitext(req_path)[1]:
            # No extension - check if .html exists
            clean_name = req_path.lstrip("/")
            candidate = os.path.join(DIRECTORY, clean_name + ".html")
            if os.path.isfile(candidate):
                self.path = "/" + clean_name + ".html" + query

        return super().do_GET()

    def do_HEAD(self):
        parts = self.path.split("?")
        req_path = parts[0].rstrip("/")
        query = ("?" + parts[1]) if len(parts) > 1 else ""

        if req_path in ROUTE_MAP:
            target = ROUTE_MAP[req_path]
            self.path = "/" + target + query
        elif not os.path.splitext(req_path)[1]:
            clean_name = req_path.lstrip("/")
            candidate = os.path.join(DIRECTORY, clean_name + ".html")
            if os.path.isfile(candidate):
                self.path = "/" + clean_name + ".html" + query

        return super().do_HEAD()

class ThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

def run():
    # Bind to 0.0.0.0 so all loopbacks (127.0.0.1, localhost, ::1) connect seamlessly
    server_address = ("0.0.0.0", PORT)
    with ThreadingTCPServer(server_address, CleanURLHTTPRequestHandler) as httpd:
        print(f"--- SAGAR DIGITAL MARKETING Server Running ---")
        print(f"Local URL: http://localhost:{PORT}")
        print(f"IP URL:    http://127.0.0.1:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.server_close()

if __name__ == "__main__":
    run()

