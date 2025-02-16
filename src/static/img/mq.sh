
sed -i '.bak' \
-e '1s/^<svg .* fill="#e4e4e4"[^>]*>/&\
	<style>@media (prefers-color-scheme: light) { path { fill: #2c2c2c } }<\/style>\
/' \
-e '1s/^<svg .* stroke="#e4e4e4"[^>]*>/&\
	<style>@media (prefers-color-scheme: light) { path { stroke: #2c2c2c } }<\/style>\
/' \
-e '1s/^<svg .* fill="#ffd700"[^>]*>/&\
	<style>@media (prefers-color-scheme: light) { path { fill: #ffae00 } }<\/style>\
/' \
-e '1s/^<svg .* fill="#88ff76"[^>]*>/&\
	<style>@media (prefers-color-scheme: light) { path { fill: #31cd31 } }<\/style>\
/' "${@}"
