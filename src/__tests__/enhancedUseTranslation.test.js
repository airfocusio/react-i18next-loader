const React = require("react");
const ReactDOM = require("react-dom/server");
const i18next = require("i18next").default;
const reactI18next = require("react-i18next");
const enhancedUseTranslation = require("../enhancedUseTranslation");

it("works", async () => {
  i18next.addResourceBundle("en", "ns", {
    test1: "value1 {{key1}}"
  });
  const Test1 = ({ opts }) => {
    const { t } = enhancedUseTranslation("ns", opts);
    return React.createElement("div", {
      children: t("test1", { key1: "value1" })
    });
  };
  const str1 = ReactDOM.renderToStaticMarkup(
    React.createElement(Test1, { opts: { i18n: i18next } })
  );
  expect(str1).toBe("<div>value1 value1</div>");

  i18next.addResourceBundle("en", "ns", {
    test2: "value2 {{key2}}"
  });
  const Test2 = ({ opts }) => {
    const { t } = enhancedUseTranslation("ns", opts);
    return React.createElement("div", {
      children: t("test2", { key2: "value2" })
    });
  };
  const str2 = ReactDOM.renderToStaticMarkup(
    React.createElement(Test2, { opts: { i18n: i18next } })
  );
  expect(str2).toBe("<div>value2 value2</div>");
});

beforeAll(
  async () =>
    new Promise((resolve, reject) => {
      i18next.init(
        {
          lng: "en"
        },
        err => {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        }
      );
    })
);
