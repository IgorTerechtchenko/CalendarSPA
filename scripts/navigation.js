function handleUrl(url) {
  document
      .querySelectorAll("a.active")
      .forEach(function(el){el.classList.remove("active");});
  document
    .querySelectorAll('a[href="' + url.split("#").pop() + '"]')
    .forEach(el => el.classList.add("active"));
  console.log(url.split('#').pop());
  updateContent(url.split('#').pop());
}

document.body.addEventListener("click", function(ev) {
  if (!ev.target.matches("a")) {
    return;
  }
  ev.preventDefault();
  var url = ev.target.getAttribute("href");
  window.location.hash = url;
});
