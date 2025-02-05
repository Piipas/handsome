const nameValue = $(".name-value");
const nameInput = $(".name-input")[0];
let inputValueLength = nameInput.value.length;
const complimentValue = $(".compliment");

const complimentValues = [
  {
    gender: "male",
    compliment: "handsome",
    color: "#87CEEB",
    foreground: "#FD79A8",
    emoji: "😎",
  },
  {
    gender: "female",
    compliment: "Gorgeous",
    color: "#FD79A8",
    foreground: "#87CEEB",
    emoji: "😍",
  },
];

const url = new URL(window.location.href);
const gender = url.searchParams.get("gender");
const locked = url.searchParams.get("locked");

const currentComplimentValue = complimentValues.find((compliment) =>
  gender ? compliment.gender == gender : compliment.gender == "male",
);

complimentValue.text(currentComplimentValue.compliment);
$("body").css("background-color", currentComplimentValue.color);
$(".emoji").text(currentComplimentValue.emoji);

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

  if (!nameInput.value.length || !locked) $(".click-here").fadeIn();
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

$(".compliment").on("click", () => {
  const url = new URL(window.location.href);
  const gender = url.searchParams.get("gender");
  const currentComplimentValue = complimentValues.find((compliment) =>
    gender ? compliment.gender == gender : compliment.gender == "male",
  );

  const currentComplimentValueIndex = complimentValues.findIndex(
    (compliment) => compliment.compliment === currentComplimentValue.compliment,
  );
  const nextComplimentindex =
    currentComplimentValueIndex + 1 >= complimentValues.length ? 0 : currentComplimentValueIndex + 1;

  url.searchParams.set("gender", complimentValues[nextComplimentindex].gender);
  window.history.pushState(null, "", url);

  $("body").css("background-color", complimentValues[nextComplimentindex].color);
  $(".emoji").text(complimentValues[nextComplimentindex].emoji);
  complimentValue.text(complimentValues[nextComplimentindex].compliment);
});

$(".share").on("click", () => {
  console.log(nameValue);
  const url = new URL(window.location.href);
  // url.searchParams.set("locked", "true");
  navigator.clipboard.writeText(url.href);
  alert(`The link has been successfully copied! Go ahead and share it with ${url.searchParams.get("name")}.`);
});
