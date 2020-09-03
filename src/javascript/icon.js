var imgButtons = document.querySelectorAll(".sumIcon");
var iconCode = {
  profileIconId: 0,
};
var anyIcon = {
  icon: 0,
};
for (let i = 0; i < imgButtons.length; i++) {
  imgButtons[i].addEventListener("mouseover", function () {
    this.classList.add("imgButtonToggle");
  });
  imgButtons[i].addEventListener("mouseleave", function () {
    this.classList.remove("imgButtonToggle");
  });
  imgButtons[i].addEventListener("mousedown", function () {
    iconCode["profileIconId"] = parseInt(this.alt);
    LeagueClient.requestPresetIcon(iconCode);
  });
}
