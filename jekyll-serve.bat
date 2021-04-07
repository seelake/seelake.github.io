REM test locally
docker run --rm  --volume="C:\Users\raffaele.turra\OneDrive\projects\seelake\seelake.github.io:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll  jekyll serve --config _config.yml,_config_dev.yml --watch

REM build online
docker run --rm  --volume="C:\Users\raffaele.turra\OneDrive\projects\seelake\seelake.github.io:/srv/jekyll" -it jekyll/jekyll jekyll build --config _config.yml --watch