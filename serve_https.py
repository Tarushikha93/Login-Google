import http.server
import ssl
import socketserver
import os


PORT = int(os.environ.get("PORT", "8443"))
DIRECTORY = os.environ.get("DIRECTORY", ".")
CERT_FILE = os.environ.get("CERT_FILE", "cert.pem")
KEY_FILE = os.environ.get("KEY_FILE", "key.pem")


class StaticHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


def run_server():
    httpd = socketserver.TCPServer(("0.0.0.0", PORT), StaticHandler)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    print(f"Serving HTTPS on https://localhost:{PORT}/ (dir: {os.path.abspath(DIRECTORY)})")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__ == "__main__":
    run_server()


