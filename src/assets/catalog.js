// Catalog filter and search. Without JavaScript the catalog is a plain list of cards.
(function () {
  var root = document.querySelector('[data-catalog]');
  if (!root) return;
  var cards = Array.prototype.slice.call(root.querySelectorAll('.card'));
  var cats = JSON.parse(root.getAttribute('data-cats') || '[]');
  var state = { cat: '', q: '' };

  var bar = document.createElement('div');
  bar.className = 'filters';
  var selId = 'f-cat';
  var qId = 'f-q';
  bar.innerHTML =
    '<label for="' + selId + '">' + root.getAttribute('data-label-cat') + '</label>' +
    '<select id="' + selId + '"></select>' +
    '<label for="' + qId + '">' + root.getAttribute('data-label-search') + '</label>' +
    '<input id="' + qId + '" type="search" autocomplete="off" placeholder="' + root.getAttribute('data-placeholder') + '">';
  var sel = bar.querySelector('select');
  var all = document.createElement('option');
  all.value = '';
  all.textContent = root.getAttribute('data-label-all');
  sel.appendChild(all);
  cats.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c.slug;
    o.textContent = c.name;
    sel.appendChild(o);
  });
  var list = root.querySelector('ul.grid');
  root.insertBefore(bar, list);

  var empty = document.createElement('p');
  empty.className = 'empty';
  empty.hidden = true;
  empty.setAttribute('role', 'status');
  empty.textContent = root.getAttribute('data-empty');
  root.appendChild(empty);

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var okCat = !state.cat || card.getAttribute('data-cat') === state.cat;
      var okQ = !state.q || card.getAttribute('data-q').indexOf(state.q) !== -1;
      card.hidden = !(okCat && okQ);
      if (!card.hidden) shown++;
    });
    empty.hidden = shown !== 0;
  }
  sel.addEventListener('change', function () { state.cat = sel.value; apply(); });
  bar.querySelector('input').addEventListener('input', function (e) {
    state.q = e.target.value.trim().toLowerCase();
    apply();
  });
})();
