const { dialog } = require("electron").remote;
const { remote } = require("electron");
const LCUConnector = require("lcu-connector");
const connector = new LCUConnector();
const request = require("request");
const exit = document.querySelector("#exit");
var LeagueClient;

/* 
Look if user has set the path to the client, if so use that path,
otherwise the connector will try to find the path from the OS process list
*/
try {
  const fs = require("fs");
  const file = fs.readFileSync("config\\clientPath.txt").toString();
  if (file.split("\\").join("/") !== "") {
    connector._dirPath = file.split("\\").join("/");
  }
} catch (err) {}

connector.on("connect", (data) => {
  let url = `${data["protocol"]}://${data["address"]}:${data["port"]}`;
  let auth = "Basic " + btoa(`${data["username"]}:${data["password"]}`);
  LeagueClient = new ClientConnection(url, auth);
});

// Class to make requests to the client
class ClientConnection {
  // Private variables
  #url;
  #options;
  #endpoints;
  //

  constructor(url, auth) {
    this.#url = url;
    this.#options = {
      rejectUnauthorized: false,
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
      url: this.url,
    };
    this.#endpoints = {
      presetIcon: "/lol-summoner/v1/current-summoner/icon/",
    };
  }

  // Getters
  get endpoints() {
    return this.#endpoints;
  }
  get options() {
    return this.#options;
  }
  get url() {
    return this.#url;
  }
  //

  // Changes icon to the preset chinese ones
  requestPresetIcon(body) {
    this.makeRequest("PUT", body, this.#endpoints.presetIcon);
  }
}

// Close window when league client connection is lost
connector.on("disconnect", (data) => {
  dialog.showErrorBox(
    "Error",
    "The connection to the league client has been closed"
  );
  remote.BrowserWindow.getFocusedWindow().close();
});
connector.start();

exit.addEventListener("mouseover", function () {
  if (activePanel !== this) {
    this.classList.add("barMouseOver");
  }
});
exit.addEventListener("mouseleave", function () {
  if (activePanel !== this) {
    this.classList.remove("barMouseOver");
  }
});
exit.addEventListener("mousedown", function () {
  remote.BrowserWindow.getFocusedWindow().close();
});