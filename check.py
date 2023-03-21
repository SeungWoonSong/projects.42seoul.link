import requests

def check_site(site_name):
    try:
        response = requests.get(f'https://{site_name}', timeout=5)
        if response.status_code == 200 or response.status_code == 401:
            return True
        elif response.status_code == 301 or response.status_code == 302:
            redirect_url = response.headers['location']
            redirect_response = requests.get(redirect_url, timeout=5)
            return redirect_response.status_code == 200
        else:
            return False
    except requests.exceptions.RequestException:
        return False
