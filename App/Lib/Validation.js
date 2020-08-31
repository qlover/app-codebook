import { isEmpty, forOwn, isFunction, isNumber } from "lodash";

const message = {
  password: "The field is password!",
  required: "The field is reuired!",
  number: "The field is number!",
  length: "The field is not long enough!",
};

export class Rule {
  static required(value): boolean {
    return !isEmpty(value);
  }

  /**
   * 密码最少6位，包括至少1个小写字母，1个数字
   *
   * @param {string} value
   */
  static password(value: string): boolean {
    return Rule.regexp(value, /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])|(?=.*[A-Z]).*$/);
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

  static min(value, min): boolean {
    return value >= min;
  }

  static max(value, min): boolean {
    return value <= min;
  }

  static in(value, seq): boolean {
    return seq.split(",").includes(value);
  }

  static email(value): boolean {
    return Rule.regexp(value, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  }

  static regexp(value, reg): boolean {
    return reg.test(value);
  }
}

export class ValidationException extends TypeError {}

export default class Validation {
  constructor(rules: object, message = {}) {
    this.rules = rules;
    this.message = message;
  }

  /**
   * 返回 rules
   *
   * @throws ValidationException
   * @param {object} values 验证的值
   */
  validated(values: object) {
    return forOwn(this.rules, (rules, key) => {
      if (rules) {
        rules = rules.split("|");

        // 必填选项
        if (rules.includes("required") && !values[key]) {
          throw new ValidationException(this.getMessage(key, "required"));
        }

        rules.forEach((rule) => {
          if (!Validation.validaRule(values[key], rule)) {
            const [name] = rule.split(":");
            throw new ValidationException(this.getMessage(key, name));
          }
        });
      }
    });
  }

  /**
   *
   * @throws ValidationException
   * @param {string} value
   * @param {string} rule length:5,10 min:
   */
  static validaRule(value: string, rule: string): boolean {
    const [name, fix] = rule.split(":");
    const ruleMethod = Rule[name];

    if (ruleMethod && isFunction(ruleMethod)) {
      return ruleMethod(value, fix);
    }

    throw new ValidationException(`Invalid rule name: ${name}`);
  }

  getMessage(key, ruleName): string {
    key = `${key}.${ruleName}`;
    return this.message[key] ? this.message[key] : message[ruleName];
  }
}
