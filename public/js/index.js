const nameValue = $(".name-value");
const nameInput = $(".name-input")[0];
let inputValueLength = nameInput.value.length;

$(".name-value").on("click", () => {
  nameInput.selectionStart = inputValueLength;
  nameInput.selectionEnd = inputValueLength;
  nameInput.focus();
});

$(".name-input").on("keyup", (e) => {
  const currentValue = e.target.value;
  const url = new URL(window.location.href);

  nameValue.children("span.value").text(currentValue);
  url.searchParams.set("name", currentValue);
  window.history.pushState(null, "", url);

  if (!nameInput.value.length) $(".click-here").fadeIn();
  else $(".click-here").fadeOut();
});

$(".name-input").on("focus", () => {
  nameValue.addClass("focus");
});

$(".name-input").on("blur", () => {
  nameValue.removeClass("focus");
});

if (!nameInput.value.length) $(".click-here").show();
else $(".click-here").hide();
