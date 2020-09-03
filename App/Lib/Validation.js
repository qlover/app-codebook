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
   *
   * @param {string} value 值
   * @param {string} fix 可以是 , 逗号分隔名
   * @param {object} values 原始所有值
   */
  static required_without(value, fix, values): boolean {
    return (
      fix
        .split(",")
        .filter((field) => values[field])
        .join(",") === fix
    );
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

  static regexp(value, reg): boolean {
    return reg.test(value);
  }

  static email(value): boolean {
    return Rule.regexp(value, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  }

  static phone(value): boolean {
    return Rule.regexp(value, /^[1]([3-9])[0-9]{9}$/);
  }

  static domain(value): boolean {
    return Rule.regexp(
      value,
      /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
    );
  }

  /**
   * 3-20位字母,数字,汉字,下划线
   * @param {*} value
   */
  static uname(value): boolean {
    return Rule.regexp(value, /^([a-zA-Z0-9_\u4e00-\u9fa5]{3,20})$/);
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
        if (values[key]) {
          rules.forEach((rule) => {
            if (!Validation.validaRule(values[key], rule, values)) {
              const [name] = rule.split(":");
              throw new ValidationException(this.getMessage(key, name));
            }
          });
        }
      }
    });
  }

  /**
   *
   * @throws ValidationException
   * @param {string} value
   * @param {string} rule length:5,10 min:
   * @param {object} values 原始所有参数
   */
  static validaRule(value: string, rule: string, values?: object): boolean {
    const [name, fix] = rule.split(":");
    const ruleMethod = Rule[name];

    if (ruleMethod && isFunction(ruleMethod)) {
      return ruleMethod(value, fix, values);
    }

    throw new ValidationException(`Invalid rule name: ${name}`);
  }

  getMessage(key, ruleName): string {
    key = `${key}.${ruleName}`;
    return this.message[key] ? this.message[key] : message[ruleName];
  }
}
