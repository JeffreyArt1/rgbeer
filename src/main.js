let doc = document.getElementById('selecta');
let span = document.getElementById('text');
let docStyle = doc.style;
let raiz = (a, b) => Math.round(Math.sqrt(a ** 2 + b ** 2));
let hex = (number) => {
  let tmp = number.toString(16);
  return tmp.length >= 2 ? tmp : '0' + tmp;
};

let color = '';
let imageUrl = '';

let r = 0;
let g = 0;
let b = 0;

let height = window.screen.availHeight;
let width = window.screen.availWidth;
let diag = raiz(width, height);

const generator = () => {
  let e = window.event;
  let x = e.clientX;
  let y = e.clientY;

  let rx = width / 255;
  let ry = height / 255;
  let rxy = diag / 255;

  r = Math.floor(y / ry);
  g = Math.floor(x / rx);
  b = 255 - Math.floor(raiz(x, y) / rxy);

  color = hex(r) + hex(g) + hex(b);

  docStyle.backgroundImage = `linear-gradient(#${color}, #${color})`;
  span.textContent = '#' + color.toUpperCase();
};

let docEventListener = document.addEventListener('mousemove', generator);

let clicSearch = document.addEventListener('click', async () => {
  fetch(
    `https://www.stocksy.com/search/query?sort=relevance&type=static&page=1&pageSize=100&filters=%7B"colorHex"%3A"${color}"%2C"text"%3A"*"%7D&null=`
  )
    .then((resp) => resp.json())
    .then(
      (data) =>
        (imageUrl =
          data.response.items[Math.floor(Math.random() * 100)].variations
            .jpgFixedHeightExtraLarge.url)
    )
    .then(
      () =>
        (docStyle.backgroundImage = `linear-gradient(#${color}55, #${color}55), url('${imageUrl}')`)
    );
});
