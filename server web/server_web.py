import socket
import os
import gzip
import json
import threading

def handle_client(clientsocket):
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        if not data:
            break
        cerere += data.decode()
        if '\r\n\r\n' in cerere:
            break
    print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
    linieDeStart = cerere.split('\r\n')[0]
    print('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
    parts = linieDeStart.split(" ")
    if len(parts) < 2:
        clientsocket.close()
        return
    method = parts[0]
    path = parts[1]
    if method == 'POST' and path == '/api/utilizatori':
        try:
            body = cerere.split('\r\n\r\n', 1)[1]   
            data_json = json.loads(body)
            json_path = os.path.join(os.path.dirname(os.getcwd()), 'continut', 'resurse', 'utilizatori.json')
            if os.path.exists(json_path):
                with open(json_path, 'r', encoding='utf-8') as file:
                    utilizatori = json.load(file)
            else:
                utilizatori = []
            utilizatori.append(data_json)
            with open(json_path, 'w', encoding='utf-8') as file:
                json.dump(utilizatori, file)
            httpResponse = "HTTP/1.1 200 OK\r\n\r\n"
            clientsocket.sendall(httpResponse.encode())
        except Exception as e:
            print(e)
        clientsocket.close()
        return
    filePath = os.path.join(os.path.dirname(os.getcwd()), 'continut', path.lstrip('/'))
    if os.path.exists(filePath):
        try:
            if filePath.endswith(('.html', '.css', '.js', '.json')):
                with open(filePath, 'r', encoding='utf-8') as file:
                    content = file.read()
                compressedContent = gzip.compress(content.encode('utf-8'))
                httpResponse = "HTTP/1.1 200 OK\r\n"
                if filePath.endswith('.html'):
                    httpResponse += "Content-Type: text/html; charset=utf-8\r\n"
                elif filePath.endswith('.css'):
                    httpResponse += "Content-Type: text/css\r\n"
                elif filePath.endswith('.js'):
                    httpResponse += "Content-Type: application/javascript\r\n"
                elif filePath.endswith('.json'):
                    httpResponse += "Content-Type: application/json; charset=utf-8\r\n"
                httpResponse += "Content-Encoding: gzip\r\n"
                httpResponse += f"Content-Length: {len(compressedContent)}\r\n\r\n"
                clientsocket.sendall(httpResponse.encode())
                clientsocket.sendall(compressedContent)
            else:
                with open(filePath, 'rb') as file:
                    content = file.read()
                compressedContent = gzip.compress(content)
                httpResponse = "HTTP/1.1 200 OK\r\n"
                if filePath.endswith('.jpg'):
                    httpResponse += "Content-Type: image/jpeg\r\n"
                elif filePath.endswith('.ico'):
                    httpResponse += "Content-Type: image/x-icon\r\n"
                httpResponse += "Content-Encoding: gzip\r\n"
                httpResponse += f"Content-Length: {len(compressedContent)}\r\n\r\n"
                clientsocket.sendall(httpResponse.encode())
                clientsocket.sendall(compressedContent)
        except Exception as e:
            clientsocket.sendall(b"HTTP/1.1 500 Internal Server Error\r\n\r\n")
    else:
        httpResponse = "HTTP/1.1 404 Not Found\r\n\r\n"
        clientsocket.sendall(httpResponse.encode())

    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.')

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5678))
serversocket.listen(5)

while True:
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')
    clientsocket, address = serversocket.accept()
    print('S-a conectat un client.')
    clientThread = threading.Thread(target=handle_client, args=(clientsocket,))
    clientThread.start()
