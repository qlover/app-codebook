import { isEmpty, forOwn, isFunction, isNumber } from "lodash";

const message = {
  password: "The field is reuired!",
  required: "The field is reuired!",
  number: "The field is number!",
  length: "The field is not long enough!",
};

export class Rule {
  static required(value): boolean {
    return !isEmpty(value);
  }

  static password(value): boolean {
    return /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])|(?=.*[A-Z]).*$/.test(value);
  }

  /**
   * 判断是否是数值
   *
   * PS:判断的值以 === 为基础，所以会将值转换成数值
   * @param {string} value
   */
  static number(value): boolean {
    return isNumber(+value);
  }

  /**
   * 判断长度
   * @param {string} value 判断的字符串
   * @param {string} range 检索的值，可以一个数值也可以是逗号分隔的长度范围,检索区间[min, max]
   */
  static length(value: string, range: string): boolean {
    const _len = ("" + value).length;
    range = range.split(",");
    if (range[0] && range[1]) {
      return _len >= +range.shift() && _len <= +range.pop();
    } else if (range[0]) {
      return _len >= +range.shift();
    }
    return false;
  }
}

export default class Validation {
  constructor(rules: object, message = {}) {
    this.rules = rules;
    this.message = message;
  }

  valida(values: object) {
    forOwn(this.rules, (rules, key) => {
      if (!rules) {
        return false;
      }
      rules.split("|").forEach((rule) => {
        rule = rule.split(":");
        const ruleName = rule.shift();
        let ruleMethod;

        if (!(ruleMethod = Rule[ruleName]) || !isFunction(ruleMethod)) {
          throw new TypeError("Invalid rule name: " + ruleName);
        }

        if (!ruleMethod(values[key], rule.pop())) {
          throw new TypeError(this.getMessage(key, ruleName));
        }
      });
    });
    return true;
  }

  getMessage(key, ruleName): string {
    const megKey = `${key}.${ruleName}`;
    return this.message[megKey] ? this.message[megKey] : message[ruleName];
  }
}
