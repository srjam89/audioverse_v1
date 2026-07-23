function clearStr(str) {
  return String(str ?? "")
    .trim()
    .replace(/[^a-zA-Z0-9.?=:,\-/&_%()<>@#+' * ]+/g, "");
}

module.exports = { clearStr };
