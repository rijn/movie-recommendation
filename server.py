from eve import Eve
from flask import send_from_directory
from werkzeug.routing import BaseConverter

app = Eve(__name__, static_folder = 'build')

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

@app.route('/')
def send_index():
  return send_from_directory('build', 'index.html')

@app.route('/<regex("(?!api)[a-z0-9-_/.]*"):path>')
def send_static(path):
  print(path)
  return send_from_directory('build', path)

if __name__ == '__main__':
  app.run()